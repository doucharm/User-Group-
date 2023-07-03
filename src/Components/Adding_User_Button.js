import { useState } from "react";
import { PersonAdd } from "react-bootstrap-icons";
import { v1 } from 'uuid';
/**
 * This button add a new user to the user's page on sever 
 * @param {Object} actions The actions needed for the Adding user button to update our web in store and on sever
 * @returns {JSX.Element} A two-state button with the icon PersonAdd
 */
export const AddingUserButton = ({ actions }) => {
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
    return (
        <>
            <table>
                <tbody>
                <tr>
                    <td><label>User's first name:<input type="text" name="name" value={new_user.name} placeholder='Enter user first name' onChange={handleChange} /> </label></td>
                    <td><label>User's surname:<input type="text" name="surname" value={new_user.surname} placeholder='Enter user surname' onChange={handleChange} /> </label></td>
                    <td><label>User's email address:<input type="text" name="email" value={new_user.email} placeholder='Enter user email' onChange={handleChange} /> </label></td>
                </tr>
                </tbody>
            </table>
            <button className='btn btn-sm btn-primary' onClick={() => onUserAdd({ new_user, actions })}><PersonAdd></PersonAdd></button>
        </>
    )
}
/**
 * Pushing the new user onto the server
 * @param {Object} new_user the user that is going to be created 
 * @returns promise
 */
const onUserAdd = ({ new_user, actions }) => {

    actions.userAsyncInsert(new_user)

}