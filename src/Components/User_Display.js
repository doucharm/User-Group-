import React from 'react';
import { TextInput } from './Text_Input';
import { Adding_User_Button } from './Adding_User_Button';

export const UserDisplay = ({ user, setUserId, actions }) => {
    // This component is used for displaying the information of user and changing the information of user
    const onChangeInput = (field, value) => {
        const updatedUser = { ...user, [field]: value };
        actions.userAsyncUpdate(updatedUser).then((json) =>
            console.log("UserInput", json.data.userUpdate.msg)
        );
    };

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
                                onChange={(value) => onChangeInput('name', value)}
                            />
                        </p>
                        <p>
                            <strong>Surname:</strong>
                            <TextInput
                                placeholder="surname"
                                id={user.id}
                                value={user.surname}
                                onChange={(value) => onChangeInput('surname', value)}
                            />
                        </p>
                        <p>
                            <strong>Email:</strong>
                            <TextInput
                                placeholder="email"
                                id={user.id}
                                value={user.email}
                                onChange={(value) => onChangeInput('email', value)}
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
                                            {index !== user.membership.length - 1 && <br /> /* If there is no more group that the user belong to then break*/}
                                        </span>
                                    );
                                }
                                return null
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




