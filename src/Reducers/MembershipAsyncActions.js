import { GroupActions } from "./Reducer Slice"
export const MembershipAsyncInsert = ({store_update,group_id,user_id}) => (dispatch, getState) => {
  const membershipInsertJSON = (membership) => {
      return {
          query: `mutation($group_id: ID!, $user_id: ID!) {
              membershipInsert(membership: {
              groupId: $group_id,
              userId: $user_id
              valid: true
          }){
              msg
              membership
              {
                id
                lastchange
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
      body: JSON.stringify(membershipInsertJSON({group_id,user_id}))
  }


  return fetch('/api/gql', params)
  .then(
    resp => resp.json()
)
.then(
    json => {
        const msg = json.data?.membershipInsert?.msg
        if (msg === "fail") {
            console.log("Update selhalo")
        } else {
            const new_membership = json.data.membershipInsert.membership
            dispatch(GroupActions.memberAdd({group:store_update.group,membership:{...store_update.membership,new_membership}}))
        }
        return json
    }
).catch(console.log("failed insert")) 
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