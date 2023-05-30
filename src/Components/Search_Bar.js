import { useState } from 'react';
import { validate } from 'uuid'
import { fetch_by_letters } from 'Data/UserByLetters';
import { DoorOpen, Search } from 'react-bootstrap-icons';
import { Display } from './Display';
export const SearchBar = () => {
    console.log('search bar called')
    const [display_id, set_display_id] = useState(null)
    const [foundID, set_found] = useState(false)
    const [inputId, setInputId] = useState('');
    const [users_list, set_users_list] = useState([])
    const handleInputChange = (event) => {
        setInputId(event.target.value);
    };
    const UserBasic = ({ user }) => {
        const findID = () => {
            console.log("Event called ")
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
    const handleSubmit = (event) => {
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
    if (users_list.length > 0 && !foundID) {
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
                        {users_list?.map((user) => <UserBasic user={user} />)}
                    </tbody>

                </table>

            </>
        )
    } else if (display_id) {
        console.log("display id going into display", display_id) 

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

                <Display display_id={display_id} set_display_id={set_display_id} />
            </>


        )
    } else {
        return (

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
        )
    }

};