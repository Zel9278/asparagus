import { PropsWithChildren } from "hono/jsx"

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

export const Navbar = ({ user }: PropsWithChildren<{ user: User | null }>) => (
    <>
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl" href="/">
                    Asparagus
                </a>
            </div>
            <div className="flex-none gap-2">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 rounded-full">
                                <img alt="User" src={user?.icon_url ?? ""} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <a className="justify-between" href="/logout">
                                    Logout
                                    <span className="badge">New</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <a href="/login" className="btn btn-ghost">
                        Login
                    </a>
                )}
            </div>
        </div>
    </>
)
