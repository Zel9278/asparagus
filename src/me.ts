import { Hono } from "hono"
import actor from "./actor"
import accepts from "./accepts"

const me = new Hono()

me.get("/", (c) => {
    const accept = c.req.header("Accept")?.match(/[^,; ]+/g) || []

    if (accept.some((a) => accepts.includes(a))) {
        return c.json(actor, 200, {
            "Content-Type": "application/activity+json",
        })
    }

    return c.text("@c30@ap.tty7.uk")
})

me.post("/inbox", async (c) => {
    const body = await c.req.json()
    console.log(body)

    return c.text("OK")
})

export default me
