import { Card_Display } from './Card_Display';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { actions } from 'pages/Redux Store';
import { SearchBar } from './Search_Bar';
import { UserDisplay } from './User_Display';

export const Display = () => {
    const [display, set_display] = useState(0);
    const [display_input, set_display_input] = useState('');
    const groups = useSelector((state) => state.groups);
    const users = useSelector((state) => state.usersByName.users);

    const group = groups[display_input];
    const filteredUsers = users && users.filter((user) =>
        user.name.includes(display_input)
    );

    useEffect(() => {
        if (!group) {
            actions.roleFetch();
            actions.groupFetch(display_input);
        }
    }, [display_input, group]);

    useEffect(() => {
        if (!filteredUsers || filteredUsers.length === 0) {
            actions.userByLetterFetch(display_input);
        }
    }, [display_input, filteredUsers]);

    console.log('display', display);

    const handleSearch = (inputData) => {
        set_display_input(inputData);
    };

    return (
        <>
            <button onClick={() => console.log(group)}>Get store</button>
            <SearchBar onSearch={handleSearch} />
            {group ? (
                <Card_Display group={group} set_display_id={set_display_input} actions={actions} />
            ) : filteredUsers && filteredUsers.length !== 0 ? (
                <div>
                    {filteredUsers.map((user) => (
                        <UserDisplay key={user.name} user={user} />
                    ))}
                </div>
            ) : (
                <div>No matched ID found</div>
            )}
        </>
    );
};
