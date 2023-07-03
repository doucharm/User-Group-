import { useState } from 'react';
import { ArrowLeftRight, Search } from 'react-bootstrap-icons';
import { v1 } from 'uuid';
import { fetch_by_letters } from 'Data/UserByLetters';
import { useSelector } from 'react-redux';

// Replace Button is a combination of Adding Member Button and Delete Button
// It is used to replace a member of a group with another user

export const Replace_Button = ({ group, actions, membership }) => {
    const [searchMode, setSearchMode] = useState(false);

    const handleClick = () => {
        setSearchMode(true);
    };

    if (searchMode) { // Searchbar using for search the wanted user by name
        return <MembershipInsert_SearchBar group={group} membership={membership} actions={actions} />
    } else {
        return (
            <button onClick={handleClick}><ArrowLeftRight /></button>
        );
    }
};
/**
 * This function does 2 main job: Remove the old user from the group and add a new ones in with the same role
 * @param {*} user The user we use to add to a group
 * @param {*} group The group we want to add that user to
 * @param {*} membership the membership of the old user with his role
 * @param {*} actions The actions needed to proceed with the button (both in store and on server)
 * @returns 
 */
export const Replace_Condition = ({ user, group, membership, actions }) => {
    const handleReplace = () => {
        const current_role = membership?.user.roles?.filter((item) => item.group?.id === membership.group?.id && item.valid === true) // Keep the current role of the user for the new user
        let moving_role = ""
        if (current_role.length > 0) {
            moving_role = current_role[current_role.length - 1]
        }
        const membershipId = v1();
        const modifyUser = {
            ...user,
            roles: [],
            membership: [
                {
                    id: membershipId,
                },
            ],
        };
        const newMembership = {
            id: membershipId,
            valid: true,
            user: modifyUser,
            group: { id: membership.group.id },
            lastchange: Date.now(),
        };

        const payload = {
            store_update: {
                group: { id: membership.group.id },
                membership: newMembership,
            },
            id: newMembership.id,
            user_id: modifyUser.id,
            group_id: group.id,
        };
        const checkExistence = group.memberships.find(
            (m) => m.user.id === payload.user_id && m.valid  // Check if the user is already membership of the group
        );
        if (!checkExistence) { // if not then insert new user and remove old user from the group
            actions
                .userAsyncUpdate(modifyUser)
                .then(() => actions.membershipAsyncInsert(payload))
                .then(() =>
                    actions.membershipAsyncUpdate({
                        id: membership.id,
                        lastchange: membership.lastchange,
                        valid: false,
                    })
                )
                .then(() => actions.onMemberRemove({ group, membership }))
                .then(
                    () => {
                        if (moving_role.roletype) {
                            const new_role =
                            {
                                role: moving_role.roletype,
                                membership: newMembership,

                            }
                            actions.roleAsyncUpdate({ role: { ...moving_role, valid: false }, membership: { ...membership, valid: false } })
                            actions.roleAsyncInsert(new_role)
                        }
                    }
                )
                .catch((error) => {
                    console.log('Error occurred:', error);
                });


        } else {
            console.log("existed");
        }
    };
    return (
        <button onClick={handleReplace}><ArrowLeftRight /></button>
    )
}

/**
 * This is the display of a name search bar, we use this to find for the user we need to add it in to our group
 * @param {*} group The group we want to add that user to
 * @param {*} membership the membership with the row we want to assign that user to
 * @param {*} actions The actions needed to take the data on server and proceed with it
 * @returns A table with a form in it, the rows would be the users we found with the letter provided on our form
 */
export const MembershipInsert_SearchBar = ({ group, membership, actions }) => {
    const [inputId, setInputId] = useState(''); //Define the input for the search bar
    const [usersList, setUsersList] = useState([]); //Convert users in store to array
    const users = useSelector((state) => state.users)
    const user = users[inputId] //Get the user we need with the corresponding inputId


    const handleInputChange = (event) => {
        setInputId(event.target.value);
    };

    const handleSubmit = (event) => {  // search for user by letter
        event.preventDefault();
        actions.userFetch(inputId); //Fetch the user by id inputId
        fetch_by_letters(inputId, setUsersList); //Fetch the user by letter which is the inputId
    };

    // Down below we have 2 diffence interface, 1 for when you dont trigger the HandleSubmit and the other is to show all of the users with the relative letters
    if (usersList.length === 0) {
        return (
            <form method="GET" id="my_form" onSubmit={handleSubmit}>
                <label htmlFor="Id">Add new member:</label>
                <input
                    form="my_form"
                    id="Id"
                    type="text"
                    value={inputId}
                    onChange={handleInputChange}
                />
                <button type="submit" title="Submit Form"><Search /></button>
            </form>
        );
    } else {
        return (
            <form method="GET" id="my_form" onSubmit={handleSubmit}>
                <table className="table table-sm table-info">
                    <thead>
                        <tr>
                            <th>
                                <label htmlFor="Id">Add new member:</label>
                                <input
                                    form="my_form"
                                    id="Id"
                                    type="text"
                                    value={inputId}
                                    onChange={handleInputChange}
                                />
                                <button type="submit" title="Submit Form"><Search /></button>
                            </th>
                            <th>Replace</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersList?.map((user) => (
                            <UserBasic
                                key={user.id}
                                user={user}
                                group={group}
                                membership={membership}
                                actions={actions}
                            />
                        ))}
                    </tbody>
                </table>
            </form>
        );
    }
};

/**
 * This function return a table that return a row of user that contains an add button to insert the user to the group we're seeing
 * @param {*} user The user we are showing
 * @param {*} group The group we want to add that user to
 * @param {*} membership the membership with the row we want to assign that user to
 * @param {*} actions The actions needed in the Replace_Condition function
 * @returns Table rows in html form
 */
const UserBasic = ({ user, group, membership, actions }) => {

    return (
        <tr>
            <td>{user.name} {user.surname}</td>
            <td><Replace_Condition user={user} group={group} membership={membership} actions={actions} /></td>
        </tr>
    );
};