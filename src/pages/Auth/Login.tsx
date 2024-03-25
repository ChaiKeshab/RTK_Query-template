
import { useRef, useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { logOut, setCredentials } from '../../redux/slices/authSlice'
import { useLoginMutation, useLogoutMutation } from '../../redux/slices/api/authApiSlice'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { Button } from '../../components'

const Login = () => {
    const userRef = useRef<HTMLInputElement>(null)
    const errRef = useRef<HTMLParagraphElement>(null)
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()
    const [logoutApi] = useLogoutMutation()
    const dispatch = useDispatch()

    useEffect(() => {
        userRef.current?.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const userData = await login({ user, pwd }).unwrap()
            dispatch(setCredentials({ ...userData, user }))
            setUser('')
            setPwd('')
            navigate('/welcome')

        } catch (error) {
            const err = error as FetchBaseQueryError
            if (err.status === 'PARSING_ERROR') {
                if (!err?.originalStatus) {
                    setErrMsg('No Server Response');
                } else if (err.originalStatus === 400) {
                    setErrMsg('Missing Username or Password');
                } else if (err.originalStatus === 401) {
                    setErrMsg('Unauthorized');
                } else {
                    setErrMsg('Login Failed');
                }
            } else {
                console.error('Unexpected error:', err);
            }

            errRef.current?.focus();
        }
    }

    const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => setUser(e.target.value)
    const handlePwdInput = (e: ChangeEvent<HTMLInputElement>) => setPwd(e.target.value)

    const handleLogout = async () => {
        dispatch(logOut())
        await logoutApi()
    }

    const content = isLoading ?
        <h1>Loading...</h1>
        :
        (
            <div className='mt-4 px-4 duration-300 md:px-6 lg:px-14 py-6 space-y-4 mx-auto w-fit bg-[#FAFAFA] rounded-md shadow-[1px_1px_5px_rgba(0,0,0,0.3)]'>
                <section className="login space-y-4">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

                    <h1>Employee Login</h1>

                    <form onSubmit={handleSubmit} className='flex flex-col justify-center items-start gap-4'>

                        <div className='flex justify-between items-center gap-3 w-full'>
                            <label htmlFor="username">Username:</label>
                            <input
                                className='border rounded-md outline-none px-3 py-1'
                                type="text"
                                id="username"
                                ref={userRef}
                                value={user}
                                onChange={handleUserInput}
                                autoComplete="off"
                                required
                            />
                        </div>


                        <div className='flex justify-between items-center gap-3 w-full'>
                            <label htmlFor="password">Password:</label>
                            <input
                                className='border rounded-md outline-none px-3 py-1'
                                type="password"
                                id="password"
                                onChange={handlePwdInput}
                                value={pwd}
                                autoComplete='current-password'
                                required
                            />
                        </div>

                        <Button
                            variants={{ color: 'primary' }}
                            onClick={handleLogout}
                        >Sign In
                        </Button>
                    </form>
                </section>

                <section>
                    <Button
                        variants={{ color: 'danger' }}
                        onClick={handleLogout}
                    >Logout
                    </Button>
                </section>
            </div>
        )

    return content
}
export default Login
