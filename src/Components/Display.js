import { Card_Display } from './Card_Display';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { actions } from 'pages/Redux Store';
import { SearchBar } from './Search_Bar';
import { UserDisplay } from './User_Display';

export const Display = ({id}) => {
    const [display,set_display]=useState(0)
    const [display_id,set_display_id]=useState(id)
    const groups = useSelector((state) => state.groups);
    const users = useSelector((state) => state.users);
    const group = groups[display_id];
    const user = users[display_id];
    useEffect(() => {
        if (!group) 
        {
            actions.roleFetch();
            actions.groupFetch(display_id)
        }
    }, [display_id, group]);
    useEffect(() => {
        if (!user) 
        {
            actions.userFetch(display_id)            
        }
    }, [display_id, user]);
    console.log('display',display)
    if (group) 
    {
        return (
            <>

                <button onClick={event=>console.log(group)} >Get store </button>
                <SearchBar setDisplayId={set_display_id} />
                <Card_Display group={group} set_display_id={set_display_id} actions={actions} />
                
            </>
        );

    } 
    else if(user)
    {
        return(
        <>

                <button onClick={event=>console.log(group)} >Get store </button>
                <SearchBar setDisplayId={set_display_id} />
                <UserDisplay user={user} setUserId={set_display_id} />
                
         </>
        )
    } else 
    {
        return (
        <>

                <button onClick={event=>console.log(group)} >Get store </button>
                <SearchBar setDisplayId={set_display_id} />
                <div>No matched ID found</div>
                
         </>
        )
    }
};