import { Create_Group, Delete_Group, Update_Group, Adding_Subgroup } from "./Group Reducer";
import { Adding_Member, Remove_Member, Update_Member, Moving_Member } from "./Member Reducer";
import { Update_Role } from "./Role Reducer";
import { Update_User } from "./User Reducer";
import { GroupAsyncInsert, GroupAsyncUpdate, GroupFetch } from "./GroupAsyncAction";
import { MembershipAsyncUpdate, MembershipAsyncInsert } from "./MembershipAsyncActions";
import { RoleAsyncInsert, RoleAsyncUpdate, RoleFetch } from "./RoleAsyncActions";
import { UserAsyncInsert, UserAsyncUpdate, UserFetch } from "./UserAsyncActions";
import { createSlice } from '@reduxjs/toolkit'

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

export const bindGroupActions = (dispatch) => {
    return {
        onGroupUpdate: (g) => dispatch(GroupActions.group_update(g)),
        onGroupAdd: (g) => dispatch(GroupActions.group_add(g)),
        onGroupDelete: (g) => dispatch(GroupActions.group_delete(g)),
        onAddSubGroup: ({ group, new_subgroup }) => dispatch(GroupActions.group_add_sub({ group, new_subgroup })),

        onMemberAdd: ({ membership, group }) => dispatch(GroupActions.memberAdd({ membership, group })),
        onMemberRemove: ({ group, membership }) => dispatch(GroupActions.memberRemove({ group, membership })),
        onMemberUpdate: (payload) => dispatch(GroupActions.memberUpdate(payload)),
        onMemberMoving: ({ old_group, new_group, moving_member }) => dispatch(GroupActions.memberMoving({ old_group, new_group, moving_member })),

        onUpdateUser: (user) => dispatch(UserActions.users_update(user)),

        groupFetch: (id) => dispatch(GroupFetch(id)),
        groupAsyncUpdate: (group) => dispatch(GroupAsyncUpdate(group)),
        groupAsyncInsert: (group) => dispatch(GroupAsyncInsert(group)),
        userAsyncInsert: (user) => dispatch(UserAsyncInsert(user)),
        userAsyncUpdate: (user) => dispatch(UserAsyncUpdate(user)),
        roleFetch: () => dispatch(RoleFetch()),
        membershipAsyncInsert: (payload) => {
            dispatch(MembershipAsyncInsert(payload))
        },
        membershipAsyncUpdate: ({ id, lastchange, valid }) => { dispatch(MembershipAsyncUpdate({ id, lastchange, valid })) },
        userFetch: (id) => dispatch(UserFetch(id)),
        roleAsyncInsert: (payload) => {
            dispatch(RoleAsyncInsert(payload))
        },
        roleAsyncUpdate: (role) => {
            dispatch(RoleAsyncUpdate(role))
        }
    }
}
