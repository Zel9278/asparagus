import { jsxRenderer } from "hono/jsx-renderer"
import { Navbar } from "./navbar"

export const renderer = jsxRenderer(({ children, title, user }) => {
    return (
        <html>
            <head>
                <meta charset="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta name="description" content="Asparagus" />
                <link href="/resources/css/main.css" rel="stylesheet"></link>
                <title>Asparagus - {title}</title>
            </head>
            <body>
                <Navbar user={user} />
                <main>{children}</main>
            </body>
        </html>
    )
})
