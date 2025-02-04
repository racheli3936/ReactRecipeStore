import { Outlet } from "react-router-dom"
import NavBar from "./nanBar"
import { useReducer } from "react"
import { CurrentContext, userReducer } from "../types/user"
import Home from "./home"

const AppLayout = () => {
    const [user, userDispatch] = useReducer(userReducer, { id: '', firstName: '', lastName: '', passward: '', email: '', address: '', phone: '' })
    return (
        <>
            <CurrentContext value={{ currentUser: user, dispatch: userDispatch }}>
                <Home />
                <NavBar />
                <Outlet />
            </CurrentContext>
        </>
    )
}
export default AppLayout