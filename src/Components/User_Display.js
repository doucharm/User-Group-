import React from 'react';
import { useState } from 'react';
import { TextInput } from './Text_Input';
import { Adding_User_Button } from './Adding_User_Button';
import { DoorOpen } from 'react-bootstrap-icons';
import { Modal, Button } from 'react-bootstrap';
import { Card_Display } from './Card_Display';

export const UserDisplay = ({ user, setUserId, actions }) => {
    // This component is used for displaying the information of user and changing the information of user
    const [showModal, setShowModal] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);

    const handleDetails = (group) => {
        setSelectedGroup(group);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };
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
                        <table class="table table-hover table-bordered table-warning table-stripped">
                            <thead>
                                <tr>
                                    <th>Group</th>
                                    <th>Latest Role</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user?.membership?.map((membership, index) => {
                                    if (membership.valid) {
                                        let latestRole = null;
                                        if (membership.group.roles && membership.group.roles.length > 0) {
                                            const roles = membership.group.roles;
                                            latestRole = roles[roles.length - 1];
                                        }
                                        return (
                                            <tr key={membership.group.id}>
                                                <td>{membership.group.name}</td>
                                                <td>{latestRole ? latestRole.roletype?.nameEn : <span>No roles found</span>}</td>
                                                <button
                                                    onClick={() => handleDetails(membership.group)}
                                                >
                                                    <DoorOpen></DoorOpen>
                                                </button>
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
                    <h5 className="card-title">Add User</h5>
                    <Adding_User_Button actions={actions} />
                </div>
            </div>

            <Modal show={showModal} onHide={handleClose} size="xl" >
                <Modal.Header closeButton>
                    <Modal.Title>Group Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedGroup && (
                        <Card_Display
                            group={selectedGroup}
                            set_display_id={selectedGroup.id}
                            actions={actions}
                        />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};




