import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import Signup from './Signup';
import classes from './Login.module.css'
import { useSelector } from 'react-redux';

const LoginScreen = () => {
    const [isLogging, setIsLogging] = useState(true);
    const [forgotPassword, setForgotPassword] = useState(false);
    const navigate = useNavigate();

    const auth = useSelector(state => state.auth.isAuthenticated);

    const stayHome = () => {
        if (auth) {
            navigate('/home');
        }
    }

    useEffect(() => {
        stayHome();
    }, [])

    return (<>
        <div className={classes.loginWrapper}>
            {isLogging && !forgotPassword && <Login setIsLogging={setIsLogging} setForgotPassword={setForgotPassword} />}
            {!isLogging && <Signup setIsLogging={setIsLogging} />}
            {forgotPassword && <ForgotPassword setIsLogging={setIsLogging} setForgotPassword={setForgotPassword} />}
        </div>
    </>);
}

export default LoginScreen