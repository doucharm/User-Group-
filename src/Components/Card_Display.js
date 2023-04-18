import { ArrowBarLeft, ArrowLeftSquare } from "react-bootstrap-icons";
import { Table_Display } from "./Component_Display";
import { useCallback, useState, useMemo } from "react";
import { CreateDelayer } from "utils/Delayer";
import {data} from 'Data/data'
import { Group_Name_Input } from "./Text_Input";
export const Get_Card_Display = ({id,data}) => {
    const [display_id,set_display_id] = useState(id)
    const selected_group = Get_Group_Data(data, display_id)
    const selected_group_components = Get_Group_Components(data, selected_group)
    
    return (
        <main>
            <div class="card  border-success  bg-info mb-3" >
                <div class="card-header">
                    <Open_Parent id={selected_group.owner_id} set_display_id={set_display_id} />
                    <Get_Card_Header group={selected_group} />
                </div>
                <div class="card-body">
                    Components of the group:
                    <Table_Display component={selected_group_components} set_display_id={set_display_id} />
                </div>
            </div>
        </main>
    )
}

const Get_Card_Header = ({ group }) => {
    const [temp_name_1, set_group_1] = useState(group.name)
    const [temp_name_2, set_goal_1] = useState(group.goal)
    const [group_name_change, set_name_change] = useState(true)
    const change_event = () => {
        set_name_change((group_name_change) => (!group_name_change))
        const button = document.getElementById("change")
        if (button.innerHTML === "Modify")
        {
            button.className = "btn btn-sm btn-success"
            button.innerHTML = "Save";
        } else {
            button.className = "btn btn-sm btn-primary"
            button.innerHTML = "Modify";
        }

    }
    if (group_name_change) {
        return (
            <div>
                <tr>ID: {group.id} </tr>
                <tr>Group name: {temp_name_1}</tr>
                <tr>Group goal: {temp_name_2}</tr>
                <tr><button id='change' className='btn btn-sm btn-primary' onClick={change_event}>Modify</button></tr>
                <tr>Date of creation: {group.date_of_creation}</tr>
                <br />
            </div>
        )
    } else {
        return (
            <div>
                <tr>ID: {group.id} </tr>
                <tr>Group name: <Group_Name_Input value={temp_name_1} placeholder="group name" onChange={set_group_1} /></tr>
                <tr>Group goal: <Group_Name_Input value={temp_name_2} placeholder="group goal" onChange={set_goal_1} /></tr>
                <tr><button id='change' className='btn btn-sm btn-primary' onClick={change_event}>Modify</button></tr>
                <tr>Date of creation: {group.date_of_creation}</tr>
                <br />
            </div>
         )
    }
}

const Get_Group_Data = (data, id) => {
    const selected_group = data.groups.filter(item => item.id == id)
    return (
        selected_group[0]
    )
}
const Get_Group_Components = (data, selected_group) => {
    const sub_groups = data.groups.filter(item => selected_group.properties.includes(item.id))
    const members = data.members.filter(item => selected_group.properties.includes(item.id))
    const result =
    {
        sub_groups: sub_groups,
        members: members
    }
    return (result)
}

const Open_Parent = ({id,set_display_id}) =>
{
   if(id!==null)
   {
    function on_Open_Parent () 
    {
        set_display_id(id)
    }
    return (
        
        <div>
          <button onClick={event => set_display_id(id)}>
            <ArrowLeftSquare></ArrowLeftSquare>
          </button>
        </div>
      );
   }
}