import { authorizedFetch } from "./authorizedFetch"
// new query that return only values needed to draw chart
export const Get_Chart_NodeJson = (id) => ({
    "query":
        `query ($id: ID!) {
        groupById(id:$id)
          {
            id
            name
            valid
            memberships
            {
              valid
              user
              {
                id
                name
                surname
                email
              }
            }
            subgroups
            {
              id
              name
              valid
            }
          }
        }`,
    "variables": { "id": id }
})
//Standard procedures to fetch and handle value
export const groupByID = (id) =>
    authorizedFetch('/gql', {body: JSON.stringify(Get_Chart_NodeJson(id)),})
export const Get_Node_Chart = (id, query, selector) => {
    const p = query(id)
        .then(
            response => response.json(),
            error => error
        )
        .then(
            json => selector(json),
            error => error
        )
    return p
}
/**
 * Get_Node function return a Group through the use of query GroupByID.
 * @param {*} the id of the group needed to fetch
 *
 * @returns Group with attributes listed in query
 */
export const Get_Node = (id) => {
    const selector = (json) => json.data.groupById
    const bodyfunc = async () => {
        let item = await Get_Node_Chart(id, groupByID, selector)        
        return item
    }
    return bodyfunc()
}