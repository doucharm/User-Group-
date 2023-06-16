// Adding a membership to a group
// Requires 2 params as the payload, which are group and membership
export const Adding_Member = (state, action) => {
    console.log(action.payload)
    const group = action.payload.group
    const membership = action.payload.membership
    const grouptake = state[group.id]
    grouptake.memberships.push(membership) //Then we push that membership into the group's membership
    return state
}

// Moving a member from the old group to a new one
// Change the valid of that membership in the old group to false and then push that membership to the new group's memberships
export const Moving_Member = (state,action) =>
{
    const {membership, from_group, to_group } = action.payload
    const old_group= state[from_group.id]
    const new_group= state[to_group.id]    
    old_group.memberships = old_group.memberships?.map((m)=> m.id===membership.id ? {...m,valid:false}: m)
    new_group.memberships.push(membership)
    return state
}

// Removing a member from a group by changing the membership's valid to false
export const Remove_Member = (state, action) => {
    console.log('reducer called', action.payload);
    const g = action.payload.group;
    const membership = action.payload.membership;
    const group = state[g.id];
    console.log("group membership", group.memberships);
    console.log('group', state[g.id])

    if (!membership) {
        return state;
    }

    group.memberships = group.memberships.map((item) =>
        item.id === membership.id ? { ...item, valid: false } : item
    );

    return state;
}

// Update the membership of a member by spreading the old one with the updated values of the new one in the group's memberships
export const Update_Member = (state, action) => {
    console.log(action.payload)
    const g = action.payload.group
    const m = action.payload.membership
    const group = state[g.id]
    group.memberships = group.memberships.map(membership => membership.id === m.id ? { ...membership, ...m } : membership)
    console.log(group.memberships)
    return state
}


