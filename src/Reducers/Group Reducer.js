import { v1 } from 'uuid';
export const Create_Group = (state, action) =>
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
