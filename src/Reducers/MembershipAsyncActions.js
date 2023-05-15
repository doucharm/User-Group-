export const MembershipAsyncUpdate = (memberships) => (dispatch, getState) => {
  const membershipMutationJSON = ({memberships}) => {
      return {
          query: `mutation($group_id: ID!, $user_id: ID!) {
              membershipInsert(membership: {
              groupId: $group_id,
              userId: $user_id
          }){
              id
              msg
              membership {
                  id
                  group { id }
                  user { id }
                  lastchange
              }
          }
          }`, variables: {memberships}
          }
      }
  const params = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      redirect: 'follow', // manual, *follow, error
      body: JSON.stringify(membershipMutationJSON({memberships}))
  }


  return fetch('/api/gql', params)
}