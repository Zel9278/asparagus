import { Hono } from "hono"

const nodeInfo = new Hono()

const data = {
    version: "2.0",
    software: {
        name: "asparagus",
        repository: "https://github.com/Zel9278/asparagus",
        version: "0.0.1",
        homepage: "https://github.com/Zel9278/asparagus",
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
        repositoryUrl: "https://github.com/Zel9278/asparagus",
        feedbackUrl: "https://github.com/Zel9278/asparagus/issues/new",
        disableRegistration: true,
        maxNoteTextLength: Number.MAX_SAFE_INTEGER,
        themeColor: "#37e934",
    },
}

nodeInfo.get("/2.0", (c) => {
    return c.json(data)
})

nodeInfo.get("/2.1", (c) => {
    return c.json(data)
})

export default nodeInfo
