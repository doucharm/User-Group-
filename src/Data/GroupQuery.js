import { authorizedFetch } from "./authorizedFetch"


export const GroupQueryJSON = (id) => ({
    "query":
        `query ($id: ID!) {
            groupById(id: $id) {
                id
                name
                valid
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
                }
                memberships {
                    id
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