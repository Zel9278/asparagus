import { Hono } from "hono"

const me = new Hono()

me.get("/", (c) => {
    return c.text("@c30@ap.tty7.uk")
})

me.post("/inbox", async (c) => {
    const body = await c.req.json()
    console.log(body)

    return c.text("OK")
})

export default me
