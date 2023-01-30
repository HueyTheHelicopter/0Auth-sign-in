import { createContext } from "react";

interface IAuthContext {
    isAuth: boolean,
    setIsAuth: (value: boolean) => void;
}

export const AuthContext = createContext<IAuthContext>({isAuth: false, setIsAuth: (isAuth) => console.log(isAuth)});