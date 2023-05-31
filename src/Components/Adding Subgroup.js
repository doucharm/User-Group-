import { useState, useCallback } from 'react';
import { PersonAdd, Save, X } from 'react-bootstrap-icons';


export const Adding_Subgroup = ({ new_sub, set_new_sub, onClick, setState0, setState1, state }) => {
    if (state === 0) {
        return (
            <button className='btn btn-sm btn-primary' onClick={setState1}><PersonAdd></PersonAdd></button>
        )
    } else {


        function handleChange(evt) {
            const value = evt.target.value;
            set_new_sub(
                {
                    ...new_sub,
                    [evt.target.name]: value
                });

        }

        return (
            <>
                <label>Subgroup ID:<input type="text" name="id" value={new_sub.id} placeholder='Enter subgroup ID' onChange={handleChange} /> </label>
                <label>New subgroup name:<input type="text" name="name" value={new_sub.name} placeholder='Enter new sub group name' onChange={handleChange} /> </label>

                <button className='btn btn-sm btn-warning' onClick={setState0}><X></X></button>
                <button className='btn btn-sm btn-success' onClick={onClick}><Save></Save></button>
            </>
        )
    }
}
export const Adding_Subgroup_Button = ({ group, actions }) => {
    const [new_sub, set_new_sub] = useState({
        id: "",
        name: "",
        mastergroupId: group.id
    })
    const onClick = () => {
        const payload =
        {
            group: group,
            new_subgroup: new_sub
        }
        console.log(new_sub)
        actions.onAddSubGroup(payload)
        actions.groupAsyncInsert(new_sub)
        setState0()

    }
    const [state, setState] = useState(0)
    const setState0 = useCallback(() => setState(0))
    const setState1 = useCallback(() => setState(1))

    return (
        <Adding_Subgroup new_sub={new_sub} state={state} setState0={setState0} setState1={setState1} set_new_sub={set_new_sub} onClick={onClick}><PersonAdd></PersonAdd></Adding_Subgroup>
    )
}