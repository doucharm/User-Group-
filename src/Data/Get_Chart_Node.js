import { authorizedFetch } from "./authorizedFetch"
export const Get_Chart_NodeJson = (id) => ({
    "query":
        `query ($id: ID!) {
        groupById(id:$id)
          {
            id
            name
            grouptype
            {
              nameEn
            }
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

export const groupByID = (id) =>
    authorizedFetch('/gql', {
        body: JSON.stringify(Get_Chart_NodeJson(id)),
    })
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
export const Get_Node = (id) => {
    const selector = (json) => json.data.groupById
    const bodyfunc = async () => {
        let item = await Get_Node_Chart(id, groupByID, selector)        
        return item
    }
    return bodyfunc()
}