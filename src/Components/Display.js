import { Card_Display } from './Card_Display'
import { useEffect } from 'react'
import { useSelector} from 'react-redux';
import { actions } from 'pages/Redux Store';


export const Display = ({id}) =>
{
    const data=useSelector(state => state.groups)
    console.log(data)
    const selectedId = useSelector(state => state.groups.selectedId)
    console.log(selectedId)
    const group = data[id]
    console.log(group)
    const roles =useSelector(state => state.roles)  
    console.log(roles)
    useEffect(
        () => {
            console.log('GroupPageProvider refetch ' + id)
            actions.roleFetch()
            actions.groupFetch(id)           
        }, [id, selectedId]
    )


    if (group) {
        return (
            <Card_Display group={group} set_display_id={selectedId} actions={actions}/>
        )
    } else {
        return (
            <div>Loading... {id}</div>
        )
    }
    
}
