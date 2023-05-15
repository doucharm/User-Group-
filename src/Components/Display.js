import { Card_Display } from './Card_Display';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { actions } from 'pages/Redux Store';
import { SearchBar } from './Search_Bar';
import { UserDisplay } from './User_Display';

export const Display = ({gid,uid}) => {
    const [displayGroupId, setDisplayGroupId] = useState(gid);
    const [displayUserId, setDisplayUserId] = useState(uid);
    const groups = useSelector((state) => state.groups);
    const users = useSelector((state) => state.users);
    const group = groups[displayGroupId];
    const user = users[displayUserId];
    let displaying_group=true;
    useEffect(() => {
        if (!group) 
        {
            actions.roleFetch();
            actions.groupFetch(displayGroupId) 
            if (!group)
            {
                displaying_group=false;
                actions.userFetch(displayUserId);
            }
        }
    }, [displayGroupId, group]);
    useEffect(() => {
        if (!user) 
        {
            actions.userFetch(displayUserId);
        }
    }, [displayUserId, user]);

    
    if (group && displaying_group) {
        return (
            <>

                <button onClick={event=>console.log(group)} >Get store </button>
                <SearchBar setDisplayId={setDisplayGroupId} />
                <Card_Display group={group} set_display_id={setDisplayGroupId} actions={actions} />
                
            </>
        );

    } else if(user)
    {
        return(
        <>

                <button onClick={event=>console.log(group)} >Get store </button>
                <SearchBar setDisplayId={setDisplayGroupId} />
                <UserDisplay user={user} setUserId={setDisplayUserId} />
                
         </>
        )
    } else 
    {
        return (
        <>

                <button onClick={event=>console.log(group)} >Get store </button>
                <SearchBar setDisplayId={setDisplayGroupId} />
                <div>No matched ID found</div>
                
         </>
        )
    }
};