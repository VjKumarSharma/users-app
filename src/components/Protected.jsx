import React, { useEffect } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Protected = ({ Component, ...rest }) => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.login);

    const checkUserToken = () => {
        if (!isLoggedIn) {
            return navigate('/');
        }
    }

    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);

    return (
        <div>
            <Component {...rest} />
        </div>
        // <Routes>
        //     <Route {...rest} render={(props) => {
        //         console.log(props)
        //         return <Component {...rest} {...props} />
        //     }} />
        // </Routes>
    );
}

export default Protected;
