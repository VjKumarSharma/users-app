import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupThunk } from '../redux/actions';
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialValues = { name: '', email: '', mobile: '', password: '', confirm_password: '' };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setSubmit] = useState(false);
    const isSignup = useSelector((state) => state.auth.isSignup);
    const isLoggedIn = useSelector((state) => state.auth.login);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormErrors(validate(formValues));
        setSubmit(true);
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            dispatch(signupThunk({ ...formValues }));
        }
    }, [formErrors])

    useEffect(() => {
        if (isSignup) {
            setFormValues(initialValues);
            alert('Signup Successfully. Please login to continue!');
            navigate('/');
        }
    }, [isSignup])

    useEffect(() => {
        if (isLoggedIn) {
            setFormValues(initialValues);
            setTimeout(() => {
                navigate('/userList')
            }, 1000)
        }
    }, [isLoggedIn])

    const validate = (values) => {
        const errors = {};
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

        if (!values.name) {
            errors.name = "Please provide Name";
        }

        if (!values.email) {
            errors.email = "Please provide Email Id";
        } else if (values.email && !regex.test(values.email)) {
            errors.email = "Please provide valid Email Id";
        }

        if (!values.mobile) {
            errors.mobile = "Please provide Mobile number";
        } else if (values.mobile && values.mobile.length !== 10) {
            errors.mobile = "Mobile number must be of 10 digits";
        } else if (values.mobile && !(/^[0-9]*$/).test(values.mobile)) {
            errors.mobile = "Only numbers allowed";
        }

        if (!values.password) {
            errors.password = "Please provide Password";
        }

        if (!values.confirm_password) {
            errors.confirm_password = "Please provide Confirm password";
        } else if (values.password && values.confirm_password && (values.password !== values.confirm_password)) {
            errors.confirm_password = "Password not match";
        }

        return errors;
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-6 mx-auto'>
                    <form >
                        <h3 className='my-5 text-center'>Sign Up</h3>
                        <div className="mb-3">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Enter your name"
                                value={formValues.name}
                                onChange={handleChange}
                                autoComplete='off'
                            />
                            <p className='validation-error'>{formErrors.name}</p>
                        </div>
                        <div className="mb-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter email"
                                value={formValues.email}
                                onChange={handleChange}
                                autoComplete='off'
                            />
                            <p className='validation-error'>{formErrors.email}</p>
                        </div>
                        <div className="mb-3">
                            <label>Mobile Number</label>
                            <input
                                type="text"
                                name='mobile'
                                className="form-control"
                                placeholder="Enter your mobile number"
                                value={formValues.mobile}
                                onChange={handleChange}
                                autoComplete='off'
                            />
                            <p className='validation-error'>{formErrors.mobile}</p>
                        </div>
                        <div className="mb-3">
                            <label>Password</label>
                            <input
                                type="password"
                                name='password'
                                className="form-control"
                                placeholder="password"
                                value={formValues.password}
                                onChange={handleChange}
                                autoComplete='off'
                            />
                            <p className='validation-error'>{formErrors.password}</p>
                        </div>
                        <div className="mb-3">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                name='confirm_password'
                                className="form-control"
                                placeholder="confirm password"
                                value={formValues.confirm_password}
                                onChange={handleChange}
                                autoComplete='off'
                            />
                            <p className='validation-error'>{formErrors.confirm_password}</p>
                        </div>
                        <div className="d-grid">
                            <button type="submit" onClick={handleSubmit} className="btn btn-primary">
                                Signup
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}