import { authorizedFetch } from "./authorizedFetch"


export const UserQueryJSON = (id) => ({
    "query":
        `query ($id: ID!) {
            userById(id: $id) {
                id
                name
                surname
                email
                lastchange
                membership {
                  group {
                    name
                    id
                    roles {
                        lastchange
                        id
                        roletype{
                            nameEn 
                        }
                    }
                    mastergroup{
                        name
                        id
                        roles{
                            lastchange
                            id
                            roletype{
                                nameEn
                            }
                        }
                    }
                  }
                }
                roles {
                    lastchange
                    id
                    valid
                    group{
                        id
                    }
                roletype {
                    nameEn
                }
                }
            }
        }`,
    "variables": { "id": id }
})
export const UserQuery = (id) =>
    authorizedFetch('/gql', {
        body: JSON.stringify(UserQueryJSON(id)),
    })
