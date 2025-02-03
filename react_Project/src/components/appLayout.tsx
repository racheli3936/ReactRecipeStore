import { Outlet } from "react-router-dom"
import NavBar from "./nanBar"
import { useReducer } from "react"
import { currentContext, userReducer } from "../types/user"
import Home from "./home"

const AppLayout = () => {
    const [user, userDispatch] = useReducer(userReducer, { id: '', firstName: '', lastName: '', passward: '', email: '', address: '', phone: '' })
    return (
        <>
            <currentContext.Provider value={{ currentUser: user, dispatch: userDispatch }}>
                <Home />
                <NavBar />
                <Outlet />
            </currentContext.Provider>
        </>
    )
}
export default AppLayout