import { RoleQuery } from "Data/RoleQuery";
import { GroupActions, RoleActions } from "./Reducer Slice";
import { v1 } from "uuid";
export const RoleFetchHelper = (query, selecter, dispatch, getState) => {
    const log = (text) => (p) => {
        return p
    }
    const p = query()
        .then(
            response => response.json(),
            error => error
        )
        .then(
            (i) => log('incomming')(i)
        )
        .then(
            json => log('converted')(selecter(json)),
            error => error
        )
        .then(
            json => log('dispatching')(dispatch(RoleActions.roles_update(json))),
            error => error
        )
    return p
}

export const RoleFetch = () => (dispatch, getState) => {
    const selecter = (json) => json.data.roleTypePage
    const bodyfunc = async () => {
        let RoleData = await RoleFetchHelper(RoleQuery, selecter, dispatch, getState)
        console.log(RoleData)
        return RoleData
    }
    return bodyfunc()
}

export const RoleAsyncInsert = (payload) => (dispatch, getState) => {
    const roleMutationJSON = (payload) => {
        console.log("payload into role_insert",payload)
        return {
            query: `mutation($groupId: ID!, $userId: ID!, $roletypeID: ID!,$id: ID!) {
            roleInsert(role: {
            id: $id,
            groupId: $groupId,
            userId: $userId,
            roletypeId: $roletypeID
            valid:true
        }){
            msg
            role {
                lastchange
                id
                startdate
                enddate
                roletype {
                  id
                  nameEn
                }
                group
                {
                    id
                }
                valid
              }
        }
        }`,
            variables:      { id:v1(), 
                              groupId:payload.membership.group.id,
                              userId:payload.membership.user.id,
                              roletypeID:payload.role.id
                            }
        }
    }

  const params = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      cache: 'no-cache', 
      redirect: 'follow', 
      body: JSON.stringify(roleMutationJSON(payload))
  }
    return fetch('/api/gql', params)
    .then((resp) => resp.json())
        .then((json) => {
            const msg = json.data?.roleInsert?.msg;
            if (msg === "fail") {
                console.log("Update failed");
            } else {
                const new_role = json.data?.roleInsert?.role;
                const new_user={...payload.membership.user,roles : payload.membership.user.roles.concat(new_role) }
                const new_membership={...payload.membership,user:new_user}
                console.log("new membership going into store",new_membership)
                dispatch(GroupActions.memberUpdate({membership:new_membership,group:{id:new_membership.group.id}}))
            }
            return json;
        })
        .catch(() => console.log("Failed to insert"));
}

export const RoleAsyncUpdate = (role) => (dispatch, getState) => {
    console.log("role update ",role)
    const roleMutationJSON = (role) => {
        return {
            query: ` mutation($id: ID!, $lastchange: DateTime!) {
            roleUpdate(role: {
            id: $id, 
            lastchange: $lastchange,
            valid:false
        }){
            id
            msg
            role {
                id
                lastchange
                valid
            }
        }
        }`, variables: role
        }
    }

    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        redirect: 'follow', // manual, *follow, error
        body: JSON.stringify(roleMutationJSON(role))
    }
  return fetch('/api/gql', params)
}

export const Role_Type_Insert = (payload) => (dispatch, getState) => {
    const roletypeMutationJSON = (roletype) => {
        return {
            query: `mutation($id: ID!, $name: String!, $nameEn: String!) {
              roleTypeInsert(roleType: {
              id: $id,
              name:$name,
              nameEn: $nameEn
          }){
              msg
              id
              roleType
              {
                id
                name
                nameEn
              }
          }
          }`,
            variables: roletype
            }
        }
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        redirect: 'follow', // manual, *follow, error
        body: JSON.stringify(roletypeMutationJSON(payload))
    }
    return fetch('/api/gql', params)
  }
