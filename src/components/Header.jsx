import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogedInUser, logout } from '../redux/actions';

export const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const user = useSelector((state) => { return state.auth.logedInUser });

    useEffect(() => {
        if (localStorage.getItem('logedInUser')) {
            dispatch(setLogedInUser(JSON.parse(localStorage.getItem('logedInUser'))));
        }
    }, []);

    const handleLogout = (event) => {
        event.preventDefault();
        dispatch(logout());
        setTimeout(() => {
            navigate('/');
        }, 1000)
    }

    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Logo</a>
                    {(user && user?.name) ? <span className='userInfo'>
                        <span> Hi, Welcome {user?.name}!</span>
                        <button className='btn btn-outline-warning ms-3' onClick={handleLogout}>Logout</button>
                    </span> :
                        <div className="collapse navbar-collapse" id="mynavbar">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/signup" className="nav-link">
                                        SignUp
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    }
                </div>
            </nav>
        </div>
    );
}

// export default Header;
