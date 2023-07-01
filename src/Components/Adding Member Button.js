import { useState } from 'react';
import { PersonAdd, Search } from 'react-bootstrap-icons';
import { v1 } from 'uuid';
import { fetch_by_letters } from 'Data/UserByLetters';
import { useSelector } from 'react-redux';

export const AddingMember_Button = ({user,group,actions}) => {
    const onclick = () => {
        const membership_id = v1() //Generate an id for the membership of that user
        const modify_user = {
            ...user,
            roles: [],
            membership:
                [
                    {
                        id: membership_id
                    }
                ]
        }
        // Give the user we modify a specific membership id
        const membership =
        {
            id: membership_id,
            valid: true,
            user: modify_user,
            group: group
        }
        // We also correspond the membership of that user the appropriate props
        const payload = {
            store_update:
            {
                group: group,
                membership: membership
            },
            user_id: modify_user.id,
            group_id: group.id,
            id:membership_id
        }
        // The payload that requires userid, groupid and the membership id to assign the user to the previously called group
        const check_existance = group.memberships.find(
            (m) => m.user.id === payload.user_id && m.valid //Check if the user has already been in the group
        );
        if (!check_existance) {

            actions.userAsyncUpdate(modify_user).then(actions.membershipAsyncInsert(payload)) // If not then we add it to the server and the store
        } else {
            console.warn("existed") // We wont be alble to add the user once more if its already existed
        }

    }
    return (
        <button onClick={onclick}><PersonAdd></PersonAdd></button>
    )
}
export const MembershipInsert_SearchBar = ({ group, actions }) => {
    const [inputId, setInputId] = useState(''); //Define the input for the search bar
    const [users_list, set_users_list] = useState([]) //Convert users in store to array 
    const users = useSelector((state) => state.users)
    const user = users[inputId] //Get the user we need with the corresponding inputId

    const handleInputChange = (event) => {
        setInputId(event.target.value) //Set the inputId to what we type on the search bar form 
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        actions.userFetch(inputId) //Fetch the user by id inputId
        fetch_by_letters(inputId, set_users_list) //Fetch the user by letter which is the inputId
    }
    
    // Down below we have 2 diffence interface, 1 for when you dont trigger the HandleSubmit and the other is to show all of the users with the relative letters
    if (users_list.length === 0) {
        return (
            <>
                <form method="GET" id="my_form" onSubmit={handleSubmit} ></form>
                <table class="table table-sm table-info">
                    <thead>
                        <label htmlFor="Id" form='my_form'>Add new member:</label>
                        <input
                            form="my_form"
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
                            form="my_form"
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
                        {users_list?.map((user) => <UserBasic user={user} group={group} actions={actions}/>)}
                    </tbody>
                </table>
            </>
        )
    }
}

const UserBasic = ({ user, group, actions }) => { //This function return a table that return a row of user that contains an add button to insert the user to the group we're seeing
    return (
        <tr>
            <td>{user.name} {user.surname}</td> 
            <AddingMember_Button user = {user} group={group} actions={actions}/>
        </tr>
    )
}