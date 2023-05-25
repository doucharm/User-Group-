import React from 'react';
import { useSelector } from 'react-redux';
import { actions } from 'pages/Redux Store';
import { TextInput } from './Text_Input';
import { useEffect } from 'react';

export const UserDisplay = ({ user, setUserId }) => {

    const onChangeEmail = (value) => {
        if (actions.onUserUpdate) {
            const payload = { user: { ...user, email: value } }
            actions.onUserUpdate(payload)
        }
    }


    const onChangeSurname = (value) => {
        if (actions.onUserUpdate) {
            const payload = { user: { ...user, surname: value } }
            actions.onUserUpdate(payload)
        }
    }

    const onChangeName = (value) => {
        if (actions.onUserUpdate) {
            console.log(user, value)
            const payload = { user: { ...user, name: value } }
            actions.onUserUpdate(payload)
        }
    }


    return (
        <div>
            <h2>User Info</h2>
            <table className="table table-hover table-bordered table-light table-stripped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Email</th>
                        <th>Group</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{user.id}</td>
                        <td>
                            <TextInput placeholder={"name"} id={user.id} value={user.name} onChange={onChangeName} />
                        </td>
                        <td>
                            <TextInput placeholder={"surname"} id={user.id} value={user.surname} onChange={onChangeSurname} />
                        </td>
                        <td>
                            <TextInput placeholder={"email"} id={user.id} value={user.email} onChange={onChangeEmail} />
                        </td>
                        <td>{user?.membership[0]?.group?.name}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
