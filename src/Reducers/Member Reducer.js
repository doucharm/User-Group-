
/**
 * Adding a membership to a group. Requires 2 params as the payload, which are group and membership
 * @param {*} state all of the groups in store
 * @param {*} action contains all of the payload's details needed to modify our state
 * @returns state
 */
export const Adding_Member = (state, action) => {
    console.log(action.payload)
    const group = action.payload.group
    const membership = action.payload.membership
    const grouptake = state[group.id]
    grouptake.memberships.push(membership) //Then we push that membership into the group's membership
    return state
}
/**
 * Removing a member from a group by changing the membership's valid to false
 * @param {*} state all of the groups in store
 * @param {*} action contains all of the payload's details needed to modify our state
 * @returns state
 */
export const Remove_Member = (state, action) => {
    console.log('reducer called', action.payload);
    const g = action.payload.group;
    const membership = action.payload.membership;
    const group = state[g.id];
   
    if (!membership) {
        return state;
    }

    group.memberships = group.memberships.map((item) =>
        item.id === membership.id ? { ...item, valid: false } : item
    );

    return state;
}


/**
 * Update the membership of a member by spreading the old one with the updated values of the new one in the group's memberships
 * @param {*} state all of the groups in store
 * @param {*} action contains all of the payload's details needed to modify our state
 * @returns state
 */
export const Update_Member = (state, action) => {
    console.log(action.payload)
    const g = action.payload.group
    const m = action.payload.membership
    const group = state[g.id]
    group.memberships = group.memberships.map(membership => membership.id === m.id ? { ...membership, ...m } : membership)
    console.log(group.memberships)
    return state
}


