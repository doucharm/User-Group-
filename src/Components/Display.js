import { Card_Display } from './Card_Display'
import { useEffect, useState } from 'react'
import { useSelector} from 'react-redux';
import { actions } from 'pages/Redux Store';


export const Display = ({id}) =>
{
    const [display_id,set_display_id]=useState(id)
    const data=useSelector(state => state.groups)
    console.log(data)
    const group = data[display_id]
    useEffect(
        () => {
            if(!data[display_id])
            {
            console.log('GroupPageProvider refetch ' + display_id)
            actions.roleFetch()
            actions.groupFetch(display_id)    
            } 
                  
        }, [display_id]
    )


    if (group) {
        return (
            <>
            <button onClick={event=>console.log(data)} >Get store </button>
            <Card_Display group={group} set_display_id={set_display_id} actions={actions}/>
            </>
        )
    } else {
        return (
            <div>Loading... {id}</div>
        )
    }
    
}
