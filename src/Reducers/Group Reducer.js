import { v1, validate } from 'uuid';


export const Create_Group = (state, action) => {
    const item = action.payload
    if (!item.id) {
        item.id = v1()
    }
    state[item.id] = item
    return state
}
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
export const Update_Group = (state, action) => {
    const newItem = action.payload;
    const oldItem = state[newItem.id]
    state[newItem.id] = { ...oldItem, ...newItem }

    return state
}
export const Adding_Subgroup = (state, action) => {
    console.log('pay load of sub')
    console.log(action.payload)
    let new_subgroup = action.payload.new_subgroup
    if (!validate(new_subgroup.id)) {
        new_subgroup.id = v1()
    }
    const g = action.payload.group
    const group = state[g.id]
    if (group) {
        if (!group.subgroups) {
            group.subgroups = [];
        }
        group.subgroups.push(new_subgroup);
    }

    return state;
};

export const GroupMemberAdd = (state, action) => {
    const membership = action.payload;

    const gtochange = state.find(g => g.id === membership.group.id)
    gtochange.memberships.push(membership)
    return state
}