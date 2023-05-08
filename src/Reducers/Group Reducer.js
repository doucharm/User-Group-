import { v1 } from 'uuid';


export const Create_Group = (state , action) =>
{
    const item=action.payload
    if (!item.id)
    {
        item.id=v1()
    }
    state[item.id]=item
    return state
}
export const Delete_Group = (state, action) =>
{
    delete state[action.payload.id]
    return state
}
export const Update_Group =(state,action) =>
{
    const newItem = action.payload;
    const oldItem = state[newItem.id]
    state[newItem.id] = {...oldItem, ...newItem}
    
    return state
}
export const Adding_Subgroup = (state, action) =>
{
    const new_subgroup=action.payload.new_subgroup
    const g=action.payload.group 
    const group=state[g.id]
    state[g.id]={...group,subgroups:{...group.subgroups,new_subgroup}}
    return state
}

export const GroupMemberUpdate = (state, action) => {
    const g = action.payload.group
    const u = action.payload.user
    const group = state[g.id]
    group.memberships = group.memberships.map(user => user.id === u.id ? {...user, ...u} : user)
    return state
}

export const GroupMemberRemove = (state, action) => {
    const g = action.payload.group
    const u = action.payload.user
    console.log(u)
    const group = state[g.id]
    group.memberships = group.memberships.filter(m => m.user.id !== u.id)
    return state
}
