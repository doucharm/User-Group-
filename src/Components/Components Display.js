import { EnvelopeOpen } from "react-bootstrap-icons"
import { MembershipInsert_SearchBar } from "./Adding Member Button"
import { Adding_Subgroup_Button } from "./Adding Subgroup"
import { DeleteButton } from "./Delete_Button"
import { Trash } from "react-bootstrap-icons"
import { Role_Select } from "./Role_Selector"
import { useState } from "react"
import { Replace_Button } from "./Replace_Button"


export const Table_Display = ({ group, set_display_id, actions }) => {
    actions.roleFetch();
    const Get_Member_Row = ({ group, membership, show_old_member, actions }) => {
        
        const onClick = async () => {
            const payload = {
                id: membership.id,
                lastchange: membership.lastchange,
                valid: false
            };

            console.log('REMOVE_MEMBER action dispatched with payload:', payload);

            try {
                await actions.membershipAsyncUpdate(payload);
                actions.onMemberRemove({ group, membership });
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
                    <td><Role_Select membership={membership} actions={actions} /></td>
                    <td><DeleteButton onClick={onClick}><Trash></Trash></DeleteButton></td>
                    <td><Replace_Button group={group} actions={actions}  >Replace</Replace_Button></td>
                </tr>
            )
        }


    }

    const Get_Sub_Group_Row = ({ item }) => {
        return (
            <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <button onClick={event => set_display_id(item.id)}>
                    <EnvelopeOpen></EnvelopeOpen> </button>
            </tr>
        )
    }
    const [show_old_member, set_show_member] = useState(false)
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

                        {group?.subgroups?.map(item => <Get_Sub_Group_Row item={item} />)}
                        <Adding_Subgroup_Button group={group} actions={actions} />
                    </>
                </tbody>
            </table>
        </div>
    )
}