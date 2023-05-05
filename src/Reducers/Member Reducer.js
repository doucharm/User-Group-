export const Adding_Member = (state,action) =>
{
    const group=action.payload.group
    const user=action.payload.user
    group.memberships={...group.memberships,user}
    state[group.id]=group
    return state
}
export const Moving_Member = (state,action) =>
{
    const old_group=action.payload.old_group
    const new_group=action.payload.new_group
    const moving_member=action.payload.user
    const old_group1=old_group.memberships?.filter((user) => user.id!==moving_member.id )
    const new_group1 = { ...new_group, memberships: [...new_group.memberships, moving_member] }
    state[old_group.id]=old_group1
    state[new_group.id]=new_group1
    return state
}
export const Remove_Member = (state, action) =>
{
    const g = action.payload.group
    const u = action.payload.user
    const group = state[g.id]
    group.memberships = group.memberships.filter(m => m.user.id !== u.id)
    return state
}
export const Update_Member = (state,action) =>
{
    const g = action.payload.group
    const u = action.payload.user
    const group = state[g.id]
    group.memberships = group.memberships.map(user => user.id === u.id ? {...user, ...u} : user)
    return state
}
