import { Table_Display } from "./Component_Display";
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
 return(
    <div>
    <tr>ID: {group.id} </tr>
    <tr>Group's name: {group.name}</tr>
    <tr>Group's goal: {group.goal}</tr>
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