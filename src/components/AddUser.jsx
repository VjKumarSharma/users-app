import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EditUserThunk, addUserThunk } from "../redux/actions";

export const AddUser = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setMobile] = useState("");
  const [error, setError] = useState(null);
  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleMobile = (e) => setMobile(e.target.value);

  const user = useSelector((state) => state.user.users.find((user) => user.id == params.id));

  useEffect(() => {
    if (props.isEdit && user) {
      setName(user.name);
      setEmail(user.email);
      setMobile(user.phone);
    }
  }, [props.isEdit]);

  const handleClick = async () => {
    if (name && email && phone) {
      if (props.isEdit) {
        await dispatch(EditUserThunk({id: user?.id, name, email, phone}));
        alert('User update Successfully!');
      } else {
        await dispatch(addUserThunk({ name, email, phone }));
        alert('User created Successfully!');
      }
      setError(null);
      setName("");
      setEmail("");
      setMobile("");
      navigate("/userList");
    } else {
      setError("All the fields are mandatory!");
      setTimeout(() => {
        setError(null);
      }, 5000)
    }

  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 mx-auto">
          <h4 className="my-3 text-center">{props.isEdit ? 'Edit User' : 'Add User'}</h4>
          <div className="mb-3">
            <label className="form-label" htmlFor="nameInput">Name</label>
            <input
              className="form-control"
              type="text"
              placeholder="Your Name"
              id="nameInput"
              onChange={handleName}
              value={name}
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="emailInput">Email</label>
            <input
              className="form-control"
              type="email"
              placeholder="Your Email"
              id="emailInput"
              onChange={handleEmail}
              value={email}
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="mobileInput">Mobile Number</label>
            <input
              className="form-control"
              type="text"
              placeholder="Your Contact Number"
              id="mobileInput"
              onChange={handleMobile}
              value={phone}
              autoComplete="off"
            />
          </div>
          {error && error}
          <button onClick={handleClick} className="btn btn-primary">
            {props.isEdit ? 'Update User' : 'Add User'}
          </button>
          <Link to={`/userList`}>
            <button className="btn btn-outline-dark ms-3">Cancel</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
