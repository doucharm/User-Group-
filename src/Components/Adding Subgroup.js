import { useState, useCallback } from 'react';
import { PersonAdd, Save, X } from 'react-bootstrap-icons';

export const Adding_Subgroup_Button = ({ group, actions }) => {
    const [new_sub, set_new_sub] = useState({ // Create a variable that takes the props id and name from the input below, this return the
        id: "",                     // subgroup with the mastergroup id is the group we're in
        name: "",
        mastergroupId: group.id
    })
    const onClick = () => {
        actions.groupAsyncInsert(new_sub) //Insert the new subgroup in store
        .then(
            resp => resp.json()
        )
        .then(
            json => {
                const msg = json.data.groupInsert.msg
                if (msg === "fail") {
                    console.log("Update failed")
                } else {
                    const new_subgroup = json.data.groupInsert.group
                    actions.onAddSubGroup({group,new_subgroup}) //Insert the new subgroup in store
                }

                return json
            }
        ) 
        setState0() //Simutaneously set the state to the original that has only 1 button

    }
    // Create 2 states of the Adding subgroup button
    const [state, setState] = useState(0)
    const setState0 = useCallback(() => setState(0)) 
    const setState1 = useCallback(() => setState(1))

    return (
        <Adding_Subgroup new_sub={new_sub} state={state} setState0={setState0} setState1={setState1} set_new_sub={set_new_sub} onClick={onClick}><PersonAdd></PersonAdd></Adding_Subgroup> //Adding subgroup button with 2 states
    )
}

export const Adding_Subgroup = ({ new_sub, set_new_sub, onClick, setState0, setState1, state }) => {
    if (state === 0) {
        return (
            <button className='btn btn-sm btn-primary' onClick={setState1}><PersonAdd></PersonAdd></button> 
        )
    } else {
        function handleChange(evt) {
            const value = evt.target.value;
            set_new_sub( //Assign the new subgroup's name with the value we type in
                {
                    ...new_sub,
                    [evt.target.name]: value
                });
        }
        //Second state that allows us to insert the new sub with Save or undo it with X button
        return (
            <>
                <label>New subgroup Id:<input type="text" name="id" value={new_sub.id} placeholder='Enter new sub group id' onChange={handleChange} /> </label>
                <label>New subgroup name:<input type="text" name="name" value={new_sub.name} placeholder='Enter new sub group name' onChange={handleChange} /> </label>
                <button className='btn btn-sm btn-warning' onClick={setState0}><X></X></button> 
                <button className='btn btn-sm btn-success' onClick={onClick}><Save></Save></button> 
            </>
        )
    }
}