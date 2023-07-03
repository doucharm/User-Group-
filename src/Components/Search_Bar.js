import { useState } from 'react';
import { validate } from 'uuid'
import { fetch_by_letters } from 'Data/UserByLetters';
import { DoorOpen, Search } from 'react-bootstrap-icons';
import { Display } from './Display';
/**
 * Search bar to handle search input.
 * @param {*} actions global actions
 * @returns an ID and it's hook will be passed on to process onto the display components or a list of possible users that match 
 */
export const SearchBar = ({actions}) => {
    const [display_id, set_display_id] = useState(null)
    const [foundID, set_found] = useState(false) // this variables decide wether to show list of users or display the ID selected
    const [inputId, setInputId] = useState('');
    const [users_list, set_users_list] = useState([]) // list of user's that match the entered phrase
    const handleInputChange = (event) => {
        setInputId(event.target.value);
    };
    const handleSubmit = (event) => {  //process the ID inputed and check if it's a valid ID, a string indicating name or just invalid
        event.preventDefault();
        if (validate(inputId)) {
            set_display_id(inputId)
            set_found(true)
        } else
        {
            fetch_by_letters(inputId,set_users_list)
            set_found(false) 
        }
    }
    if (users_list.length > 0 && !foundID) { // return a list of users that match the phrase entered
        return (
            <>
                <SearchBarDisplay inputId={inputId} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
                <table class="table table-sm table-info">
                    <caption>  Possible users with that name: </caption>
                    <thead><td>ID</td><td>Name</td><td>Surname</td><td>Email</td></thead>
                    <tbody>
                        {users_list?.map((user) => <UserBasic key={user.id} user={user} set_display_id={set_display_id } set_found={set_found} />)}
                    </tbody>
                </table>
            </>
        )
    } else if (display_id) { // pass the validated ID onto Display.js component
        return (
            <>
                <SearchBarDisplay inputId={inputId} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
                <Display display_id={display_id} set_display_id={set_display_id} actions={actions} />
            </>
        )
    } else { // when no id is entered leave the ID box blank
        return (<SearchBarDisplay inputId={inputId} handleInputChange={handleInputChange} handleSubmit={handleSubmit} /> )
    }

};
/**
 * Component SearchBar include a text input for information and a search button
 * @param {string} inputID displaying the ID that's in the box
 * @returns {Component} an ID and it's hook will be passed on to process onto the display components or a list of possible users that match 
 */
const SearchBarDisplay = ({inputId,handleInputChange,handleSubmit}) =>
{
    return (
        <>
        <input className='input1' id="inputID" type='text' value={inputId} onChange={handleInputChange} />
        <button className='button1' onClick={handleSubmit}><Search></Search></button>
        </>
    )
}
export const UserBasic = ({ user, set_display_id,set_found}) => { // simple component to display user list and link to open these user
    const findID = () => {
        set_display_id(user.id)
        set_found(true)
    }
    return (
        <tr onClick={e => findID()}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.surname}</td>
            <td>{user.email}</td>         
        </tr>
    )
}