import { RoleQuery } from "Data/RoleQuery";
import { RoleActions } from "./Reducer Slice";
export const RoleFetchHelper = (query, selecter, dispatch, getState) => {
    const log = (text) => (p) => {
        console.log(text)
        console.log(JSON.stringify(p))
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
  const roleMutationJSON = (role) => {
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
        }
        }`,
          variables: role
          }
      }

  const params = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      redirect: 'follow', // manual, *follow, error
      body: JSON.stringify(roleMutationJSON(payload))
  }
  return fetch('/api/gql', params)
}

export const RoleAsyncUpdate = (role) => (dispatch, getState) => {
  const roleMutationJSON = (role) => {
      return {
          query: ` mutation($id: ID!, $lastchange: DateTime!) {
            roleUpdate(role: {
            id: $id, 
            lastchange: $lastchange
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