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

export const GroupTypeAsyncUpdate = ({group,id,lastchange,grouptypeId}) => (dispatch, getState) => {
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
        body: JSON.stringify(groupMutationJSON({id,lastchange,grouptypeId}))
    }


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

export const GroupAsyncInsert = (group) => (dispatch, getState) => {
    const groupMutationJSON = (group) => {
        return {
            query: `mutation ($id: ID!, $name: String!, $mastergroupId: ID!) {
                groupInsert(group: {id: $id, name: $name, mastergroupId: $mastergroupId}) {
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

export const GroupAsyncUpdate = ({group,id,lastchange,name,valid}) => (dispatch, getState) => {
    const groupMutationJSON = (group) => {
        return {
            query: `mutation ($id: ID!, $lastchange: DateTime!, $name: String!, $valid: Boolean) {
                groupUpdate(group: {id: $id, lastchange: $lastchange, name: $name, valid: $valid}) {
                  msg
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
        body: JSON.stringify(groupMutationJSON({id,lastchange,name,valid}))
    }


    return fetch('/api/gql', params)
        .then(
            resp => resp.json()
        )
        .then(
            json => {
                const msg = json.data.groupUpdate.msg
                if (msg === "fail") {
                    console.log("Update selhalo")
                } else {
                    const newgroup = json.data.groupUpdate.group
                    dispatch(GroupActions.group_update({ ...group, ...newgroup }))
                }
                return json
            }
        )
}