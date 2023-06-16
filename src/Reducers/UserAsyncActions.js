import { UserActions } from "./Reducer Slice"
import { UserQuery } from "Data/UserQuery";

// Ask for the user on server and adds it or update it in the store
export const UserFetchHelper = (id, query, resultselector, dispatch, getState) => {
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
            (i) => log('incomming')(i)
        )
        .then(
            json => log('converted')(resultselector(json)),
            error => error
        )
        .then(
            json => log('dispatching')(dispatch(UserActions.users_update(json))),
            error => error
        )
    return p
}
// Fetch the user from server. Finally puts the result in the store.
export const UserFetch = (id) => (dispatch, getState) => {
    const userSelector = (json) => json.data.userById
    const bodyfunc = async () => {
        let userData = await UserFetchHelper(id, UserQuery, userSelector, dispatch, getState)
        console.log(userData)
        return userData
    }
    return bodyfunc()
}

// This mutation will help to update a user to the server, it requires the input as a modified user
export const UserAsyncUpdate = (user) => (dispatch, getState) => {
    const userMutationJSON = (user) => {
        return {
            query: `mutation($lastchange: DateTime!, $id: ID!, $email: String!, $name: String!, $surname: String!) {
                userUpdate(
                  user: {id: $id, lastchange: $lastchange, surname: $surname, email: $email, name: $name}
                ) {
                  id
                  msg
                  user {
                    name
                    surname
                    email
                    lastchange
                  }
                }
              }`,
            variables: user
        }
    }

    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache', 
        redirect: 'follow', 
        body: JSON.stringify(userMutationJSON(user))
    }
    // Fetching it to server and then updating it to the store
    return fetch('/api/gql', params)
        .then(
            resp => resp.json()
        )
        .then(
            json => {
                const msg = json.data.userUpdate.msg
                if (msg === "fail") {
                    console.log("Update selhalo")
                } else {
                    const lastchange = json.data.userUpdate.user.lastchange
                    dispatch(UserActions.users_update({ ...user, lastchange: lastchange }))
                }
                return json
            }
        )
}

// This mutation helps inserting a customized user to the user's page
export const UserAsyncInsert = (user) => (dispatch, getState) => {
    const userMutationJSON = (user) => {
        return {
            query: `mutation ($id: ID!, $name: String!, $surname: String!,$email: String!) {
                userInsert(user: {id: $id, name: $name, surname: $surname, email: $email}) {
                  msg
                }
              }`,
            variables: user
        }
    }

    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache', 
        redirect: 'follow', 
        body: JSON.stringify(userMutationJSON({ ...user }))
    }
    // And finally fetching it to the server
    return fetch('/api/gql', params)
}


