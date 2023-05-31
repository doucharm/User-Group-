export const Adding_Member = (state, action) => {
    console.log(action.payload)
    const group = action.payload.group
    const membership = action.payload.membership
    const grouptake = state[group.id]
    grouptake.memberships.push(membership)
    return state
}

export const Moving_Member = (state, action) => {
    const { user, fromg, tog } = action.payload
    const old_group = state[fromg.id]
    const new_group = state[fromg.id]
    old_group.memberships = old_group.memberships?.filter((m) => m.user.id !== user.id)
    new_group.memberships.push({})
    return state
}
export const Remove_Member = (state, action) => {
    console.log('reducer called', action.payload);
    const g = action.payload.group;
    const membership = action.payload.membership;
    const group = state[g.id];
    console.log("group membership", group);

   
    group.memberships = group.memberships.map((item) =>
        item.id === membership.id ? { ...item, valid: false } : item
    );


    group.memberships.forEach((item) => {
        if (item.id === membership.id) {
            item.user.roles = item.user.roles.map((role) =>
                role.group.id === group.id ? { ...role, valid: false } : role
            );
        }
    });

    return state;
};

export const Update_Member = (state, action) => {
    const g = action.payload.group
    const m = action.payload.membership
    const group = state[g.id]
    group.memberships = group.memberships.map(membership => membership.id === m.id ? { ...membership, ...m } : membership)
    console.log(group.memberships)
    return state
}
