import { authorizedFetch } from "./authorizedFetch"
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
export const GroupTypePage = () =>
    authorizedFetch('/gql', {
        body: JSON.stringify(GroupTypePageJSON()),
    })
export const GroupTypePageFetch = (query,selector) => {
    const log = (text) => (p) => {
        console.log(text)
        console.log(JSON.stringify(p))
        return p
    }
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
export const group_type_fetch = (set_group_type) => 
{
        const selector = (json) => json.data.groupTypePage
        const bodyfunc = async () => {
            let grouptypes = await GroupTypePageFetch(GroupTypePage, selector)
            set_group_type(grouptypes)
            return grouptypes
        }
        return bodyfunc()
}