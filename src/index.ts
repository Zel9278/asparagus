import { serve } from "@hono/node-server"
import { serveStatic } from "@hono/node-server/serve-static"
import { Hono } from "hono"
import { drizzle } from "drizzle-orm/better-sqlite3"
import SQLite3 from "better-sqlite3"

import actor from "./actor"
import accepts from "./accepts"
import wellKnown from "./well-known"
import nodeinfo from "./nodeinfo"
import me from "./me"

const PORT = 7634

const app = new Hono()
const sqlite = new SQLite3("./src/data/database.db")
const db = drizzle(sqlite)

/* db init */

sqlite
    .prepare(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT, email TEXT, created_at TEXT, updated_at TEXT)"
    )
    .run()
sqlite
    .prepare(
        "CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY, user_id INTEGER, content TEXT, created_at TEXT, updated_at TEXT)"
    )
    .run()
sqlite
    .prepare(
        "CREATE TABLE IF NOT EXISTS follows (id INTEGER PRIMARY KEY, follower_id INTEGER, followed_id INTEGER, created_at TEXT)"
    )
    .run()
sqlite
    .prepare(
        "CREATE TABLE IF NOT EXISTS followers (id INTEGER PRIMARY KEY, user_id INTEGER, follower_id INTEGER, created_at TEXT)"
    )
    .run()
sqlite
    .prepare(
        "CREATE TABLE IF NOT EXISTS likes (id INTEGER PRIMARY KEY, user_id INTEGER, post_id INTEGER, created_at TEXT)"
    )
    .run()

/* db init end */

export const database = db

app.use((c, next) => {
    console.log(c.req.method, c.req.url)

    return next()
})

app.use("/resources/*", serveStatic({ root: "./src" }))
app.use("/favicon.ico", serveStatic({ root: "./src" }))

app.route("/.well-known", wellKnown)
app.route("/nodeinfo", nodeinfo)
app.route("/me", me)

app.get("/", (c) => {
    return c.text("Hello Hono!")
})

app.get("/actor", (c) => {
    const accept = c.req.header("Accept")?.match(/[^,; ]+/g) || []

    if (!accept.some((a) => accepts.includes(a))) {
        c.text("Not Acceptable", 406, {
            "Content-Type": "application/activity+json",
        })
    }

    return c.json(actor, 200, {
        "Content-Type": "application/activity+json",
    })
})

console.log(`Server is running on port ${PORT}`)

serve({
    fetch: app.fetch,
    port: PORT,
})
