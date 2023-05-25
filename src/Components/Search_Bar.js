import { useState } from 'react';
import { validate } from 'uuid'
import { fetch_by_letters } from 'Data/UserByLetters';
import { DoorOpen, Search } from 'react-bootstrap-icons';
import userEvent from '@testing-library/user-event';
export const SearchBar = ({ setDisplayId }) => {
    const [inputId, setInputId] = useState('');
    const [users_list,set_users_list]=useState([])
    const handleInputChange = (event) => {
        setInputId(event.target.value);
    };
    const UserBasic = ({user}) =>
    {
        
        return   (
            <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.email}</td>
                <button onClick={event => setDisplayId(user.id)}><DoorOpen></DoorOpen></button>
            </tr>
        )
    }
    const handleSubmit = (event) => 
    {
        event.preventDefault();
        if(validate(inputId))
        {
            setDisplayId(inputId)
        } else
        {
            fetch_by_letters(inputId,set_users_list)
        }
    }

    if(users_list.length===0)
    {
        return (
        
            <form onSubmit={handleSubmit}>
                <label htmlFor="inputId">Enter ID:</label>
                <input
                    id="inputId"
                    type="text"
                    value={inputId}
                    onChange={handleInputChange}
                />
                <button type="submit"><Search></Search></button>
            </form>
        );
    } else 
    { 
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
                <button type="submit"><Search></Search></button>
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
                {users_list?.map((user) => <UserBasic user={user}/>)}
                </tbody>
           
            </table>
            
            </>
        )
    }
   
};