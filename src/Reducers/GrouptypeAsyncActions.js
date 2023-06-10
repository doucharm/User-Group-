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