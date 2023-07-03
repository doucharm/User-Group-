import { EnvelopeOpen } from "react-bootstrap-icons"
import { MembershipInsert_SearchBar } from "./Adding Member Button"
import { AddingSubgroupButton } from "./Adding_Subgroup"
import { DeleteButton } from "./Delete_Button"
import { DeleteGroupButton } from "./Delete_Subgroup_Button"
import { Role_Select } from "./Role_Selector"
import { useState } from "react"
import { Replace_Button } from "./Replace_Button"
import { Moving_Member_Button } from "./Moving_Member"
import { Moving_Subgroup_Button } from "./Moving_Subgroup"
/**
 * This function shows the table display which contains the users of the group
 * @param {*} group The group we are showing
 * @param {*} set_display_id This is a part of the useState to change the group we are showing
 * @param {*} actions Actions needed to update our group in store and on server
 * @returns A table that displays all of the members and subgroups that the group contains
 */
export const Table_Display = ({ group, set_display_id, actions }) => {
    const [show_old_member, set_show_member] = useState(false) //useState to declare whether we're showing the deleted members or not
    const [show_old_subgroup, set_show_subgroup] = useState(false) ////useState to declare whether we're showing the deleted subgroups or not
    // Returning all of the members and subgroups of the group we're accessing by mapping through its memberships and subgroups
    // We also add some functional buttons into this table which we'll figure out later
    return (
        <div>
            <h3>List of members: </h3>
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
                        <tr><td><button onClick={event => set_show_member(!show_old_member)}>Toggle</button></td></tr>
                        <MembershipInsert_SearchBar group={group} actions={actions} />
                    </>
                </tbody>
            </table>
            <br />
            <br />
            <h3>List of subgroups</h3>
            <br />
            <table className="table table-hover table-bordered table-warning table-stripped table-responsive">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Details</th>
                        <th>Delete</th>
                        <th>Move</th>
                    </tr>
                </thead>
                <tbody>
                    <>
                        {group?.subgroups?.map(item =>  <Get_Sub_Group_Row key={item.id} group={group} item={item} set_display_id={set_display_id} actions={actions} show_old_subgroup={show_old_subgroup} />)}
                        <tr><td><AddingSubgroupButton group={group} actions={actions} /></td></tr>
                        <tr><td><button onClick={() => set_show_subgroup(!show_old_subgroup)}>Show Old Subs</button></td></tr>
                    </>
                </tbody>
            </table>
        </div>
    )
}
/**
 * This return a row of each subgroups existed in the large group
 * @param {*} group The group we are showing
 * @param {*} item The subgroups of the group we get by mapping through the group.subgroups
 * @param {*} set_display_id This is a part of the useState to change the group we are showing
 * @param {*} actions Actions needed to update our group in store and on server
 * @param {*} show_old_subgroup Part of the use state to declare if we want to show the deleted subgroups
 * @returns A row that has the subgroup's details
 */
const Get_Sub_Group_Row = ({ group, item, set_display_id, actions, show_old_subgroup }) => {

    if (item.valid) {
        return (
            <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.grouptype?.nameEn}</td>
                <td><button onClick={() => set_display_id(item.id)}><EnvelopeOpen></EnvelopeOpen></button></td>
                <td><DeleteGroupButton item={item} group={group} actions={actions} /></td>
                <td><Moving_Subgroup_Button group={group} subgroup={item} actions={actions} /></td>
            </tr>
        )
    }
    else if (show_old_subgroup) {
        return (
            <tr className="table-warning">
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>Deleted</td>
            </tr>
        )
    }
}
/**
 * This return a row of each memberships existed in the large group
 * @param {*} group The group we are showing
 * @param {*} membership The memberships of the group we get by mapping through the group.memberships
 * @param {*} actions Actions needed to update our group in store and on server
 * @param {*} show_old_member Part of the use state to declare if we want to show the deleted memberships
 * @returns A row that has the membership's details
 */
const Get_Member_Row = ({ group, membership, show_old_member, actions }) => {


    if (membership.valid) {
        return (
            <tr className="table-success">
                <td>{membership.user.id}</td>
                <td>{membership.user.name}</td>
                <td>{membership.user.surname}</td>
                <td>{membership.user.email}</td>
                <td><Role_Select membership={membership} actions={actions} /></td>
                <td><DeleteButton membership={membership} actions={actions} /></td>
                <td><Replace_Button group={group} actions={actions} membership={membership}></Replace_Button></td>
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