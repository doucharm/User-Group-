import { Component, useState } from 'react';
import { XOctagonFill, Trash } from 'react-bootstrap-icons';
/**
 * This is Two States Button with confirmation (two state button).
 * @param {*} icon the icon that indicate what this button do
 * @param {Component} sec_button second state of the button
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
        <button className='btn btn-sm btn-warning' onClick={(event) => setState(!state)}><XOctagonFill></XOctagonFill></button> 
        {sec_button}
      </>
    );
  }
};
/**
* function to invalidate membership and the role that membership/user're having
* @param {Object} membership membership to be invalidated
* @param {Object} actions using actions.membershipAsyncUpdate to update this membership
*/
const onClickDeleteMember = ({ membership, actions }) => { // 
  const payload = {
    id: membership.id,
    lastchange: membership.lastchange,
    valid: false // make the user's membership invalid in the group
  };
  const current_role = membership?.user.roles?.filter((item) => item.group?.id === membership.group?.id && item.valid === true)?.splice(-1)[0]
  try {
    actions.membershipAsyncUpdate(payload);
    actions.onMemberRemove({ group: { id: membership.group.id }, membership });
    // also remove user's role along with the membership
    if (current_role) {
      actions.roleAsyncUpdate({ role: { ...current_role, valid: false }, membership: { ...membership, valid: false } })
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




