import {} from "hono"

type User = {
    id: string
    username: string
    name: string | null
    summary: string | null
    email: string | null
    icon_url: string | null
    image_url: string | null
    created_at: number
    updated_at: number
}

declare module "hono" {
    interface ContextRenderer {
        (
            content: string | Promise<string>,
            props?: { title?: string; user?: User }
        ): Response
    }
}
