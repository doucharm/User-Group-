export const RoleAsyncInsert = ({group_id,user_id,roletype_id}) => (dispatch, getState) => {
  const roleMutationJSON = (role) => {
      return {
          query: `mutation($group_id: ID!, $user_id: ID!, $roletype_id: ID!) {
            roleInsert(role: {
            groupId: $group_id,
            userId: $user_id,
            roletypeId: $roletype_id
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
      body: JSON.stringify(roleMutationJSON({group_id,user_id,roletype_id}))
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