import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, selectUsers } from "./userViewSlice";

const userView = () => {
    const dispatch = useDispatch();
    const allUsers = useSelector(selectUsers)

    useEffect(() => {
        console.log(allUsers)
        dispatch(fetchAllUsers())
    }, [dispatch])

    return (
        <h1>
            {allUsers.map((user) => (
                <div>
                    {user.username}
                </div>
            ))}
        </h1>
    )
}

export default userView;