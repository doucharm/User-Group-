import { GroupActions } from "./Reducer Slice";
import { GroupQuery } from "Data/GroupQuery";

/**
 * Ask for the item on server and adds it or update it in the store to the heap
 * @param {*} id 
 * @returns promise
 */
export const GroupFetchHelper = (id, query, resultselector, dispatch, getState) => {
    const log = (text) => (p) => {
        console.log(text)
        console.log(JSON.stringify(p))
        return p
    }
    const p = query(id)
        .then(
            response => response.json(),
            error => error
        )
        .then(
            json => log('converted')(resultselector(json)),
            error => error
        )
        .then(
            json => log('dispatching')(dispatch(GroupActions.group_update(json))),
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
// Mutation to update group on server, we pass the neccessary params which is modified to this function
export const GroupTypeAsyncUpdate = ({ group, id, lastchange, grouptypeId }) => (dispatch, getState) => {
    const groupMutationJSON = (group) => {
        return {
            query: `mutation ($id: ID!, $lastchange: DateTime!, $grouptypeId: ID!) {
                groupUpdate(group: {id: $id, lastchange: $lastchange, grouptypeId: $grouptypeId}) {
                  msg
                  group {
                    id
                    name
                    lastchange
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
        }
    }

    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        redirect: 'follow', // manual, *follow, error
        body: JSON.stringify(groupMutationJSON({ id, lastchange, grouptypeId }))
    }

    //After fetching it to the server, we update the group with the new grouptype to store
    return fetch('/api/gql', params)
        //return authorizedFetch('/api/gql', params)
        .then(
            resp => resp.json()
        )
        .then(
            json => {
                const msg = json.data.groupUpdate.msg
                if (msg === "fail") {
                    console.log("Update selhalo")
                } else {
                    //mame hlasku, ze ok, musime si prebrat token (lastchange) a pouzit jej pro priste
                    const newgroup = json.data.groupUpdate.group
                    dispatch(GroupActions.group_update({ ...group, ...newgroup }))
                }
                return json
            }
        )
}
// Mutation to insert a new group to the server, this requires a customized group as an input
export const GroupAsyncInsert = (group) => (dispatch, getState) => {
    const groupMutationJSON = (group) => {
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
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        redirect: 'follow', // manual, *follow, error
        body: JSON.stringify(groupMutationJSON(group))
    }
    // Fetch it to the server
    return fetch('/api/gql', params)
}

// Mutation to update group on server, we pass the neccessary params which is modified to this function
export const GroupAsyncUpdate = ({ group, id, lastchange, name, valid, mastergroupId }) => (dispatch, getState) => {
    const groupMutationJSON = (group) => {
        return {
            query: `mutation ($id: ID!, $lastchange: DateTime!, $name: String!, $valid: Boolean!, $mastergroupId: ID!) {
                groupUpdate(group: {id: $id, lastchange: $lastchange, name: $name, valid: $valid, mastergroupId: $mastergroupId}) {
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

    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        redirect: 'follow', // manual, *follow, error
        body: JSON.stringify(groupMutationJSON({ id, lastchange, name, valid, mastergroupId }))
    };
    // Afterward, we update it to store
    return fetch('/api/gql', params)
        .then(resp => resp.json())
        .then(json => {
            console.log('JSON response:', json)
            const msg = json.data.groupUpdate.msg;
            if (msg === "fail") {
                console.log("Update selhalo");
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
