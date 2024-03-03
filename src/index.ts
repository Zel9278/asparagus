import { serve } from "@hono/node-server"
import { Hono } from "hono"
import actor from "./actor"
import accepts from "./accepts"
import wellKnown from "./well-known"
import nodeinfo from "./nodeinfo"

const PORT = 7634

const app = new Hono()

app.use((c, next) => {
    console.log(c.req.method, c.req.url)
    return next()
})

app.route("/.well-known", wellKnown)

app.get("/", (c) => {
    return c.text("Hello Hono!")
})

app.route("/nodeinfo", nodeinfo)

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
