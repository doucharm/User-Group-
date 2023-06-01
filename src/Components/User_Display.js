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

    return (
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
                            <br></br>
                            {user?.membership?.map((membership, index) => (
                                <React.Fragment key={membership.group.id}>
                                    <span>
                                        {membership.group.name}:{" "}
                                        {membership.group.roles && membership.group.roles.length > 0 ? (
                                            membership.group.roles.reduce((latestRole, role) =>
                                                role && role.lastchange > latestRole.lastchange ? role : latestRole
                                            ).roletype?.nameEn
                                        ) : (
                                            <span>No roles found</span>
                                        )}
                                    </span>
                                    {index !== user.membership.length - 1 && <br />} { }
                                </React.Fragment>
                            ))}
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
