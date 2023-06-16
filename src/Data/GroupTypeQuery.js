import { authorizedFetch } from "./authorizedFetch"
// This query asks for all of the group types on sever
export const GroupTypePageJSON = () => ({
    "query":
    `query  {
          groupTypePage 
          {
            name
            lastchange
            id
            nameEn
          }
        }`,
})
// Then we fetch it from sever
export const GroupTypePage = () =>
    authorizedFetch('/gql', {
        body: JSON.stringify(GroupTypePageJSON()),
    })
    // This functions declare what we would do with the data we get from server, in this case the grouptype page
export const GroupTypePageFetch = (query,selector) => {
        const p = query()
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
      // In the function below we call the previous function that require the query and the selector in which are GroupTypePage and the selector is the data.groupTypePage
export const group_type_fetch = (set_group_type) => 
{
        const selector = (json) => json.data.groupTypePage
        const bodyfunc = async () => {
            let grouptypes = await GroupTypePageFetch(GroupTypePage, selector) // Put what we get from sever into a variable
            set_group_type(grouptypes) //Push that variable into group_type on Grouptype_Selector
            return grouptypes
        }
        return bodyfunc()
}