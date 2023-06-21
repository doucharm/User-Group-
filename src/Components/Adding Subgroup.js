import { useState } from 'react';
import { DatabaseFillAdd } from 'react-bootstrap-icons';
import { TwoStateButton } from './Delete_Button';
export const Adding_Subgroup_Button = ({ group, actions }) => {
    const [new_sub, set_new_sub] = useState({ // Create a variable that takes the props id and name from the input below, this return the
        id: "",                     // subgroup with the mastergroup id is the group we're in
        name: "",
        mastergroupId: group.id
    })
    const handleChange = (evt) => { // load the new_sub variable with data entered by the user
        const { name, value } = evt.target;
        set_new_sub((prevSub) => ({ ...prevSub, [name]: value }));
    };
    //Second state that allows us to insert the new sub with Save
    const adding_sub = // input box for required information in order to create new group
        <>
            <label>New subgroup Id:<input type="text" name="id" value={new_sub.id} placeholder='Enter new sub group id' onChange={handleChange} /> </label>
            <label>New subgroup name:<input type="text" name="name" value={new_sub.name} placeholder='Enter new sub group name' onChange={handleChange} /> </label>
            <button className='btn btn-sm btn-success' onClick={() => onSubgroupAdd({ new_sub, group, actions })}><DatabaseFillAdd /></button>
        </>

    return (
        <TwoStateButton icon={DatabaseFillAdd} sec_button={adding_sub} />
    )
}

/**
 * Pushing the new group onto the server
 * @param {*} new_sub the group that is going to be created 
 * @returns promise
 */
const onSubgroupAdd = ({ new_sub, group, actions }) => {
    actions.groupAsyncInsert(new_sub) //Create a new group in the server
        .then(resp => resp.json())
        .then(
            json => {
                const msg = json.data.groupInsert.msg
                if (msg === "fail") {
                    console.log("Update failed")
                } else {
                    const new_subgroup = json.data.groupInsert.group
                    actions.onAddSubGroup({ group, new_subgroup }) //Insert the new subgroup in store
                }
                return json
            }
        )
}

