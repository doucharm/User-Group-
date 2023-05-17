export const MembershipAsyncUpdate = ({group_id,user_id}) => (dispatch, getState) => {
  const membershipMutationJSON = (membership) => {
      return {
          query: `mutation($group_id: ID!, $user_id: ID!) {
              membershipInsert(membership: {
              groupId: $group_id,
              userId: $user_id
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