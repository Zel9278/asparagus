import { Hono } from "hono"

const nodeinfo = new Hono()

const data = {
    version: "2.0",
    software: {
        name: "自作AP鯖 ap.tty7.uk",
        repository: "https://github.com/Zel9278/ap.tty7.uk",
        version: "0",
        homepage: "https://github.com/Zel9278/ap.tty7.uk",
    },
    protocols: {
        inbound: ["activitypub"],
        outbound: ["activitypub"],
    },
    services: {
        inbox: "https://ap.tty7.uk/inbox",
        outbox: "https://ap.tty7.uk/outbox",
        followers: "https://ap.tty7.uk/followers",
        following: "https://ap.tty7.uk/following",
        liked: "https://ap.tty7.uk/liked",
    },
    openRegistrations: false,
    usage: {
        users: {
            total: 1,
            activeHalfyear: 1,
            activeMonth: 1,
        },
        localPosts: 0,
    },
    metadata: {
        nodeName: "AP鯖 ap.tty7.uk",
        nodeDescription: "完全におひとり様用に作ってるサーバーです",
        nodeAdmins: [
            {
                name: "c30",
                email: "愚か者を数える@com.ビューティー",
            },
        ],
        maintainer: {
            name: "c30",
            email: "愚か者を数える@com.ビューティー",
        },
        langs: ["ja"],
        impressumUrl: "https://c30.life",
        repositoryUrl: "https://github.com/Zel9278/ap.tty7.uk",
        feedbackUrl: "https://github.com/Zel9278/ap.tty7.uk/issues/new",
        disableRegistration: true,
        maxNoteTextLength: Infinity,
        themeColor: "#37e934",
    },
}

nodeinfo.get("/2.0", (c) => {
    return c.json(data)
})

export default nodeinfo
