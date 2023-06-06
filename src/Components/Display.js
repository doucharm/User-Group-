import { Card_Display } from './Card_Display';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { actions } from 'pages/Redux Store';
import { UserDisplay } from './User_Display';
import { Get_Hierarchy } from 'Data/Group_Hierarchy';

export const Display =  ({ display_id, set_display_id }) => {
    console.log('display called with id', display_id)
    let display = 0
    const groups = useSelector((state) => state.groups);
    const users = useSelector((state) => state.users);
    const group = groups[display_id];
    const user = users[display_id];
    useEffect(() => {
        if (!group) {
            actions.groupFetch(display_id).then(display = 0).catch(display = 1)
        }
    }, [display_id, group]);
    useEffect(() => {
        if (!user && display === 1) {
            actions.userFetch(display_id).finally(display = 0)
        }
    }, [display_id, user]);
    console.log('display', display)
    if (group) {
        return (
            <>
                <button onClick={event => console.log(group)} >Get store </button>
                <Card_Display group={group} set_display_id={set_display_id} actions={actions} />
            </>
        );

    }
    else if (user) {
        return (
            <>
                <button onClick={event => console.log(group)} >Get store </button>
                <UserDisplay user={user} setUserId={set_display_id} actions={actions} />

            </>
        )
    } else {
        return (
            <>
                <button onClick={event => console.log(group)} >Get store </button>
                <div>No matched ID found</div>

            </>
        )
    }
};