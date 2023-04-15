import { Table_Display } from "./Component_Display";
import { useCallback, useState, useMemo } from "react";
import { CreateDelayer } from "utils/Delayer";
export const Get_Card_Display = ({data}) =>
{   
    const id='6be7a6c5-cc92-4f2e-98bb-bb5f7b08c753'
    const selected_group=Get_Group_Data(data,id)
    console.log('selected group info')
    console.log(selected_group)
    const selected_group_components=Get_Group_Components(data,selected_group)
    console.log("components of group")
    console.log(selected_group_components)
    
    return (
        <div class="card  border-success  bg-info mb-3" >
        <div class="card-header">
        <Get_Card_Header group={selected_group}/>
        </div>
        <div class="card-body">
                Components of the group:
                <Table_Display component={selected_group_components}/>
        </div>
        </div>
       
    )
}
const Get_Card_Header = ({group}) =>
{
    const Group_Name_Click = ({group}) =>
            {
                const [temp_name_1,set_group_1] =useState(group.name)
                const [temp_name_2,set_goal_1] =useState(group.goal)
                const [group_name_change,set_name_change]= useState(true)
                const change_event=useCallback(()=>set_name_change(!group_name_change))
                if (group_name_change)
                {
                    return (
                        
                       
                        <div><p>Group name:{temp_name_1}</p> <p> Group goal:{temp_name_2} </p>  <button id='change' className='btn btn-sm btn-primary' onClick={change_event}>Modify</button></div>
                        
                        
                    )
                } else
                {
                
                    return (
                        <div>
                        Group name: <Group_Name_Input value={temp_name_1} placeholder="group name" onChange={set_group_1}/> 
                        Group goal: <Group_Name_Input value={temp_name_2} placeholder="group goal" onChange={set_goal_1}/>
                        <button id='change' className='btn btn-sm btn-success' onClick={change_event}>Submit</button>
                        </div>
                    )
                }
            }


            const Group_Name_Input  =( {value, placeholder ,onChange }) =>
            {
                const [new_value,set_value] = useState(value)

                

                const reName_Event = useCallback ( 
                    (e) => {
                    const newVal=e.target.value
                    set_value(newVal)
                    onChange(newVal)
                }
                )
                
                return (
                    <input className = 'form-control' value = {new_value} placeholder={placeholder} onChange={reName_Event} />
                )
            }

    
    return (
        <div>
            <tr>ID: {group.id} </tr>
            <tr><Group_Name_Click group={group}/></tr>
            <tr>Date of creation: {group.date_of_creation}</tr> 
            <br/> 
        </div>
    )
}
const Get_Group_Data= (data,id)=>
    {
        const selected_group=data.groups.filter(item => item.id==id)
        return (
            selected_group[0]
          )
    }
const Get_Group_Components =(data,selected_group) =>
{
    const sub_groups=data.groups.filter(item => selected_group.properties.includes(item.id))
    const members=data.members.filter(item =>selected_group.properties.includes(item.id))
    const result=
    {
        sub_groups:sub_groups,
        members:members
    }
    return (result)
}