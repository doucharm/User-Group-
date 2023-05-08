import { authorizedFetch } from "./authorizedFetch"


export const RoleQueryJSON = () => ({
    "query":
        `query {
          roleTypePage {
            name
            nameEn
            id
          }
        }`
})

export const RoleQuery = () =>
    authorizedFetch('/gql', {
        body: JSON.stringify(RoleQueryJSON()),
    })