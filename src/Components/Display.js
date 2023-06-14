import { Card_Display } from './Card_Display';
import { useEffect , useState} from 'react';
import { useSelector } from 'react-redux';
import { actions, dispatch } from 'pages/Redux Store';
import { UserDisplay } from './User_Display';
import { Get_Hierarchy } from 'Data/Group_Hierarchy';
import { HierarchyActions } from 'Reducers/Reducer Slice';

export const Display =  ({ display_id, set_display_id }) => {
    console.log('display called with id', display_id)
    let display = 0
    const groups = useSelector((state) => state.groups);
    const users = useSelector((state) => state.users);
    const group = groups[display_id];
    const user = users[display_id];
    const hierarchy=useSelector(state => state.hierarchy)
    const [chart, set_chart] = useState(false)

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
    useEffect(() => {
       if(!chart)
       {
        Get_Hierarchy().then(res => dispatch(HierarchyActions.hierarchy_update(res)))
        set_chart(true)
       }
        
    }, [hierarchy]);

    if (group && set_chart) {
        return (
            <>
                <button onClick={event => console.log(hierarchy)} >Get store </button>
                <Card_Display group={group} set_display_id={set_display_id} actions={actions} />
            </>
        );

    }
    else if (user && set_chart) {
        return (
            <>
                <button onClick={event => console.log(user)} >Get store </button>
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