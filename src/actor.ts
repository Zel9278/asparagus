import fs from "fs"
import path from "path"
import { database } from "./index"
import { Users } from "./database/tables"
import { eq } from "drizzle-orm"

const publicKey = fs.readFileSync(
    path.join(process.cwd(), "/src/pem/public.pem"),
    "utf-8"
)

async function getUser(username: string) {
    const usrs = await database
        .select()
        .from(Users)
        .where(eq(Users.username, username))
        .execute()
    const user = usrs[0]

    if (!user) {
        return null
    }

    return {
        "@context": [
            "https://www.w3.org/ns/activitystreams",
            "https://w3id.org/security/v1",
        ],

        inbox: `https://ap.tty7.uk/me/inbox`,
        outbox: `https://ap.tty7.uk/me/outbox`,

        publicKey: {
            id: `https://ap.tty7.uk/actor#main-key`,
            owner: `https://ap.tty7.uk/actor`,
            publicKeyPem: publicKey,
        },

        id: `https://ap.tty7.uk/actor`,
        type: "Person",
        preferredUsername: user.username,
        followers: `https://ap.tty7.uk/me/followers`,
        following: `https://ap.tty7.uk/me/following`,
        icon: {
            type: "Image",
            mediaType: "image/png",
            url: user.icon_url || null,
        },
        image: {
            type: "Image",
            mediaType: "image/png",
            url: user.image_url || null,
        },
        name: user.name || null,
        summary: user.summary || null,
        discoverable: false,
        url: `https://ap.tty7.uk/me`,

        endpoints: {
            sharedInbox: `https://ap.tty7.uk/inbox`,
        },
    }
}

export default getUser
