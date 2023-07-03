import React, { useState } from 'react';
import { TextInput } from './Text_Input';
import { AddingUserButton } from './Adding_User_Button';
import { DoorOpen } from 'react-bootstrap-icons';
import { Modal, Button } from 'react-bootstrap';

/**
 * This function shows the card display of the user
 * @param {*} user The user we are showing
 * @param {*} setUserId This is a part of the useState to change the user/group we are showing
 * @param {*} actions Actions needed to update our user in store and on server
 * @returns A card that displays user's information
 */

export const UserDisplay = ({ user, setUserId, actions }) => {

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => {
        setShowModal(false);
    };

    const handleShow = () => {
        setShowModal(true);
    };
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
                        <table className="table table-hover table-bordered table-warning table-stripped">
                            <thead>
                                <tr>
                                    <th>Group</th>
                                    <th>Latest Role</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user?.membership?.map((membership) => {
                                    if (membership.valid) {
                                        const rolesForGroup = membership.user.roles.filter(
                                            (role) => role.group?.id === membership.group.id
                                        );
                                        const latestRole = rolesForGroup.length > 0 ? rolesForGroup[rolesForGroup.length - 1] : null;

                                        return (
                                            <tr key={membership.group.id}>
                                                <td>{membership.group.name}</td>
                                                <td>{latestRole ? latestRole.roletype?.nameEn : <span>No roles found</span>}</td>
                                                <td>{membership.startdate ? membership.startdate : 'N/A'}</td>
                                                <td>{membership.enddate ? membership.enddate : 'N/A'}</td>
                                                <td>
                                                    <button onClick={() => setUserId(membership.group.id)}>
                                                        <DoorOpen />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    }
                                    return null;
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="card mt-4">
                <div className="card-body">
                    <Button variant="primary" onClick={handleShow}>
                        Add User
                    </Button>
                </div>
            </div>

            <Modal show={showModal} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddingUserButton actions={actions} />
                </Modal.Body>
            </Modal>
        </div>
    );
};


