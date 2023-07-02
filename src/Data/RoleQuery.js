import { authorizedFetch } from "./authorizedFetch"

/**
 * This function asks for all the roles from the server
 * @returns roletype page
 */
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
/**
 * Overwrite the default params with the RoleQueryJSON
 * @returns promise
 */
export const RoleQuery = () =>
  authorizedFetch('/gql', {
    body: JSON.stringify(RoleQueryJSON()),
  })