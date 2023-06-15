import { authorizedFetch } from "./authorizedFetch"
// This function asks for members with given id from sever
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
                  valid
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
// And afterward fetch it from server using authorizedFetch and the newparams is the above query
export const UserQuery = (id) =>
    authorizedFetch('/gql', {
        body: JSON.stringify(UserQueryJSON(id)),
    })
