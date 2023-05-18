import { GroupActions } from "./Reducer Slice"
export const MembershipAsyncInsert = ({group_id,user_id}) => (dispatch, getState) => {
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


export const MembershipAsyncUpdate = ({group,id,lastchange}) => (dispatch, getState) => {
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
    .then(
        resp => resp.json()
    )
    .then(
        json => {
            const msg = json.data.membershipUpdate.msg
            if (msg === "fail") {
                console.log("Update selhalo")
            } else {
                //mame hlasku, ze ok, musime si prebrat token (lastchange) a pouzit jej pro priste
                const lastchange = json.data.membershipUpdate.membership.lastchange
                dispatch(GroupActions.group_update({...group, lastchange: lastchange}))
            }
            return json
        }
    )   
  }