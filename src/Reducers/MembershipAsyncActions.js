export const MembershipAsyncInsert = ({group_id,user_id}) => (dispatch, getState) => {
  const membershipMutationJSON = (membership) => {
      return {
          query: `mutation($group_id: ID!, $user_id: ID!) {
              membershipInsert(membership: {
              groupId: $group_id,
              userId: $user_id
              valid: true
          }){
              msg
          }
          }`, variables: membership
          }
      }
  const params = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      redirect: 'follow', // manual, *follow, error
      body: JSON.stringify(membershipMutationJSON({group_id,user_id}))
  }


  return fetch('/api/gql', params)
}


export const MembershipAsyncUpdate = ({id,lastchange}) => (dispatch, getState) => {
    const membershipMutationJSON = (membership) => {
        return {
            query: `mutation($id: ID!, $lastchange: DateTime!) {
                membershipUpdate(membership: {
                id: $id, valid: false,
                lastchange: $lastchange
            }){
                id
                msg
                membership {
                    id
                    lastchange
                    valid
                }
            }
            }`, variables: membership
            }
        }
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        redirect: 'follow', // manual, *follow, error
        body: JSON.stringify(membershipMutationJSON({id,lastchange}))
    }
    return fetch('/api/gql', params)
  }