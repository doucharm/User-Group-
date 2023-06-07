import { authorizedFetch } from "./authorizedFetch"
export const Get_Chart_NodeJson = (id) => ({
    "query":
        `query ($id: ID!) {
        groupById(id:$id)
          {
            id
            name
            memberships
            {
              valid
              user
              {
                id
                name
                surname
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
    const log = (text) => (p) => {
        console.log(text)
        console.log(JSON.stringify(p))
        return p
    }
    const p = query(id)
        .then(
            response => response.json(),
            error => error
        )
        .then(
            (i) => log('incomming')(i)
        )
        .then(
            json => log('converted')(selector(json)),
            error => error
        )
    return p
}
export const Get_Node = (id) => {
    console.log('function fetch node called with id', id)
    const selector = (json) => json.data.groupById
    const bodyfunc = async () => {
        let item = await Get_Node_Chart(id, groupByID, selector)        
        return item
    }
    return bodyfunc()
}