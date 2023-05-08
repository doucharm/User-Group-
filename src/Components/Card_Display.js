import { EnvelopeOpen } from "react-bootstrap-icons"
import { HeaderTextInput } from "./Header_Text_Input"
import { TextInput } from "./Text_Input"
import { actions } from "pages/Redux Store"
import { GroupMemberRemoveButton } from "./Delete_Button"

export const Card_Display = ({group,set_display_id,actions}) =>
{
    console.log(group)
    return (
        <main>
            <div class="card  border-success  bg-info mb-3" >
                <div class="card-header">
                    <Get_Card_Header group={group} actions={actions} />
                </div>
                <div class="card-body">
                    Components of the group:
                    <Table_Display group={group} set_display_id={set_display_id} actions={actions} />
                </div>
            </div>
        </main>
    )
}

export const Get_Card_Header = ({group,actions}) => {
    return (
        <tr>
            ID: {group.id} <br />
            <HeaderTextInput group={group} actions={actions}/>
            Last change:{group.lastchange} <br />
            Group type: {group.grouptype.name} <br />
        </tr>
    )
}

const Table_Display =({group,set_display_id,actions}) =>
{
    const Get_Member_Row =({user,gid,actions}) =>
    {

        const onChangeEmail = (value) => {
            if (actions.onGroupMemberUpdate) {
                const payload = {group: {id: gid}, user: {...user, email: value}}
                actions.onGroupMemberUpdate(payload)
            }
        }
    
        
        const onChangeSurname = (value) => {
            //console.log("onChangeEmail")
            //console.log(user, value)
            if (actions.onGroupMemberUpdate) {
                const payload = {group: {id: gid}, user: {...user, surname: value}}
                actions.onGroupMemberUpdate(payload)
            }
        }
    
        const onChangeName = (value) => {
            //console.log("onChangeEmail")
            
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
        <table className="table table-hover table-bordered table-dark table-stripped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
        
                {group?.memberships?.map(item => <Get_Member_Row user={item.user} gid ={group.id} actions={actions}/>)}
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

                {group?.subgroups?.map(item => <Get_Sub_Group_Row item={item}/>)}
            </tbody>
        </table>
        </div>
    )
    
}