/**
 * Mutation to insert a new grouptype, we will use it for further development of the project. At the time we're not calling it anywhere
 * @param {*} group 
 * @returns 
 */
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

export const GroupTypeAsyncInsert = (group) => (dispatch, getState) => {
  return authorizedFetch('/gql', {
    body: JSON.stringify(groupMutationJSON(group)),
})
}