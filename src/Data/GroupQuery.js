import { authorizedFetch } from "./authorizedFetch"

/**
 * Query to asks for the group from server with the param is the id of that group
 * @param {*} id 
 * @returns the group with provided id from server
 */
export const GroupQueryJSON = (id) => ({
    "query":
        `query ($id: ID!) {
            groupById(id: $id) {
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
                    lastchange
                    valid
                    mastergroup{
                        id
                    }
                    grouptype
                    {
                        id
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
                
            }
        }`,
    "variables": { "id": id }
})
/**
 * This function calls the authorizedFetch with the newparams is the above query, it will fetch from server the appropriate group with the given id
 * @param {*} id 
 * @returns promise
 */
export const GroupQuery = (id) =>
    authorizedFetch('/gql', {
        body: JSON.stringify(GroupQueryJSON(id)),
    })