import React from 'react';
import { TextInput } from './Text_Input';
import { useState, useCallback } from 'react';
import { PersonAdd, Save, Trash2 } from 'react-bootstrap-icons';
import { v1 } from 'uuid';

export const UserDisplay = ({ user, setUserId, actions }) => {
    const onChangeEmail = (value) => {
        actions.userAsyncUpdate({ ...user, email: value }).then((json) =>
            console.log("UserEmailInput", json.data.userUpdate.msg)
        );
    };

    const onChangeSurname = (value) => {
        actions.userAsyncUpdate({ ...user, surname: value }).then((json) =>
            console.log("UserSurnameInput", json.data.userUpdate.msg)
        );
    };

    const onChangeName = (value) => {
        actions.userAsyncUpdate({ ...user, name: value }).then((json) =>
            console.log("UserNameInput", json.data.userUpdate.msg)
        );
    };

    // These three used for changing the information of user: name, surname, email.

    return ( // Showing the information of user
        <div>
            <h2>User Info</h2>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">User Details</h5>
                    <div className="card-text">
                        <p>
                            <strong>ID:</strong> {user.id}
                        </p>
                        <p>
                            <strong>Name:</strong>
                            <TextInput
                                placeholder="name"
                                id={user.id}
                                value={user.name}
                                onChange={onChangeName}
                            />
                        </p>
                        <p>
                            <strong>Surname:</strong>
                            <TextInput
                                placeholder="surname"
                                id={user.id}
                                value={user.surname}
                                onChange={onChangeSurname}
                            />
                        </p>
                        <p>
                            <strong>Email:</strong>
                            <TextInput
                                placeholder="email"
                                id={user.id}
                                value={user.email}
                                onChange={onChangeEmail}
                            />
                        </p>
                        <p> 
                            <strong>Groups:</strong>
                            <br />
                            {user?.membership?.map((membership, index) => { // Showing the groups that user is in and the role of user in that group
                                if (membership.valid) { 
                                    let latestRole = null;

                                    if (membership.group.roles && membership.group.roles.length > 0) { 
                                        const sortedRoles = [...membership.group.roles].sort((a, b) => { 
                                            // Because we can change the role of the membership
                                            // So the user display need to be updated to show the latest role based on lastchange
                                            const dateA = new Date(a.lastchange);
                                            const dateB = new Date(b.lastchange);

                                            return dateB - dateA;
                                        });

                                        latestRole = sortedRoles[0];
                                    }

                                    return (
                                        <span key={membership.group.id}>
                                            {membership.group.name}:{" "} 
                                            {latestRole ? (
                                                latestRole.roletype?.nameEn
                                            ) : (
                                                <span>No roles found</span> // user has membership in the group but not role
                                            )}
                                            {index !== user.membership.length - 1 && <br /> /* If there is no more group that the user belong to then break*/ }
                                        </span>
                                    );
                                }
                            })}
                        </p>
                    </div>
                </div>
            </div>
            <div className="card mt-4">
                <div className="card-body">
                    <h5 className="card-title">Add User</h5>
                    <Adding_User_Button actions={actions} />
                </div>
            </div>
        </div>
    );
};


export const Adding_User = ({ new_user, set_new_user, onClick, setState0, setState1, state }) => {
// Adding user button used for add new user to store and server with basic information: id, name , surname, email with two state
    if (state === 0) {
        return (
            <button className='btn btn-sm btn-primary' onClick={setState1}><PersonAdd></PersonAdd></button>
        )
    } else {
        function handleChange(evt) {
            const value = evt.target.value;
            set_new_user({
                ...new_user,
                [evt.target.name]: value
            });
        }
        return (
            <>
                <label>User's first name:<input type="text" name="name" value={new_user.name} placeholder='Enter user first name' onChange={handleChange} /> </label>
                <label>User's surname:<input type="text" name="surname" value={new_user.lastName} placeholder='Enter user surname' onChange={handleChange} /> </label>
                <label>User's email address:<input type="text" name="email" value={new_user.email} placeholder='Enter user email' onChange={handleChange} /> </label>

                <button className='btn btn-sm btn-warning' onClick={setState0}><Trash2></Trash2></button>
                <button className='btn btn-sm btn-success' onClick={onClick}><Save></Save></button>
            </>
        )
    }
}

export const Adding_User_Button = ({ actions }) => {

    const [new_user, set_new_user] = useState({
        id: "",
        name: "",
        surname: "",
        email: "",


    })
    const onClick = () => {
        new_user.id = v1()

        actions.userAsyncInsert(new_user).then
            (
                setState0
            )
    }
    const [state, setState] = useState(0)
    const setState0 = useCallback(() => setState(0))
    const setState1 = useCallback(() => setState(1))

    return (
        <Adding_User new_user={new_user} state={state} setState0={setState0} setState1={setState1} set_new_user={set_new_user} onClick={onClick}><PersonAdd></PersonAdd></Adding_User>
    )
}