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
    const [foundID, set_found] = useState(false)
    const [inputId, setInputId] = useState('');
    const [users_list, set_users_list] = useState([])
    const handleInputChange = (event) => {
        setInputId(event.target.value);
    };

    const handleSubmit = (event) => {  //process the ID inputed and check if it's a valid ID, a string indicating name or just invalid
        console.log(inputId)
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
    console.log(users_list)
    console.log(foundID)
    if (users_list.length > 0 && !foundID) { // return a list of user that match the phrase entered
        return (
            <>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="inputId">Enter ID:</label>
                    <input
                        id="inputId"
                        type="text"
                        value={inputId}
                        onChange={handleInputChange}
                    />
                    <button type="submit" title="Submit Form"><Search></Search></button>
                </form>

                <table class="table table-sm table-info">
                    <caption>  Possible users with that name: </caption>
                    <thead>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Surname</td>
                        <td>Email</td>
                        <td>     </td>
                    </thead>
                    <tbody>
                        {users_list?.map((user) => <UserBasic user={user} set_display_id={set_display_id } set_found={set_found} />)}
                    </tbody>

                </table>

            </>
        )
    } else if (display_id) { // pass the validated ID onto Display.js component
        return (

            <>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="inputId">Enter ID:</label>
                    <input
                        id="inputId"
                        type="text"
                        value={inputId}
                        onChange={handleInputChange}
                    />
                    <button type="submit" title="Submit Form"><Search></Search></button>
                </form>

                <Display display_id={display_id} set_display_id={set_display_id} actions={actions} />
            </>


        )
    } else {
        return (
            <>
           <img src="https://scx1.b-cdn.net/csz/news/800/2017/theoreticala.jpg" alt="Enter an ID or name"/> 
            <form onSubmit={handleSubmit}>
                <label htmlFor="inputId">Enter ID:</label>
                <input
                    id="inputId"
                    type="text"
                    value={inputId}
                    onChange={handleInputChange}
                />
                <button type="submit" title="Submit Form"><Search></Search></button>
            </form>
            </>
        )
    }

};
export const UserBasic = ({ user, set_display_id,set_found}) => { // simple component to display user list and link to open these user
    const findID = () => {

        set_display_id(user.id)
        set_found(true)
    }
    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.surname}</td>
            <td>{user.email}</td>
            <button onClick={event => findID()}><DoorOpen></DoorOpen></button>
        </tr>
    )
}