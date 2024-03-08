const data = {
    short_name: "AP鯖 ap.tty7.uk",
    name: "AP鯖 ap.tty7.uk",
    start_url: "/",
    display: "standalone",
    background_color: "#37e934",
    theme_color: "#37e934",
    icons: [
        {
            src: "https://ap.tty7.uk/resources/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
        },
        {
            src: "https://ap.tty7.uk/resources/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
        },
    ],
    share_target: {
        action: "/share/",
        method: "GET",
        enctype: "application/x-www-form-urlencoded",
        params: {
            title: "title",
            text: "text",
            url: "url",
        },
    },
}

export default data
