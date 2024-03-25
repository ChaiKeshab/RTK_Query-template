import { useAppSelector } from "../redux/store"

const Welcome = () => {
    const user = useAppSelector((state) => state.authSlice.user)
    const token = useAppSelector((state) => state.authSlice.accessToken)

    const welcome = user ? `Welcome ${user}!` : 'Welcome!'
    const tokenAbbr = `${token?.slice(0, 9)}...`

    const content = (
        <section className="welcome">
            <h1>{welcome}</h1>
            <p>Token: {tokenAbbr}</p>
        </section>
    )

    return content
}
export default Welcome