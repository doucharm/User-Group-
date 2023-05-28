import { authorizedFetch } from "./authorizedFetch"
export const UserbyLettersJSON = (letters) => ({
    "query":
    `query ($letters: String!) {
          userByLetters(letters: $letters) 
          {
            id
            name
            surname
            email 
            valid
            lastchange
          }
        }`,
"variables": { "letters": letters }
})
export const UserbyLetters = (letters) =>
    authorizedFetch('/gql', {
        body: JSON.stringify(UserbyLettersJSON(letters)),
    })
export const UserbyLettersFetch = (letters, query,selector) => {
    const log = (text) => (p) => {
        console.log(text)
        console.log(JSON.stringify(p))
        return p
    }
        const p = query(letters)
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
export const fetch_by_letters = (letters,set_users_list) => 
{
        console.log('function fetch by letter called')
        const selector = (json) => json.data.userByLetters
        const bodyfunc = async () => {
            let groupData = await UserbyLettersFetch(letters, UserbyLetters, selector)
            console.log(groupData)
            set_users_list(groupData)
            return groupData
        }
        return bodyfunc()
}
      