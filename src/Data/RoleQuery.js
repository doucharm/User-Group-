import { authorizedFetch } from "./authorizedFetch"
// This function asks for all the roles from the server
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
// Fetch it with authorizedFetch
export const RoleQuery = () =>
  authorizedFetch('/gql', {
    body: JSON.stringify(RoleQueryJSON()),
  })