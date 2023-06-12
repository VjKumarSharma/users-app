
// Async Actions
export const getUsersListThunk = () => async (dispatch) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    dispatch(setUsersList(users))
}

export const addUserThunk = (data) => async (dispatch) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    const users = await response.json();
    dispatch(addUser({ ...data, id: Math.floor(Math.random() * 9000 + 1000) }))
}

export const EditUserThunk = (data) => async (dispatch) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${data.id}`,
            {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
        const users = await response.json();
    } catch (e) {
    } finally {
        dispatch(updateUser(data))
    }
}

export const DeleteUserThunk = (data) => async (dispatch) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${data.id}`,
        {
            method: 'DELETE'
        }
    );
    const users = await response.json();
    dispatch(deleteUser(data?.id))
}

export const loginThunk = (data) => (dispatch) => {
    const regiseredUsers = localStorage.getItem('regiseredUsers') ? JSON.parse(localStorage.getItem('regiseredUsers')) : [];
    if (regiseredUsers && regiseredUsers.length) {
        let obj = regiseredUsers.find((user) => (user.email === data.email) && (user.password === data.password));
        if (obj) {
            localStorage.setItem('logedInUser', JSON.stringify(obj));
            dispatch(setLogedInUser(obj));
        } else {
            dispatch(userNotFound(true));
        }
    } else {
        dispatch(userNotFound(true));
    }
}

export const signupThunk = (data) => (dispatch) => {
    const regiseredUsers = localStorage.getItem('regiseredUsers') ? JSON.parse(localStorage.getItem('regiseredUsers')) : [];
    if (regiseredUsers && regiseredUsers.length) {
        regiseredUsers.push(data);
        localStorage.setItem('regiseredUsers', JSON.stringify(regiseredUsers));
        dispatch(signupCompleted(true));
    } else {
        localStorage.setItem('regiseredUsers', JSON.stringify([data]));
        dispatch(signupCompleted(true));
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('logedInUser');
    dispatch(setLogedInUser(null));
}


// Sync Actions
export const setUsersList = (data) => {
    return {
        type: "USER_LIST",
        payload: data
    }
}

export const addUser = (data) => {
    return {
        type: "ADD_USER",
        payload: data
    }
}

export const updateUser = (data) => {
    return {
        type: "EDIT_USER",
        payload: data
    }
}

export const deleteUser = (id) => {
    return {
        type: "DELETE_USER",
        payload: id
    }
}

export const setLogedInUser = (data) => {
    return {
        type: "LOGIN",
        payload: data
    }
}

export const userNotFound = (data) => {
    return {
        type: "USER_NOT_FOUND",
        payload: data
    }
}

export const signupCompleted = (data) => {
    return {
        type: "SIGNUP",
        payload: data
    }
}
