import { authorizedFetch } from "Data/authorizedFetch";
import { GroupActions } from "./Reducer Slice";
import { GroupQuery } from "Data/GroupQuery";

/**
 * Ask for the item on server and adds it or update it in the store to the heap
 * @param {*} id 
 * @returns promise
 */
export const GroupFetchHelper = (id, query, resultselector, dispatch, getState) => {

    const p = query(id)
        .then(
            response => response.json(),
            error => error
        )
        .then(
            json => resultselector(json),
            error => error
        )
        .then(
            json => dispatch(GroupActions.group_update(json)),
            error => error
        )
    return p
}

/**
* Fetch the group from server checks its type and asks once more for detailed data. Finally puts the result in the store.
* @param {*} id 
* @returns 
*/
export const GroupFetch = (id) => (dispatch, getState) => {
    const groupSelector = (json) => json.data.groupById
    const bodyfunc = async () => {
        let groupData = await GroupFetchHelper(id, GroupQuery, groupSelector, dispatch, getState)
        return groupData
    }
    return bodyfunc()
}

const groupinsertMutationJSON = (group) => {
    return {
        query: `mutation ($id: ID!, $name: String!, $mastergroupId: ID!) {
            groupInsert(group: {id: $id, name: $name, mastergroupId: $mastergroupId}) {
              msg
              group {
                lastchange
                name
                id
                valid
              }
            }
          }`,
        variables: group
    }
}
// Mutation to insert a new group to the server, this requires a customized group as an input
export const GroupAsyncInsert = (group) => (dispatch, getState) => {
    // Fetch it to the server
    return authorizedFetch('/gql', {
        body: JSON.stringify(groupinsertMutationJSON(group)),
    })
}



const groupupdateMutationJSON = (group) => {
    return {
        query: `mutation ($id: ID!, $lastchange: DateTime!, $name: String!, $valid: Boolean!, $mastergroupId: ID!, $grouptypeId: ID!) {
            groupUpdate(group: {id: $id, lastchange: $lastchange, name: $name, valid: $valid, mastergroupId: $mastergroupId, grouptypeId: $grouptypeId}) {
              msg
              id
              group {
                id
                name
                lastchange
                valid
                mastergroup {
                    id
                }
                grouptype { 
                    id
                    nameEn
                }
                subgroups {
                    id
                    name
                    valid
                    lastchange
                    mastergroup{
                        id
                    }
                }
                memberships {
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
            }
          }`,
        variables: group
    };
};
// Mutation to update group on server, we pass the neccessary params which is modified to this function
export const GroupAsyncUpdate = ({ group, id, lastchange, name, valid, mastergroupId, grouptypeId }) => (dispatch, getState) => {
    // Afterward, we update it to store
    return authorizedFetch('/gql', {
        body: JSON.stringify(groupupdateMutationJSON({ id, lastchange, name, valid, mastergroupId, grouptypeId })),
    })
        .then(resp => resp.json())
        .then(json => {
            console.log('JSON response:', json)
            const msg = json.data.groupUpdate.msg;
            if (msg === "fail") {
                console.log("Update fail");
            } else {
                const newgroup = json.data.groupUpdate.group;
                dispatch(GroupActions.group_update({ ...group, ...newgroup }));
            }
            return json;
        })
        .catch((error) => {
            console.log('Error occurred:', error);
        });
};
