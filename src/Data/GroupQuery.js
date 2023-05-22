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
                    name 
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
                    user {
                        membership 
                        {
                            id
                            
                        }
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
                            roletype {
                              name
                              nameEn
                            }
                          }
                    }
                }
            }
        }`,
    "variables": {"id": id}
})

export const GroupQuery = (id) =>
    authorizedFetch('/gql', {
        body: JSON.stringify(GroupQueryJSON(id)),
    })