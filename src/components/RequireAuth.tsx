import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { useEffect, useState } from "react"
import { setCredentials } from "../redux/slices/authSlice"
import { useRefreshQuery } from "../redux/slices/api/authApiSlice"

const RequireAuth = () => {

    const dispatch = useAppDispatch()
    const location = useLocation()

    const [loading, setLoading] = useState(true)

    const token = useAppSelector((state) => state.authSlice.accessToken)
    const user = useAppSelector((state) => state.authSlice.user) || ""


    const { data: refreshData, isError } = useRefreshQuery(undefined, { skip: !!token })
    const accessToken = refreshData?.accessToken

    useEffect(() => {
        if (accessToken) { dispatch(setCredentials({ accessToken: accessToken, user: user })) }
        if (isError) { setLoading(false) }

    }, [accessToken, user, dispatch, isError])

    return (
        loading ?
            <Outlet />
            :
            <Navigate to="/login" state={{ from: location.pathname }} replace />
    )
}
export default RequireAuth