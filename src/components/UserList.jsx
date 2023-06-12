import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { DeleteUserThunk, getUsersListThunk } from "../redux/actions";

export function UserList() {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.user.users);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    if (!users || !users.length) {
      dispatch(getUsersListThunk())
    }
  }, []);

  const handleDelete = (id) => {
    dispatch(DeleteUserThunk(id));
  };

  return (
    <div className="container pt-4">
      <div className="row">
      </div>
      <div className="row">
        <div className="col-6">
          <h4>User List</h4>
        </div>
        <div className="col-6 text-end">
          <Link to="/add-user">
            <button className="btn btn-primary">Add user</button>
          </Link>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12">
          {loading ? (
            "Loading..."
          ) : (
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users?.map(({ id, name, email, phone }, i) => {
                  return (
                    <tr key={i}>
                      <td>{id}</td>
                      <td>{name}</td>
                      <td>{email}</td>
                      <td>{phone}</td>
                      <td>
                        <Link to={`/edit-user/${id}`}>
                          <button className="btn btn-warning">Edit</button>
                        </Link>
                        <button onClick={() => handleDelete(id)} className="ms-2 btn btn-danger">Delete</button>
                      </td>
                    </tr>
                  )
                }
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
