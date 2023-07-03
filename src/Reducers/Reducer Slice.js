import { Create_Group, Delete_Group, Update_Group, Adding_Subgroup, Hierarchy_Update, Updating_Subgroup } from "./Group Reducer";
import { Adding_Member, Remove_Member, Update_Member } from "./Member Reducer";
import { Update_Role } from "./Role Reducer";
import { Update_User } from "./User Reducer";
import { GroupAsyncInsert, GroupFetch, GroupAsyncUpdate } from "./GroupAsyncAction";
import { MembershipAsyncUpdate, MembershipAsyncInsert } from "./MembershipAsyncActions";
import { RoleAsyncInsert, RoleAsyncUpdate, RoleFetch, Role_Type_Insert } from "./RoleAsyncActions";
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
        group_update_sub: Updating_Subgroup,

        memberAdd: Adding_Member,
        memberRemove: Remove_Member,
        memberUpdate: Update_Member,
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


export const HierarchySlice = createSlice(
    {
        name: 'hierarchy',
        initialState: {},
        reducers: {
            hierarchy_update: Hierarchy_Update
        }
    }
)
export const HierarchyActions = HierarchySlice.actions
export const HierarchyReducer = HierarchySlice.reducer


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

/**
 * Where we keep all of the reducers for store, queries and mutations for sever
 * @param {*} dispatch 
 * @returns The store for actions in store and also on server
 */
export const bindGroupActions = (dispatch) => {
    return {
        // actions regarding operations with group
        onGroupUpdate: (g) => dispatch(GroupActions.group_update(g)),
        onGroupAdd: (g) => dispatch(GroupActions.group_add(g)),
        onGroupDelete: (g) => dispatch(GroupActions.group_delete(g)),
        onAddSubGroup: ({ group, new_subgroup }) => dispatch(GroupActions.group_add_sub({ group, new_subgroup })),
        onUpdateSubGroup: ({ group, new_subgroup }) => dispatch(GroupActions.group_update_sub({ group, new_subgroup })),

        //actions for modifying memberships of user in groups
        onMemberAdd: ({ membership, group }) => dispatch(GroupActions.memberAdd({ membership, group })),
        onMemberRemove: ({ group, membership }) => dispatch(GroupActions.memberRemove({ group, membership })),
        onMemberUpdate: (payload) => dispatch(GroupActions.memberUpdate(payload)),
        onMemberMoving: ({ old_group, new_group, moving_member }) => dispatch(GroupActions.memberMoving({ old_group, new_group, moving_member })),


        onUpdateUser: (user) => dispatch(UserActions.users_update(user)),
        groupFetch: (id) => dispatch(GroupFetch(id)),
        groupAsyncUpdate: (group) => dispatch(GroupAsyncUpdate(group)),
        groupAsyncInsert: (group) => dispatch(GroupAsyncInsert(group)),
        
        //editing user's information
        userAsyncInsert: (user) => dispatch(UserAsyncInsert(user)),
        userAsyncUpdate: (user) => dispatch(UserAsyncUpdate(user)),
        userFetch: (id) => dispatch(UserFetch(id)),

        //communicating with server regarding membership of user -> adding or removing
        membershipAsyncInsert: (payload) => {dispatch(MembershipAsyncInsert(payload))},
        membershipAsyncUpdate: (payload) => { dispatch(MembershipAsyncUpdate(payload)) },
        
        //actions for roles to communicate with the server
        roleFetch: () => dispatch(RoleFetch()),
        roleAsyncInsert: (payload) => {dispatch(RoleAsyncInsert(payload)) },
        roleAsyncUpdate: (payload) => {dispatch(RoleAsyncUpdate(payload))},
        roletype_insert: (payload) => { dispatch(Role_Type_Insert(payload)) },

        //fetching hierarchy list of the entire organization
        hierarchFetch: ({res}) => dispatch(Hierarchy_Update({res}))
    }
}
