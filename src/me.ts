import { Hono } from "hono"
import actor from "./actor"
import accepts from "./accepts"
import crypto from "crypto"

const me = new Hono()

me.get("/", (c) => {
    const accept = c.req.header("Accept")?.match(/[^,; ]+/g) || []

    if (accept.some((a) => accepts.includes(a))) {
        return c.json(actor("c30"), 200, {
            "Content-Type": "application/activity+json",
        })
    }

    return c.text("@c30@ap.tty7.uk")
})

me.post("/inbox", async (c) => {
    // const body = await c.req.json()
    // console.log(body)

    const signatureHeader = c.req
        .header("Signature")
        ?.split(",")
        .map((pair) => pair
                .split("=")
                .map((value) => value.replace(/^"/, "").replace(/"$/, "")))

    const keyId = signatureHeader?.find((pair) => pair[0] === "keyId") || [
        "keyId",
        "",
    ]
    const headers = signatureHeader?.find((pair) => pair[0] === "headers") || [
        "headers",
        "",
    ]
    const signature = signatureHeader?.find(
        (pair) => pair[0] === "signature"
    ) || ["signature", ""]
    const date = c.req.header("Date")

    if (!keyId || !headers || !signature) {
        return c.text("Bad Request", 400)
    }

    const actor = await fetch(keyId[1], {
        headers: {
            Accept: "application/activity+json",
        },
    })
        .then((res) => res.json())
        .catch(() => null)

    if (!actor) {
        return c.text("Not Found", 404)
    }

    const pem = actor.publicKey?.publicKeyPem

    const comparisonString = headers[1]
        .split(" ")
        .map((signed_header_name) => {
            if (signed_header_name === "(request-target)") {
                console.log("(request-target): post /me/inbox")
                return "(request-target): post /me/inbox"
            } else {
                console.log(
                    `${signed_header_name}: ${c.req.header(signed_header_name)}`
                )
                return `${signed_header_name}: ${c.req.header(
                    signed_header_name
                )}`
            }
        })
        .join("\n")

    const verifier = crypto.createVerify("sha256")
    verifier.update(comparisonString)

    const verified = verifier.verify(pem, signature[1], "base64")

    if (verified) {
        const parsedDate = Date.parse(date || "")
        const now = Date.now() - 300000

        if (parsedDate < now) {
            return c.text("Request is too old", 400)
        }

        return c.text("OK")
    } else {
        return c.text("Request signature could not be verified", 401)
    }
})

me.get("/outbox", async (c) => {
    const body = await c.req.parseBody()
    console.log(body)

    return c.text("OK")
})

me.get("/followers", async (c) => {
    const body = await c.req.parseBody()
    console.log(body)

    return c.text("OK")
})

me.get("/following", async (c) => {
    const body = await c.req.parseBody()
    console.log(body)

    return c.text("OK")
})

export default me
