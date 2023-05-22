import { EnvelopeOpen } from "react-bootstrap-icons"
import { TextInput } from "./Text_Input"
import { GroupMemberRemoveButton } from "./Delete_Button"
import { Adding_Member_Button } from "./Adding Member Button"

import { Adding_Subgroup_Button } from "./Adding Subgroup"
import { DeleteButton } from "./Delete_Button"
import { Trash } from "react-bootstrap-icons"
import { Role_Select } from "./Role Dropdown"
export const Table_Display =({group,set_display_id,actions}) =>
{
    const Get_Member_Row =({group,membership,actions}) =>
    {
        const onclick= () => {
            const payload = 
            {
                id:membership.id,
                lastchange: membership.lastchange
            }
            actions.membershipAsyncUpdate(payload)
            actions.onMemberRemove({group,membership})
            
        }
        if( membership.valid )
        {
            return (
                <tr>
                <td>{membership.user.id}</td>
                <td>{membership.user.name}</td>
                <td>{membership.user.surname}</td>
                <td>{membership.user.email}</td>
                <Role_Select user={membership.user} group={group} actions={actions}/>
                <DeleteButton onClick={onclick}><Trash></Trash></DeleteButton>
            </tr>
            )
        }
       
        
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
                {group?.memberships?.map(item => <Get_Member_Row group={group} membership={item} actions={actions}/>)}
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
