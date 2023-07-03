import { authorizedFetch } from "./authorizedFetch"
/**
 * This function asks for members with given id from sever
 * @param {*} id 
 * @returns the users with provided id
 */
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
                    lastchange
                    valid
                    grouptype { 
                        id
                        nameEn
                    }
                    subgroups {
                        id
                        name
                        lastchange
                        valid
                        mastergroup{
                            id
                        }
                        grouptype
                        {
                            nameEn
                        }
                    }
                    memberships {
                        id
                        lastchange
                        valid
                        group
                        {
                            id
                            roles{
                                lastchange
                                id
                                roletype{
                                    nameEn
                                }
                                group{
                                    id
                                }
                            }
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

/**
 * And afterward fetch it from server using authorizedFetch and the newparams is the above query
 * @param {*} id 
 * @returns promise
 */
export const UserQuery = (id) =>
    authorizedFetch('/gql', {
        body: JSON.stringify(UserQueryJSON(id)),
    })
