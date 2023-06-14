import { EnvelopeOpen } from "react-bootstrap-icons"
import { MembershipInsert_SearchBar } from "./Adding Member Button"
import { Adding_Subgroup_Button } from "./Adding Subgroup"
import { DeleteButton } from "./Delete_Button"
import { Trash } from "react-bootstrap-icons"
import { Role_Select } from "./Role_Selector"
import { useState } from "react"
import { Replace_Button } from "./Replace_Button"
import { Moving_Member_Button } from "./Moving_Member"

// This function shows the table display which contains the users of the group
export const Table_Display = ({ group, set_display_id, actions }) => {
    const [show_old_member, set_show_member] = useState(false)
    const [show_old_subgroup, set_show_subgroup] = useState(false)
    return (
        <div>
            List of members:
            <br />
            <table className="table table-hover table-bordered table-light table-stripped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Delete</th>
                        <th>Replace</th>
                        <th>Move</th>
                    </tr>
                </thead>
                <tbody>
                    <>
                        {group?.memberships?.map(item => <Get_Member_Row key={item.id} group={group} membership={item} show_old_member={show_old_member} actions={actions} />)}
                        <br />
                        <button onClick={event => set_show_member(!show_old_member)}>Toggle</button>
                        <MembershipInsert_SearchBar group={group} actions={actions} />
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
                        {group?.subgroups?.map(item => <Get_Sub_Group_Row group={group} item={item} set_display_id={set_display_id} actions={actions} show_old_subgroup={show_old_subgroup}/>)}
                        <Adding_Subgroup_Button group={group} actions={actions} />
                        <br/>
                        <button onClick={() => set_show_subgroup(!show_old_subgroup)}>Show Old Subs</button>
                    </>
                </tbody>
            </table>
        </div>
    )
}

const Get_Sub_Group_Row = ({ group,item, set_display_id,actions,show_old_subgroup }) => {
    const onclick = async() => {
        const payload = {
            id: item.id,
            lastchange: item.lastchange,
            name: item.name,
            valid: false
        }
        await actions.groupAsyncUpdate(payload)
        actions.onGroupDelete({group,item})
    }
    if (item.valid)
    {
        return (
            <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <button onClick={() => set_display_id(item.id)}>
                    <EnvelopeOpen></EnvelopeOpen> </button>
                <DeleteButton onClick = {onclick}></DeleteButton>
                </tr>
        )
    }
    else if(show_old_subgroup)
    {
        return (
            <tr className="table-warning">
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>Deleted</td>
            </tr>
        )
    }
}

const Get_Member_Row = ({ group, membership, show_old_member, actions }) => {
    actions.roleFetch();
    const onClick = async () => {
        const payload = {
            id: membership.id,
            lastchange: membership.lastchange,
            valid: false
        };
        const current_role = membership?.user.roles?.filter((item) => item.group?.id === membership.group?.id && item.valid === true)
        const old_role = current_role[current_role.length - 1]
        console.log('REMOVE_MEMBER action dispatched with payload:', payload);

        try {
            await actions.membershipAsyncUpdate(payload);
            actions.onMemberRemove({ group, membership });
            if (old_role) {
                actions.roleAsyncUpdate(old_role)
            }

        } catch (error) {
            console.log('Membership update failed:', error);
        }
    };

    if (membership.valid) {
        return (
            <tr className="table-success">
                <td>{membership.user.id}</td>
                <td>{membership.user.name}</td>
                <td>{membership.user.surname}</td>
                <td>{membership.user.email}</td>
                <td><Role_Select membership={membership} actions={actions} /></td>
                <td><DeleteButton onClick={onClick}><Trash></Trash></DeleteButton></td>
                <td><Replace_Button group={group} actions={actions} membership={membership}  >Replace</Replace_Button></td>
                <td><Moving_Member_Button membership={membership} actions={actions} /></td>
            </tr>
        )
    }
    else if (show_old_member) {
        return (
            <tr className="table-warning">
                <td>{membership.user.id}</td>
                <td>{membership.user.name}</td>
                <td>{membership.user.surname}</td>
                <td>{membership.user.email}</td>
            </tr>
        )
    }
}