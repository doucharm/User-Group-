import { useState } from 'react';
import { XOctagonFill, Trash } from 'react-bootstrap-icons';
/**
 * This is Two States Button with confirmation (two state button).
 * @param {*} icon the icon that indicate what this button do
 * @param {*} sec_button second state of the button
 * @returns 
 */
export const TwoStateButton = ({ sec_button, icon: Icon }) => {
  const [state, setState] = useState(false);
  if (!state) {
    return (
      <button className='btn btn-sm btn-warning' onClick={(event) => setState(!state)}>
        <Icon />
      </button>
    );
  } else { // return one button for cancelation and another component that perform the intended action
    return (
      <>
        <button className='btn btn-sm btn-warning' onClick={(event) => setState(!state)}>
          <XOctagonFill></XOctagonFill>
        </button>
        {sec_button}
      </>
    );
  }
};
/**
* function to invalidate membership and the role that membership/user're having
* @param {*} membership membership to be invalidated
*/
const onClickDeleteMember = async ({ membership, actions }) => { // 
  const payload = {
    id: membership.id,
    lastchange: membership.lastchange,
    valid: false // make the user's membership invalid in the group
  };
  const current_role = membership?.user.roles?.filter((item) => item.group?.id === membership.group?.id && item.valid === true)?.splice(-1)[0]
  try {
    await actions.membershipAsyncUpdate(payload);
    actions.onMemberRemove({ group: { id: membership.group.id }, membership });
    // also remove user's role along with the membership
    if (current_role) {
      actions.roleAsyncUpdate(current_role)
    }
  } catch (error) {
    console.log('Membership update failed:', error);
  }
};
export const DeleteButton = ({ membership, actions }) => {
  const Icon = Trash
  const button_Delete = <button className='btn btn-sm btn-danger' onClick={() => onClickDeleteMember({ membership, actions })}><Icon /> </button>
  return (
    <TwoStateButton sec_button={button_Delete} icon={Icon} />
  )
}


const onClickDeleteGroup = async ({ item, group, actions }) => { //The condition for delete the subgroup
  try {
    const fetchedItem = await actions.groupFetch(item.id); // get the wanted subgroup data
    const fetchedpayload = fetchedItem.payload // because the data is wrapped in payload so that we need to get their payload
    const payload = {
      id: item.id,
      lastchange: item.lastchange,
      name: item.name,
      valid: false, // make the wanted subgroup invalid in the mastergroup
      mastergroupId: item.mastergroup.id,
      grouptypeId: item.grouptype.id
    };
    await actions.groupAsyncUpdate(payload);
    actions.onGroupDelete({ group, item });
    // Also remove all the membership and roles inside the wanted subgroup
    fetchedpayload.memberships.forEach((membership) => {
      const current_role = membership?.user.roles?.filter((item) => item.group?.id === membership.group?.id && item.valid === true)
      const old_role = current_role[current_role.length - 1]
      actions.membershipAsyncUpdate({
        id: membership.id,
        lastchange: membership.lastchange,
        valid: false
      });
      actions.onMemberRemove({ group: { id: item.id, lastchange: item.lastchange }, membership: membership });
      if (old_role) {
        actions.roleAsyncUpdate(old_role)
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



