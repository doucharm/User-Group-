import { Create_Group, Delete_Group, Update_Group, Adding_Subgroup, GroupMemberUpdate, GroupMemberRemove } from "./Group Reducer";
import { Adding_Member, Remove_Member, Update_Member, Moving_Member } from "./Member Reducer";
import { GroupAsyncInsert, GroupAsyncUpdate, GroupFetch, RoleFetch, UserAsyncUpdate, UserFetch, UserByLetterFetch } from "./GroupAsyncAction";
import { MembershipAsyncUpdate, MembershipAsyncInsert } from "./MembershipAsyncActions";
import { Update_Role } from "./Role Reducer";
import { createSlice } from '@reduxjs/toolkit'
import { Update_User } from "./User Reducer";
import { RoleAsyncInsert, RoleAsyncUpdate } from "./RoleAsyncActions";
export const GroupSlice = createSlice({
    name: 'groups',
    initialState: {},
    reducers: {
        group_add: Create_Group,
        group_delete: Delete_Group,
        group_update: Update_Group,
        group_add_sub: Adding_Subgroup,

        memberAdd: Adding_Member,
        memberRemove: Remove_Member,
        memberUpdate: Update_Member,
        memberMoving: Moving_Member
    }
})
export const GroupActions = GroupSlice.actions
export const GroupReducer = GroupSlice.reducer
export const bindGroupActions = (dispatch) => {
    return {
        onGroupUpdate: (g) => dispatch(GroupActions.group_update(g)),
        onGroupAdd: (g) => dispatch(GroupActions.group_add(g)),
        onGroupDelete: (g) => dispatch(GroupActions.group_delete(g)),
<<<<<<< HEAD
        onAddSubGroup: ({ group, new_subgroup }) => dispatch(GroupActions.group_add_sub({ group, new_subgroup })),

        onMemberAdd: ({ user, group }) => dispatch(GroupActions.memberAdd({ user, group })),
        onMemberRemove: ({ group, user }) => dispatch(GroupActions.memberRemove({ group, user })),
        onMemberUpdate: ({ group, user }) => dispatch(GroupActions.memberUpdate({ group, user })),
        onMemberMoving: ({ old_group, new_group, moving_member }) => dispatch(GroupActions.memberMoving({ old_group, new_group, moving_member })),
=======
        onAddSubGroup:({group,new_subgroup}) =>dispatch(GroupActions.group_add_sub({group,new_subgroup})),
        
        onMemberAdd: ({membership, group}) => dispatch(GroupActions.memberAdd({membership, group})),
        onMemberRemove: ({group,membership}) => dispatch(GroupActions.memberRemove({group,membership})),
        onMemberUpdate: ({group,user}) => dispatch(GroupActions.memberUpdate({group,user})),
        onMemberMoving: ({old_group,new_group,moving_member}) => dispatch(GroupActions.memberMoving({old_group,new_group,moving_member})),
>>>>>>> 207b418c91fdee5a94276cfcebc5102f75690f15

        groupFetch: (id) => dispatch(GroupFetch(id)),
        groupAsyncUpdate: (group) => dispatch(GroupAsyncUpdate(group)),
        groupAsyncInsert: (group) => dispatch(GroupAsyncInsert(group)),
        userAsyncUpdate: (user) => dispatch(UserAsyncUpdate(user)),
        roleFetch: () => dispatch(RoleFetch()),
        membershipAsyncInsert: ({ group_id, user_id }) => {
            dispatch(MembershipAsyncInsert({ group_id, user_id }))
        },
        membershipAsyncUpdate: ({ group, id, lastchange }) => {
            dispatch(MembershipAsyncUpdate({ group, id, lastchange }))
        },
<<<<<<< HEAD
=======
        membershipAsyncUpdate: ({id,lastchange}) => {dispatch(MembershipAsyncUpdate({id,lastchange}))},
        userFetch: (id) => dispatch(UserFetch(id)),
>>>>>>> 207b418c91fdee5a94276cfcebc5102f75690f15
        userFetch: (id) => dispatch(UserFetch(id)),
        userByLetterFetch: (letter) => dispatch(UserByLetterFetch(letter)),
        roleAsyncInsert: ({ group_id, user_id, roletype_id }) => {
            dispatch(RoleAsyncInsert({ group_id, user_id, roletype_id }))
        },
        roleAsyncUpdate: (role) => {
            dispatch(RoleAsyncUpdate(role))
        }
    }
}

export const RoleSlice = createSlice(
    {
        name: 'roles',
        initialState: {},
        reducers: {
            roles_update: Update_Role
        }

    }
)

export const RoleActions = RoleSlice.actions
export const RoleReducer = RoleSlice.reducer

export const UserSlice = createSlice(
    {
        name: 'users',
        initialState: {},
        reducers: {
            users_update: Update_User
        }

    }
)

export const UserActions = UserSlice.actions
export const UserReducer = UserSlice.reducer

export const UserByNameSlice = createSlice(
    {
        name: 'usersByName',
        initialState: {
            users: []
        },
        reducers: {
            users_update: (state, action) => {
                return {
                    ...state,
                    users: action.payload,
                }
            }
        }

    }
)

export const UserByNameActions = UserByNameSlice.actions
export const UserByNameReducer = UserByNameSlice.reducer