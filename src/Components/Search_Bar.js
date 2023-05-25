import { useState } from 'react';
import { validate } from 'uuid'
import { fetch_by_letters } from 'Data/UserByLetters';
export const SearchBar = ({ setDisplayId }) => {
    const [inputId, setInputId] = useState('');
    const [users_list,set_users_list]=useState([])
    const handleInputChange = (event) => {
        setInputId(event.target.value);
    };
    const userBasic = (user) =>
    {
        return   (
            <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.email}</td>
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
            console.log('called event')
            fetch_by_letters(inputId,set_users_list)
            console.log("this point reached",users_list)
            
            users_list?.map(user => <userBasic user={user}/>)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="inputId">Enter ID:</label>
            <input
                id="inputId"
                type="text"
                value={inputId}
                onChange={handleInputChange}
            />
            <button type="submit">Submit</button>
        </form>
    );
};