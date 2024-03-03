import { Hono } from "hono"
import fs from "fs"

const wellKnown = new Hono()

wellKnown.get("/webfinger", (c) => {
    const resource = decodeURIComponent(c.req.query("resource") || "")
    if (resource === "acct:@c30@ap.tty7.uk") {
        return c.json({
            subject: "acct:@c30@ap.tty7.uk",
            links: [
                {
                    rel: "self",
                    type: "application/activity+json",
                    href: "https://ap.tty7.uk/actor",
                },
            ],
        })
    }

    return c.text("Not Found", 404)
})

wellKnown.get("/nodeinfo", (c) => {
    return c.json({
        links: [
            {
                rel: "http://nodeinfo.diaspora.software/ns/schema/2.0",
                href: "https://ap.tty7.uk/nodeinfo/2.0",
            },
        ],
    })
})

wellKnown.get("/host-meta", (c) => {
    const hostMeta = fs.readFileSync("./host-meta", "utf8")
    return c.text(hostMeta, 200, { "Content-Type": "application/xrd+xml" })
})

export default wellKnown
