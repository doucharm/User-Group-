import { TwoStateButton } from "./Delete_Button";
import { Trash } from 'react-bootstrap-icons';

/**
* function to invalidate subgroup and all the membership,role that subgroup's having
* @param {*} item subgroup to be invalidated
* @param {*} group the group that has the subgroup
* @param {*} actions global actions
*/
const onClickDeleteGroup = async ({ item, group, actions }) => { //The condition for delete the subgroup
    try {
        const fetchedItem = await actions.groupFetch(item.id); // get the wanted subgroup data
        const fetchedpayload = fetchedItem.payload // because the data is wrapped in payload so that we need to get their payload
        const payload = {
            id: fetchedpayload.id,
            lastchange: fetchedpayload.lastchange,
            name: fetchedpayload.name,
            valid: false, // make the wanted subgroup invalid in the mastergroup
            mastergroupId: fetchedpayload.mastergroup.id,
            grouptypeId: fetchedpayload.grouptype.id
        };
        await actions.groupAsyncUpdate(payload);
        actions.onGroupDelete({ group, item });
        // Also remove all the membership and roles inside the wanted subgroup
        fetchedpayload.memberships.forEach((membership) => {
            const current_role = membership?.user.roles?.filter((item) => item.group?.id === membership.group?.id && item.valid === true)?.splice(-1)[0]
            actions.membershipAsyncUpdate({
                id: membership.id,
                lastchange: membership.lastchange,
                valid: false
            });
            actions.onMemberRemove({ group: { id: item.id, lastchange: item.lastchange }, membership: membership });
            if (current_role) {
                actions.roleAsyncUpdate({ role: { ...current_role, valid: false }, membership: { ...membership, valid: false } })
            }
        });
    } catch (error) {
        console.error("Error fetching item information:", error);
    }
};

export const DeleteGroupButton = ({ item, group, actions }) => {
    const Icon = Trash
    const button_Delete = <button className='btn btn-sm btn-danger' onClick={() => onClickDeleteGroup({ item, group, actions })}><Icon /> </button>
    return (
        <TwoStateButton sec_button={button_Delete} icon={Icon} />
    )
}

