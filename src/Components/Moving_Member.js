import { useState } from "react"
import {  RewindCircleFill, RocketTakeoff, RocketTakeoffFill } from "react-bootstrap-icons"

import {v1} from 'uuid'
/*
 * Component for moving a member in a group to another group.
 * @param {*} membership membership contain both current group and user ID
 * @param {*} toggle_moving function that toggle the moving button
 * @param {*} actions global actions
 * @returns a suitable display component based on the id inputed
 */
export const Moving_Member = ({membership,actions,toggle_moving}) =>
{
    const [destination,set_destination] = useState("")
    const onInputChange  = (e) =>
    {
        set_destination(e.target.value) // set input destination
    }
    return (
        <>
        <input className = "form-control-warning "onChange={onInputChange} placeholder="Enter destination group's ID"/>
        <button onClick={toggle_moving}><RewindCircleFill></RewindCircleFill></button>
        <Moving_Confirm membership={membership} destination={destination} actions={actions} />
        </>
    )
}
export const Moving_Confirm = ({membership,destination,actions}) =>
{
    const onMove = () => // perform moving member by invaliding this membership and create a new valid membership in the intended destination
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
        <button onClick={onMove}><RocketTakeoff></RocketTakeoff></button>
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