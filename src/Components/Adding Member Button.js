import { useState } from 'react';
import { PersonAdd, Search } from 'react-bootstrap-icons';
import { v1 } from 'uuid';
import { fetch_by_letters } from 'Data/UserByLetters';
import { useSelector } from 'react-redux';

/**
 * This button adds an user as the membership to the group we are accessing to
 * @param {Object} user The user we use to add to a group
 * @param {Object} group The group we want to add that user to
 * @param {Object} actions The actions needed to proceed with the button (both in store and on server)
 * @returns {JSX.Element} a button with the onclick we define below and it has the icon of Person Add
 */
export const AddingMember_Button = ({ user, group, actions }) => {
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
            id: membership_id
        }
        // The payload that requires userid, groupid and the membership id to assign the user to the previously called group
        const check_existance = group.memberships.find(
            (m) => m.user.id === payload.user_id && m.valid //Check if the user has already been in the group
        );
        if (!check_existance) {

            actions.userAsyncUpdate(modify_user).then(actions.membershipAsyncInsert(payload)) // If not then we add it to the server and the store
        } else {
            window.alert('Existed!') // We wont be alble to add the user once more if its already existed
        }

    }
    return (
        <button onClick={onclick}><PersonAdd></PersonAdd></button>
    )
}

/**
 * This is the display of a name search bar, we use this to find for the user we need to add it in to our group
 * @param {Object} group The group we want to add that user to
 * @param {Object} actions The actions needed to take the data on server and proceed with it
 * @returns {JSX.Element} A table with a form in it, the rows would be the users we found with the letter provided on our form
 */
export const MembershipInsert_SearchBar = ({ group, actions }) => {
    const [inputId, setInputId] = useState(''); // Define the input for the search bar
    const [users_list, set_users_list] = useState([]); // Convert users in store to array
    const users = useSelector((state) => state.users);
    const user = users[inputId]; // Get the user we need with the corresponding inputId
  
    const handleInputChange = (event) => {
      setInputId(event.target.value); // Set the inputId to what we type on the search bar form
    };
    const handleSubmit = (event) => {
      event.preventDefault();
      actions.userFetch(inputId); // Fetch the user by id inputId
      fetch_by_letters(inputId, set_users_list); // Fetch the user by letter which is the inputId
    };
  
    // Down below we have 2 different interfaces, 1 for when you don't trigger the handleSubmit and the other is to show all of the users with the relative letters
    if (users_list.length === 0) {
      return (
        <tr>
        <td>
          <form method="GET" id="my_form" onSubmit={handleSubmit}></form>
          <label htmlFor="Id" form="my_form">
            Add new member:
          </label>
          <input form="my_form" id="Id" type="text" value={inputId} onChange={handleInputChange} />
          <button type="submit" title="Submit Form" form="my_form">
            <Search></Search>
          </button>
          <table className="table table-sm table-info">
            <thead></thead>
          </table>
        </td>
        </tr>
      );
    } else {
      return (
        <>
        <tr>
        <td>
          <form method="GET" id="my_form" onSubmit={handleSubmit}></form>
          <label htmlFor="Id" form="my_form">
            Add new member:
          </label>
          <input form="my_form" id="Id" type="text" value={inputId} onChange={handleInputChange} />
          <button type="submit" title="Submit Form" form="my_form">
            <Search></Search>
          </button>
          <table className="table table-sm table-info">
            <caption> Possible users with that name: </caption>
            <thead>
              <tr>
                <th>Insert</th>
              </tr>
            </thead>
            <tbody>
              {users_list?.map((user) => (
                <UserBasic key ={user.id} user={user} group={group} actions={actions} />
              ))}
            </tbody>
          </table>
          </td>
        </tr>
        </>
      );
    }
  };
  
/**
 * This function return a table that return a row of user that contains an add button to insert the user to the group we're seeing
 * @param {Object} user The user we are showing
 * @param {Object} group The group we want to add that user to
 * @param {Object} actions The actions needed in the AddingMember_Button function
 * @returns {JSX.Element} Table rows in html form
 */
const UserBasic = ({ user, group, actions }) => {
    return (
        <tr>
            <td>{user.name} {user.surname}
            <AddingMember_Button user={user} group={group} actions={actions} />
            </td>
        </tr>
    )
}