import { Card_Display } from './Card_Display';
import { useEffect , useState} from 'react';
import { useSelector } from 'react-redux';
import {  dispatch } from 'pages/Redux Store';
import { UserDisplay } from './User_Display';
import { Get_Hierarchy } from 'Data/Group_Hierarchy';
import { HierarchyActions } from 'Reducers/Reducer Slice';
/**
 * This is the main function that decide which component will be shown based on the display_id.
 * @param {*} display_id variable id of entity which we want to display
 * @param {*} set_display_id react Hook of the display_id variable
 * @param {*} actions global actions
 * @returns a suitable display component based on the id inputed
 */
export const Display =  ({ display_id, set_display_id,actions }) => {
    let display = 0 // Local variables to avoid unnecessary fetch
    const groups = useSelector((state) => state.groups);
    const users = useSelector((state) => state.users);
    
    const group = groups[display_id];
    const user = users[display_id];
    const hierarchy=useSelector(state => state.hierarchy)
    const [chart, set_chart] = useState(false)
    // fetching necessary data from the store or if not available get it from server
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
        Get_Hierarchy(display_id).then(res => dispatch(HierarchyActions.hierarchy_update(res)))
        set_chart(true)
       }
    }, [display_id,hierarchy]);

    if (group && set_chart) { // display the group and hierarchy chart
        return (
            <>
                <button onClick={event => console.log(group)} >Get store </button>
                <Card_Display group={group} set_display_id={set_display_id} actions={actions} />
            </>
        );

    }
    else if (user) { //display the user 
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