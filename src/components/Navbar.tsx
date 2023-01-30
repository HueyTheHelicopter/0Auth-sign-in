import { useContext, useState } from "react"
import { logout } from "../utils/utilities"
import { AuthContext } from "./context/Context"

export function Navbar() {

    const {setIsAuth} = useContext(AuthContext);

    const onLogout = async (): Promise<void> => {
        const response = logout().then((v) => console.log(v))
        setIsAuth(false);
    }

    return (
        <div className="navbar">
            <button type="button" className="btn-logout" onClick={() => onLogout()}>
                Logout
            </button>
        </div>
    )
}