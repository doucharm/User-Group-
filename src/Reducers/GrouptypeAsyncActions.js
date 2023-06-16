
// Mutation to insert a new grouptype, we will use it for further development of the project
// At the time we're not calling it anywhere
export const GroupTypeAsyncInsert = (group) => (dispatch, getState) => {
  const groupMutationJSON = (group) => {
      return {
          query: `mutation ($id: ID!, $name: String!, $nameEn: String!) {
              groupTypeInsert(group: {id: $id, name: $name, nameEn: $nameEn }) {
                msg
              }
            }`,
          variables: group
      }
  }

  const params = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      redirect: 'follow', // manual, *follow, error
      body: JSON.stringify(groupMutationJSON(group))
  }
  return fetch('/api/gql', params)
}