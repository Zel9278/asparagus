const fs = require("fs")
const path = require("path")
const publicKey = fs.readFileSync(
    path.join(process.cwd(), "/src/pem/public.pem"),
    "utf-8"
)

const data = {
    "@context": [
        "https://www.w3.org/ns/activitystreams",
        "https://w3id.org/security/v1",
    ],

    inbox: "https://ap.tty7.uk/me/inbox",
    outbox: "https://ap.tty7.uk/me/outbox",

    publicKey: {
        id: "https://ap.tty7.uk/actor#main-key",
        owner: "https://ap.tty7.uk/actor",
        publicKeyPem: publicKey,
    },

    id: "https://ap.tty7.uk/actor",
    type: "Person",
    preferredUsername: "c30",
    followers: "https://ap.tty7.uk/me/followers",
    following: "https://ap.tty7.uk/me/following",
    icon: {},
    name: "c30@自作AP鯖",
    summary: "A test actor for Hono",
    discoverable: false,
    url: "https://ap.tty7.uk/me",

    endpoints: {
        sharedInbox: "https://ap.tty7.uk/inbox",
    },
}

export default data
