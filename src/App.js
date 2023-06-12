import { Route, BrowserRouter, Routes } from "react-router-dom";

import { AddUser } from "./components/AddUser";
import React from "react";
import { UserList } from "./components/UserList";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Header } from "./components/Header";
import Protected from "./components/Protected";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          {/* Unprotected Routes */}
          <Route exact={true} path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/add-user" element={<Protected Component={AddUser} />} />
          <Route path="/edit-user/:id" element={<Protected isEdit={true} Component={AddUser} />} />
          <Route path="/userList" element={<Protected Component={UserList} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
