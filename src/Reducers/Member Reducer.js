export const Adding_Member = (state,action) =>
{
    console.log(action.payload)
    const group = action.payload.group
    const membership = action.payload.membership
    const grouptake = state[group.id]
    grouptake.memberships.push(membership)
    return state
}

export const Moving_Member = (state,action) =>
{
    const {user, fromg, tog } = action.payload

    const old_group= state[fromg.id] //action.payload.old_group
    const new_group=    state[fromg.id] //action.payload.old_group

    //const moving_member=action.payload.user
    
    old_group.memberships = old_group.memberships?.filter((m) => m.user.id!==user.id )
    new_group.memberships.push({})// = { ...new_group, memberships: [...new_group.memberships, moving_member] }
    // state[old_group.id]=old_group1
    // state[new_group.id]=new_group1
    return state
}
export const Remove_Member = (state, action) =>
{
    console.log('reducer called',action.payload)
    const g = action.payload.group
    const membership = action.payload.membership
    const group = state[g.id]
    console.log("group membership", group)
    group.memberships = group.memberships.map((item) => item.id===membership.id? {...item,valid:false}: item  )
    return state
}
export const Update_Member = (state,action) =>
{
    const g = action.payload.group
    const u = action.payload.user
    console.log('inside the reducer update member')
    console.log(g)
    console.log(u)
    const group = state[g.id]
    group.memberships = group.memberships.map(user => user.id === u.id ? {...user, ...u} : user)
    return state
}
