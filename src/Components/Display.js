import { Card_Display } from './Card_Display';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { actions } from 'pages/Redux Store';
import { SearchBar } from './Search_Bar';
import { UserDisplay } from './User_Display';

export const Display = ({ id }) => {
    const [display, set_display] = useState(0)
    const [display_id, set_display_id] = useState(id)
    const groups = useSelector((state) => state.groups);
    const users = useSelector((state) => state.users);
    const usersByLetter = useSelector((state) => state.usersByName.usersByLetter);
    const group = groups[display_id];
    const user = users[display_id];
    const filteredUsers = usersByLetter && usersByLetter.filter((user) =>
        user.name.includes(display_id)
    );

    useEffect(() => {
        if (!group) {
            actions.roleFetch();
            actions.groupFetch(display_id)
        }
    }, [display_id, group]);
    useEffect(() => {
        if (!user) {
            actions.userFetch(display_id)
        }
    }, [display_id, user]);
    useEffect(() => {
        if (!filteredUsers || filteredUsers.length === 0) {
            actions.userByLetterFetch(display_id);
        }
    }, [display_id, filteredUsers]);

    console.log('display', display)

    return (
        <>
            <button onClick={event => console.log(group)}>Get store</button>
            <SearchBar setDisplayId={set_display_id} />

            {group && (
                <>
                    <Card_Display group={group} set_display_id={set_display_id} actions={actions} />
                </>
            )}

            {user && (
                <>
                    <h2>User Info</h2>
                    <UserDisplay user={user} setUserId={set_display_id} />
                </>
            )}

            {filteredUsers && filteredUsers.length !== 0 && (
                <>
                    <div>
                        <h2>User Info</h2>
                        {filteredUsers.map((user) => (
                            <UserDisplay key={user.name} user={user} setUserId={set_display_id} />
                        ))}
                    </div>
                </>
            )}

            {!group && !user && (!filteredUsers || filteredUsers.length === 0) && (
                <>
                    <div>No matched ID found</div>
                </>
            )}
        </>
    )
};