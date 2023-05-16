import { EnvelopeOpen } from "react-bootstrap-icons"
import { TextInput } from "./Text_Input"
import { GroupMemberRemoveButton } from "./Delete_Button"
import { Adding_Member_Button } from "./Adding Member Button"
import {  Role_Select } from "./Role Dropdown"
import { useSelector } from "react-redux"
import { Adding_Subgroup_Button } from "./Adding Subgroup"
export const Table_Display =({group,set_display_id,actions}) =>
{

    const Get_Member_Row =({group,user,gid,actions}) =>
    {
        

        const onChangeEmail = (value) => {
            if (actions.onGroupMemberUpdate) {
                const payload = {group: {id: gid}, user: {...user, email: value}}
                actions.onGroupMemberUpdate(payload)
            }
        }
        
        
         const onChangeSurname = (value) => {
            if (actions.onGroupMemberUpdate) {
                const payload = {group: {id: gid}, user: {...user, surname: value}}
                actions.onGroupMemberUpdate(payload)
            }
        }
        
         const onChangeName = (value) => {
            if (actions.onGroupMemberUpdate) {
                console.log(user, value)
                const payload = {group: {id: gid}, user: {...user, name: value}}
                actions.onGroupMemberUpdate(payload)
            }
        }
        return (
            <tr>
            <td>{user.id}</td>
            <td>
                <TextInput placeholder={"name"} id={user.id} value={user.name} onChange={onChangeName}/>
            </td>
            <td>
                <TextInput placeholder={"surname"} id={user.id} value={user.surname} onChange={onChangeSurname}/>
            </td>
            <td>
                <TextInput placeholder={"email"} id={user.id} value={user.email} onChange={onChangeEmail}/>
            </td>
            <td><Role_Select user={user} group={group} actions={actions}/></td>
           <td> <GroupMemberRemoveButton user={user} group={group} actions={actions}/></td>
                
        </tr>
        )
    }

    const Get_Sub_Group_Row =({item}) =>
    {
        return (
            <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <button onClick={event => set_display_id(item.id)}>
                    <EnvelopeOpen></EnvelopeOpen> </button>
            </tr>
        )
    }
    return (
        <div>
                        List of members:
                        <br/>
        <table className="table table-hover table-bordered table-light table-stripped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>    </th>
                </tr>
            </thead>
            <tbody>
                <>
                {group?.memberships?.map(item => <Get_Member_Row group={group} user={item.user} gid ={group.id} actions={actions}/>)}
                <br/>
                <Adding_Member_Button group={group} actions={actions} />
                </>
            </tbody>
        </table>
        <br />
        <br />
         List of sub-groups:
        <br />
        <table className="table table-hover table-bordered table-blue table-stripped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
        <>
                {group?.subgroups?.map(item => <Get_Sub_Group_Row item={item}/>)}
                <Adding_Subgroup_Button group={group} actions = {actions}/>
                </>
            </tbody>
        </table>
        </div>
    )   
}
