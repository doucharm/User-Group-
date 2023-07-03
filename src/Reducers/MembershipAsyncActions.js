import { GroupActions } from "./Reducer Slice"
import { authorizedFetch } from "Data/authorizedFetch";
/**
 * Mutation to insert an existed user from userPage to push it into a group's membership
 * @param {*} membership the new membership we need to push into the group's membership
 * @returns new membership of an user in a group on server
 */
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
            membership {
              id
              lastchange
              valid
              group
              {
                  id
                
              }
              user {
                  id
                  name
                  surname
                  email
                  lastchange
                  roles {
                      lastchange
                      id
                      startdate
                      enddate
                      group
                      {
                          id
                          memberships{
                              id
                          }
                      }
                      valid
                      roletype {
                        id
                        name
                        nameEn
                      }
                    }
              }
          }
          }
    }`,
    variables: membership
  };
};
/**
 * Function to fetch that to fetch that membership to server, we need to pass group id, user id and id of the membership itself
 * @param {*} payload This contains the store_update, which has 2 params in it (group and membership), the group_id and the user_id that we want to add to that group. And finally the id of that membership
 * @returns the membership we insert
 */
export const MembershipAsyncInsert = ({ store_update, group_id, user_id, id }) => (dispatch, getState) => {
  
  // After that we add that membership to that group's membership in the store
  return authorizedFetch('/gql', {
    body: JSON.stringify(membershipInsertJSON({ group_id, user_id, id })),
})
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

/**
 * We update the a membership in the the server by passing to this function a modifed membership
 * @param {*} payload The props of the updated membership
 * @returns Modified membership on server
 */
const membershipUpdateJSON = (payload) => {
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
    variables: payload,
  };
};

/**
 * We update the a membership in the the server by passing membershipUpdateJSON(payload) to authorizedFetch
 * @param {*} payload The props of the updated membership
 * @returns promise
 */
export const MembershipAsyncUpdate = (payload) => (dispatch, getState) => {
  // Then we fetch it to the server with the params is the mutation above
  return authorizedFetch('/gql', {
    body: JSON.stringify(membershipUpdateJSON(payload)),
})
};
