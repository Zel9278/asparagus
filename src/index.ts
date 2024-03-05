import { serve } from "@hono/node-server"
import { serveStatic } from "@hono/node-server/serve-static"
import { Hono } from "hono"
import { setCookie, getCookie, deleteCookie } from "hono/cookie"
import { logger } from "hono/logger"
import { poweredBy } from "hono/powered-by"
import { eq, or } from "drizzle-orm"
import { migrate } from "drizzle-orm/better-sqlite3/migrator"
import { drizzle, BetterSQLite3Database } from "drizzle-orm/better-sqlite3"
import SQLite3 from "better-sqlite3"
import bcrypt from "bcrypt"

import actor from "./actor"
import accepts from "./accepts"
import wellKnown from "./well-known"
import nodeinfo from "./nodeinfo"
import me from "./me"
import { users } from "./database/tables"

import { renderer } from "./frontend/renderer"
import Home from "./frontend/home"
import Login from "./frontend/login"
import path from "path"
import Logined from "./frontend/logined"

const PORT = 7634

const app = new Hono()
const sqlite = new SQLite3("./src/data/database.db")
const db: BetterSQLite3Database = drizzle(sqlite)

/* db migration test */

migrate(db, {
    migrationsFolder: path.join(process.cwd(), "drizzle"),
})

/* db migration test end */

export const database = db

app.use(poweredBy())
app.use(logger())
app.use("*", renderer)

app.use("/resources/*", serveStatic({ root: "./src" }))
app.use("/favicon.ico", serveStatic({ root: "./src" }))

app.route("/.well-known", wellKnown)
app.route("/nodeinfo", nodeinfo)
app.route("/me", me)

app.get("/", async (c) => {
    const cookie = getCookie(c, "token")
    const usrs = await db.select().from(users).all()
    const user = usrs.find((u) => u.token?.split(",").includes(cookie))

    if (!user) {
        return c.render(Home, {
            title: "Home",
        })
    }

    const token = user?.token?.split(",") || []

    if (token.includes(cookie)) {
        return c.render(Logined, {
            title: "Home",
            user: {
                id: user.id,
                username: user.username,
                name: user.name,
                summary: user.summary,
                email: user.email,
                icon_url: user.icon_url,
                image_url: user.image_url,
                created_at: user.created_at,
                updated_at: user.updated_at,
            },
        })
    }

    return c.render(Home, {
        title: "Home",
    })
})

app.get("/login", async (c) => {
    const cookie = getCookie(c, "token") || ""
    const user = await db
        .select()
        .from(users)
        .where(eq(users.token, cookie))
        .execute()
    const tokens = user[0]?.token?.split(",") || []

    if (tokens.includes(cookie)) {
        return c.redirect("/")
    }

    return c.render(Login, {
        title: "Login",
    })
})

app.get("/logout", async (c) => {
    const token = getCookie(c, "token")

    if (!token) {
        return c.redirect("/")
    }

    const usrs = await db.select().from(users).all()

    const user = usrs.find((u) => u.token?.split(",").includes(token))
    const tokens = user?.token?.split(",") || []
    tokens.splice(tokens.indexOf(token), 1)
    db.update(users)
        .set({ token: tokens.join(",") })
        .where(eq(users.id, user?.id))
        .execute()

    deleteCookie(c, "token")
    return c.redirect("/")
})

app.post("/login", async (c) => {
    const body = await c.req.parseBody()
    const { username, password } = body

    const result = await db
        .select()
        .from(users)
        .where(or(eq(users.username, username), eq(users.email, username)))
        .execute()

    if (result.length === 0) {
        return c.redirect("/login")
    }

    const user = result[0]
    const tokens = result[0].token?.split(",")

    if (!bcrypt.compareSync(password, user.password)) {
        return c.redirect("/login")
    }

    const token = await bcrypt.hash(
        user.id + user.username + Date.now() + Math.random() * 1000,
        10
    )
    setCookie(c, "token", token)
    if (tokens) tokens.push(token)
    db.update(users)
        .set({ token: tokens?.join(",") })
        .where(eq(users.id, user.id))
        .execute()

    return c.redirect("/")
})

app.get("/actor", async (c) => {
    const accept = c.req.header("Accept")?.match(/[^,; ]+/g) || []

    if (!accept.some((a) => accepts.includes(a))) {
        c.text("Not Acceptable", 406, {
            "Content-Type": "application/activity+json",
        })
    }

    const data = await actor("c30")

    return c.json(data, 200, {
        "Content-Type": "application/activity+json",
    })
})

console.log(`Server is running on port ${PORT}`)

serve({
    fetch: app.fetch,
    port: PORT,
})
