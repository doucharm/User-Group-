import { useState } from "react"
import {  RewindCircleFill, RocketTakeoff, RocketTakeoffFill } from "react-bootstrap-icons"

import {v1} from 'uuid'

export const Moving_Member = ({membership,actions,toggle_moving}) =>
{
    const [destination,set_destination] = useState("")
    const onInputChange  = (e) =>
    {
        set_destination(e.target.value)
    }
    const onMove = () =>
    {
        const payload_leave = 
        {
            id:membership.id,
            lastchange:membership.lastchange,
            valid:false
        }
        const payload_arrive = 
        {
            group_id:destination,
            user_id:membership.user.id,
            id:v1(),
            store_update:
            {
                group:
                {
                    id:destination
                },
                membership:null
            }
        }

        actions.membershipAsyncInsert(payload_arrive)
        actions.membershipAsyncUpdate(payload_leave)
        actions.onMemberRemove({group:{id:membership.group.id},membership:membership})
    }
    return (
        <>
        <input onChange={onInputChange} placeholder="Enter destination group's ID"/>
        <button onClick={toggle_moving}><RewindCircleFill></RewindCircleFill></button>
        <button onClick={onMove}><RocketTakeoff></RocketTakeoff></button>
        </>
    )
}
export const Moving_Member_Button =  ({membership, actions}) =>
{
    const [moving,set_moving] = useState(false)

    if(!moving)
    {
        return (
            <button onClick={event => set_moving(true)}><RocketTakeoffFill></RocketTakeoffFill></button>
        )
    } else 
    {
        return (
           <Moving_Member membership={membership} actions={actions} toggle_moving={event => set_moving(false)} />
        )
    }
}