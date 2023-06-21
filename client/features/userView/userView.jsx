import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, selectUsers } from "./userViewSlice.js";

const UserView = () => {
    const dispatch = useDispatch();
    const allUsers = useSelector(selectUsers);
    const isLoading = false;

useEffect(() => {
  dispatch(fetchAllUsers());
}, [dispatch]);

if (isLoading) {
  return <div>Loading...</div>;
}

return (
  <div>
    <h1>Users:</h1>
    <ol>
      {allUsers.map((user) => (
        <li key={user.id}>
          <div>
            <strong>Username:</strong> {user.username}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>Full Name: </strong> {user.firstName} {user.lastName}
          </div>
          <div>
            <strong>Admin:</strong> {user.isAdmin ? "Yes" : "No"}
          </div>
        </li>
      ))}
    </ol>
  </div>
);
};

export default UserView;