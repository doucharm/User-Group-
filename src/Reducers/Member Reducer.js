export const Adding_Member = (state, action) => {
    console.log(action.payload)
    const group = action.payload.group
    const membership = action.payload.membership
    const grouptake = state[group.id]
    grouptake.memberships.push(membership)
    return state
}

export const Moving_Member = (state,action) =>
{
    const {membership, from_group, to_group } = action.payload
    const old_group= state[from_group.id]
    const new_group= state[to_group.id]    
    old_group.memberships = old_group.memberships?.map((m)=> m.id===membership.id ? {...m,valid:false}: m)
    new_group.memberships.push(membership)
    return state
}
export const Remove_Member = (state, action) =>
{
    const g = action.payload.group
    const membership = action.payload.membership
    const group = state[g.id]
    group.memberships = group.memberships.map((item) => item.id===membership.id? {...item,valid:false}: item  )
    return state
}
export const Update_Member = (state,action) =>
{
    const g = action.payload.group
    const m = action.payload.membership
    const group = state[g.id]
    group.memberships = group.memberships.map(membership => membership.id === m.id ? { ...membership, ...m } : membership)
    console.log(group.memberships)
    return state
}
