import { useState } from 'react';
import { PersonAdd,Search} from 'react-bootstrap-icons';
import { v1 } from 'uuid';
import { fetch_by_letters } from 'Data/UserByLetters';
import { useSelector } from 'react-redux';


export const MembershipInsert_SearchBar = ({group,actions}) => {
    const [inputId, setInputId] = useState('');
    const [users_list,set_users_list]=useState([])
    const users = useSelector((state) => state.users)
    const user = users[inputId]
    
    const handleInputChange = (event) => {
        setInputId(event.target.value)
    }
    const handleSubmit = (event) => 
    {
        event.preventDefault();
        actions.userFetch(inputId)
        console.log(user)
        console.log(inputId)
        fetch_by_letters(inputId,set_users_list)
    }
    const UserBasic = ({user}) =>
    {
        
        const onclick = () =>
        {
            const membership_id=v1()
            const modify_user = {...user,
                roles:[],
                membership:
            [
                {
                    id:membership_id
                }
            ]
            }
            const membership=
            {
                id:membership_id,
                valid:true,
                user:modify_user,
                group:group
            }
            const payload = {
                store_update:
                {
                    group:group,
                    membership:membership
                },
                user_id: modify_user.id,
                group_id: group.id
            }
            const check_existance = group.memberships.filter(m => m.user.id === payload.user_id)
            console.log(check_existance)
            if (check_existance.length===0){
                actions.userAsyncUpdate(modify_user).then(actions.membershipAsyncInsert(payload))
            }else {
                console.log("existed")
            }
            
        }
        return   (
            <tr>
                <td>{user.name} {user.surname}</td>
                <button onClick={onclick}><PersonAdd></PersonAdd></button>
            </tr>
        )
    }
    if (users_list.length===0)
    {
        return (
            <>
            <form method="GET" id="my_form" onSubmit={handleSubmit} ></form>
            <table class="table table-sm table-info">
                <thead>
                <label htmlFor="Id" form='my_form'>Add new member:</label>
                <input
                    form = "my_form"
                    id="Id"
                    type="text"
                    value={inputId}
                    onChange={handleInputChange}
                />
                <button type="submit" title="Submit Form" form='my_form'><Search></Search></button>
                </thead>
            </table>
            
            </>
        )
    } else {
        return (
            <>
            <form method="GET" id="my_form" onSubmit={handleSubmit} ></form>
            <table class="table table-sm table-info">
            <caption>  Possible users with that name: </caption>
                <thead>
                <label htmlFor="Id" form='my_form'>Add new member:</label>
                <input
                    form = "my_form"
                    id="Id"
                    type="text"
                    value={inputId}
                    onChange={handleInputChange}
                />
                <button type="submit" title="Submit Form" form='my_form'><Search></Search></button>
                <br></br>
                <td>Name</td>
                </thead>
                <tbody>
                {users_list?.map((user) => <UserBasic user={user}/>)}
                </tbody>
            </table>
            </>
        )
    }
}