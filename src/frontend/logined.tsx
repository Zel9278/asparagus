import type { FC } from "hono/jsx"

type Message = {
    username: string
    name: string | null
    content: string
    isMe: boolean
}

export const Logined: FC<{ messages: Message[] }> = (props: {
    messages: Message[]
}) => (
    <>
        <h1>Logined</h1>
        <ul>
            {props.messages.map((m, i) => {
                m.isMe ? (
                    <li key={i} class="chat chat-end">
                        <div class="flex">
                            <h2>{m.name}</h2>
                            <span>@</span>
                            <p>{m.username}</p>
                        </div>
                        <p>{m.content}</p>
                    </li>
                ) : (
                    <li key={i} class="chat chat-start">
                        <div class="flex">
                            <h2>{m.name}</h2>
                            <span>@</span>
                            <p>{m.username}</p>
                        </div>
                        <p>{m.content}</p>
                    </li>
                )
            })}
        </ul>
    </>
)
