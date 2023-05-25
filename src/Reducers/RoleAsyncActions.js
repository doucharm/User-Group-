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