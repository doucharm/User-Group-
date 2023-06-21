import { useState } from "react";
import { PersonAdd } from "react-bootstrap-icons";
import { TwoStateButton } from "./Delete_Button";
import { v1 } from 'uuid';

export const Adding_User_Button = ({ actions }) => {
    // Adding user button used for add new user to store and server with basic information: id, name , surname, email with two state
    const [new_user, set_new_user] = useState({
        id: v1(),
        name: "",
        surname: "",
        email: "",
    })
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        set_new_user((prev_User) => ({
            ...prev_User,
            [name]: value
        }));
    }
    const adding_user =
        <>
            <label>User's first name:<input type="text" name="name" value={new_user.name} placeholder='Enter user first name' onChange={handleChange} /> </label>
            <label>User's surname:<input type="text" name="surname" value={new_user.surname} placeholder='Enter user surname' onChange={handleChange} /> </label>
            <label>User's email address:<input type="text" name="email" value={new_user.email} placeholder='Enter user email' onChange={handleChange} /> </label>
            <button className='btn btn-sm btn-primary' onClick={() => onUserAdd({ new_user, actions })}><PersonAdd></PersonAdd></button>
        </>
    return (
        <TwoStateButton icon={PersonAdd} sec_button={adding_user} />
    )
}
/**
 * Pushing the new user onto the server
 * @param {*} new_user the user that is going to be created 
 * @returns promise
 */
const onUserAdd = ({ new_user, actions }) => {

    actions.userAsyncInsert(new_user)

}