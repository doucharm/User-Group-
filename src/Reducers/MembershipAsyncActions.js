import { GroupActions } from "./Reducer Slice"

export const MembershipAsyncInsert = ({ store_update, group_id, user_id, id }) => (dispatch, getState) => {
  const membershipInsertJSON = (membership) => {
    return {
      query: `mutation($group_id: ID!, $user_id: ID!,$id: ID!) {
              membershipInsert(membership: {
              groupId: $group_id,
              userId: $user_id
              id: $id
              valid: true
            }){
              msg
              membership 
              {
                id
                lastchange
              }
            }
      }`,
      variables: membership
    };
  };

  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
    redirect: 'follow',
    body: JSON.stringify(membershipInsertJSON({ group_id, user_id, id })),
  };

  return fetch('/api/gql', params)
    .then((resp) => resp.json())
    .then((json) => {
      const msg = json.data?.membershipInsert?.msg;
      if (msg === "fail") {
        console.log("Update failed");
      } else {
        const new_membership = json.data.membershipInsert.membership;
        dispatch(GroupActions.memberAdd({ group: store_update.group, membership: { ...store_update.membership, ...new_membership } }));
      }
      return json;
    })
    .catch(() => console.log("Failed to insert"));
};



export const MembershipAsyncUpdate = ({ id, lastchange, valid }) => (dispatch, getState) => {
  const membershipUpdateJSON = (membership) => {
    return {
      query: `
          mutation($id: ID!, $lastchange: DateTime!, $valid: Boolean!) {
            membershipUpdate(membership: {
              id: $id,
              lastchange: $lastchange,
              valid: $valid
            }) {
              id
              msg
              membership {
                id
                lastchange
                valid
              }
            }
          }
        `,
      variables: {
        id,
        lastchange,
        valid,
      },
    };
  };

  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
    redirect: 'follow',
    body: JSON.stringify(membershipUpdateJSON({ id, lastchange, valid })),
  };

  return fetch('/api/gql', params)

};
