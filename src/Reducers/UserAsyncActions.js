import { UserActions } from "./Reducer Slice"

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
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        redirect: 'follow', // manual, *follow, error
        body: JSON.stringify(userMutationJSON(user))
    }


    return fetch('/api/gql', params)
        //return authorizedFetch('/api/gql', params)
        .then(
            resp => resp.json()
        )
        .then(
            json => {
                const msg = json.data.userUpdate.msg
                if (msg === "fail") {
                    console.log("Update selhalo")
                } else {
                    //mame hlasku, ze ok, musime si prebrat token (lastchange) a pouzit jej pro priste
                    const lastchange = json.data.userUpdate.user.lastchange
                    dispatch(UserActions.users_update({ ...user, lastchange: lastchange }))
                }
                return json
            }
        )
}

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
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        redirect: 'follow', // manual, *follow, error
        body: JSON.stringify(userMutationJSON({ ...user }))
    }


    return fetch('/api/gql', params)

}



