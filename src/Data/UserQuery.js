import { authorizedFetch } from "./authorizedFetch"


export const UserQueryJSON = (id) => ({
    "query":
        `query ($id: ID!) {
            userById(id: $id) {
                id
                name
                surname
                email
                membership {
                  group {
                    name
                    id
                  }
                }
                roles {
                    lastchange
                }
            }
        }`,
    "variables": { "id": id }
})

export const UserQuery = (id) =>
    authorizedFetch('/gql', {
        body: JSON.stringify(UserQueryJSON(id)),
    })

export const UserQueryByLettersJSON = (letters) => ({
    "query":
        `query ($letters: String!) {
              userByLetters(letters: $letters) {
                id
                name
                surname
                email
                membership {
                  group {
                    name
                    id
                  }
                }
                roles {
                  lastchange
                }
              }
            }`,
    "variables": { "letters": letters }
});

export const UserQueryByLetters = (letters) =>
    authorizedFetch('/gql', {
        body: JSON.stringify(UserQueryByLettersJSON(letters)),
    });