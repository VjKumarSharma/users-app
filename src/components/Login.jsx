import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from '../redux/actions';
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = { email: '', password: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setSubmit] = useState(false);
  const userFound = "Incorrect Information. Please register";

  const userNotFound = useSelector((state) => state.auth.userNotFound);
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

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     setFormValues(initialValues);
  //     navigate('/userList');
  //   }
  // })

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      dispatch(loginThunk({ ...formValues }));
    }
  }, [formErrors])

  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => {
        navigate('/userList')
      }, 1000)
    }
  }, [isLoggedIn])

  const validate = (values) => {
    const errors = {};
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!values.email) {
      errors.email = "Please provide Email Id";
    } else if (values.email && !regex.test(values.email)) {
      errors.email = "Please provide valid Email Id";
    }

    if (!values.password) {
      errors.password = "Please provide Password";
    }
    return errors;
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-6 mx-auto'>
          <form>
            <h3 className='my-5 text-center'>Sign In</h3>
            <div className="mb-3">
              <label className="form-label">Email address</label>
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
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                value={formValues.password}
                onChange={handleChange}
                autoComplete='off'
              />
              <p className='validation-error'>{formErrors.password}</p>
              <p className='validation-error'>{(userNotFound === true) ? userFound : ''}</p>
            </div>
            <div className="d-grid">
              <button type="submit" onClick={handleSubmit} className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}