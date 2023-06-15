import { v1, validate } from 'uuid';

// This function create a new group and we can call it with by id using state[item.id]
// The payload needed is the new group that has all of the structure for a normal group
export const Create_Group = (state, action) => {
    const item = action.payload
    if (!item.id) {
        item.id = v1()
    }
    state[item.id] = item
    return state
}

// This function is not deleting the subgroup directly but change the valid of that group to false
// The payload for this will be the large group that holds the subgroup and the subgroup itself
export const Delete_Group = (state, action) => {
    const g = action.payload.group;
    const subgroup = action.payload.item;
    const group = state[g.id];
    if (!subgroup) {
        return state;
    }
    group.subgroups = group.subgroups.map((item) =>
        item.id === subgroup.id ? { ...item, valid: false } : item
    );
    return state;
}

// This function update the group that needs modification by calling it with the modified group, then it will modify the oldItem with the newItem using spreading
export const Update_Group = (state, action) => {
    const newItem = action.payload;
    const oldItem = state[newItem.id]
    state[newItem.id] = { ...oldItem, ...newItem }

    return state
}

// This function require two params in payload which are the new_subgroup and the group we want to put it in
export const Adding_Subgroup = (state, action) => {
    let new_subgroup = action.payload.new_subgroup 
    const g = action.payload.group
    const group = state[g.id]
    if (group) {
        if (!group.subgroups) {
            group.subgroups = [];
        }
        group.subgroups.push(new_subgroup); //push the new_subgroup to the subgroups of the large group
    }

    return state;
};

// This function require a payload of a membership that already has the group that we want to push the membership to
export const GroupMemberAdd = (state, action) => {
    const membership = action.payload;
    const gtochange = state.find(g => g.id === membership.group.id)
    gtochange.memberships.push(membership)
    return state
}
export const Hierarchy_Update = (state,action) =>
{
    console.log(action)
    console.log(action.payload)
    const newItem = action.payload;
    state = { ...state, ...newItem }
    return state
}