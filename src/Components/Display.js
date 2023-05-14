import { Card_Display } from './Card_Display';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { actions } from 'pages/Redux Store';
import { SearchBar } from './Search_Bar';
import { UserDisplay } from './User_Display';

export const Display = ({ gid, uid }) => {
    const [displayGroupId, setDisplayGroupId] = useState(gid);
    const [displayUserId, setDisplayUserId] = useState(uid);
    const groups = useSelector((state) => state.groups);
    const users = useSelector((state) => state.users);
    const group = groups[displayGroupId];
    const user = users[displayUserId];
    console.log(users);
    console.log(user);

    useEffect(() => {
        if (!group) {
            console.log('GroupPageProvider refetch ' + displayGroupId);
            actions.roleFetch();
            actions.groupFetch(displayGroupId);
        }
    }, [displayGroupId, group]);

    useEffect(() => {
        if (!user) {
            console.log('UserPageProvider refetch ' + displayUserId);
            actions.userFetch(displayUserId);
        }
    }, [displayUserId, user]);

    if (group) {
        return (
            <>
                <SearchBar setDisplayId={setDisplayGroupId} />
                <Card_Display group={group} set_display_id={setDisplayGroupId} actions={actions} />
                <UserDisplay user={user} setUserId={setDisplayUserId} />
            </>
        );
    } else {
        return <div>Loading... {gid}</div>;
    }
};