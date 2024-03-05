const Login = (
    <>
        <a class="text-3xl font-bold underline" href="/">
            Asparagus
        </a>
        <p>Welcome to the asparagus</p>
        <p>Log in to continue</p>

        <div>
            <form action="/login" method="post">
                <input
                    type="text"
                    id="username"
                    name="username"
                    class="input input-bordered input-primary w-full max-w-xs"
                />
                <br />
                <input
                    type="password"
                    id="password"
                    name="password"
                    class="input input-bordered input-primary w-full max-w-xs"
                />
                <br />
                <input
                    type="submit"
                    value="Login"
                    class="btn btn-outline btn-info"
                />
            </form>
        </div>
    </>
)

export default Login
