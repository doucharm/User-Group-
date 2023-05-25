import { EnvelopeOpen } from "react-bootstrap-icons"
import { TextInput } from "./Text_Input"
import { GroupMemberRemoveButton } from "./Delete_Button"
import { Adding_Member_Button } from "./Adding Member Button"

import { Adding_Subgroup_Button } from "./Adding Subgroup"
import { DeleteButton } from "./Delete_Button"
import { Trash } from "react-bootstrap-icons"
import { Role_Select } from "./Role_Selector"
import { UNSAFE_DataRouterStateContext } from "react-router-dom"
import { useState } from "react"
export const Table_Display =({group,set_display_id,actions}) =>
{
    const Get_Member_Row =({group,membership,show_old_member,actions}) =>
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
                <tr className="table-success">
                <td>{membership.user.id}</td>
                <td>{membership.user.name}</td>
                <td>{membership.user.surname}</td>
                <td>{membership.user.email}</td>
                <td><Role_Select membership={membership} actions={actions}/></td>
                <td><DeleteButton onClick={onclick}><Trash></Trash></DeleteButton></td>
            </tr>
            )
        } 
        else if (show_old_member)
        {
            return (
                <tr className="table-warning">
                <td>{membership.user.id}</td>
                <td>{membership.user.name}</td>
                <td>{membership.user.surname}</td>
                <td>{membership.user.email}</td>
                <td><Role_Select membership={membership} actions={actions}/></td>
                <td><DeleteButton onClick={onclick}><Trash></Trash></DeleteButton></td>
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
    const [show_old_member,set_show_member]=useState(false)
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
                
                {group?.memberships?.map(item => <Get_Member_Row group={group} membership={item} show_old_member={show_old_member} actions={actions}/>)}
                <br/>
                <button onClick={event => set_show_member(!show_old_member)}>Toggle</button>
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
