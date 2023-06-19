import { useCallback, useState } from "react";
import { Trash2, Save, PersonAdd } from "react-bootstrap-icons";
import { v1 } from 'uuid';

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