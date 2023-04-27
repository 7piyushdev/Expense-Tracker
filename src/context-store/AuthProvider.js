import React, { useEffect, useState } from 'react'
import AuthContext from './Auth-Context'

const AuthProvider = (props) => {
    const [token, setToken] = useState(null);

    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {
        localStorage.setItem('token', JSON.stringify(token));
        setToken(token);
    }

    const logoutHandler = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userName')
        setToken(null);
    }

    const addUserToLocal = (user) => {
        const enteredUserName = user.replace(/[@.]/g, "");
        localStorage.setItem('userName', JSON.stringify(enteredUserName))
    }

    const authContext = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        addUserToLocal: addUserToLocal
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        setToken(token)
    }, [])

    return (
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider