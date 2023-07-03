import { authorizedFetch } from "Data/authorizedFetch";
import { UserActions } from "./Reducer Slice"
import { UserQuery } from "Data/UserQuery";



/**
 * sk for the user on server and adds it or update it in the store
 * @param {*} id 
 * @returns promise
 */
export const UserFetchHelper = (id, query, resultselector, dispatch, getState) => {
    
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
            json => dispatch(UserActions.users_update(json)),
            error => error
        )
    return p
}

/**
 * Fetch the user from server. Finally puts the result in the store.
 * @param {*} id The user's id
 * @returns promise
 */
export const UserFetch = (id) => (dispatch, getState) => {
    const userSelector = (json) => json.data.userById
    const bodyfunc = async () => {
        let userData = await UserFetchHelper(id, UserQuery, userSelector, dispatch, getState)
        return userData
    }
    return bodyfunc()
}


/**
 * This mutation will help to update a user to the server, it requires the input as a modified user
 * @param {*} user The updated user
 * @returns updated user on server
 */
const userUpdateMutationJSON = (user) => {
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


/**
 * This mutation will help to insert a user to the server, it requires the input as a new user
 * @param {*} user The new user
 * @returns updated user on server
 */
const userInsertMutationJSON = (user) => {
    return {
        query: `mutation ($id: ID!, $name: String!, $surname: String!,$email: String!) {
            userInsert(user: {id: $id, name: $name, surname: $surname, email: $email}) {
              id
              msg
              user{
                id
                name
                surname
                email
              }
            }
          }`,
        variables: user
    }
}

/**
 * This function fetch the userUpdateMutationJSON(user) with authorizedFetch and then declare what we do with it later
 * @param {*} user The updated user
 * @returns promise
 */
export const UserAsyncUpdate = (user) => (dispatch, getState) => {

    // Fetching it to server and then updating it to the store
    return authorizedFetch('/api/gql', { body: JSON.stringify(userUpdateMutationJSON(user)) })
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

/**
 * This function fetch the userInsertMutationJSON({ ...user }) with authorizedFetch 
 * @param {*} user The new user
 * @returns promise
 */
export const UserAsyncInsert = (user) => (dispatch, getState) => {

    // And finally fetching it to the server
    return authorizedFetch('/api/gql', { body: JSON.stringify(userInsertMutationJSON({ ...user })) })
}


