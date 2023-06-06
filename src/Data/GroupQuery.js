import { authorizedFetch } from "./authorizedFetch"

export const GroupQueryJSON = (id) => ({
    "query":
        `query ($id: ID!) {
            groupById(id: $id) {
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


export const GroupQuery = (id) =>
    authorizedFetch('/gql', {
        body: JSON.stringify(GroupQueryJSON(id)),
    })