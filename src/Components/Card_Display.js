import { ArrowBarLeft, ArrowLeftSquare } from "react-bootstrap-icons";
import { Table_Display } from "./Component_Display";
import { useCallback, useState, useMemo } from "react";
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

const Get_Card_Header = ({group}) => {

    return (
        <div>
            <tr>ID: {group.id} </tr>
            <tr>{group.name}</tr>
            <tr>{group.goal}</tr>
            <tr>Date of creation: {group.date_of_creation}</tr>
            <br />
        </div>
    )
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

