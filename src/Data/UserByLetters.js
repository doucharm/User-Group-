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
          }
        }`,
"variables": { "letters": letters }
})
export const UserbyLetters = (letters) =>
    authorizedFetch('/gql', {
        body: JSON.stringify(UserbyLettersJSON(letters)),
    })
export const UserbyLettersFetch = (letters, query, resultselector, dispatch, getState) => {
        const p = query(letters)
            .then(
                response => response.json(),
                error => error  
            )
            .then(
                json => (resultselector(json)),
                error => error
            )
        return p
      }
export const fetch_by_letters = (letters,set_users_list) => (dispatch, getState) => {
        const selector = (json) => json.data.userByLetters
        const bodyfunc = async () => {
            let groupData = await UserbyLettersFetch(letters, UserbyLetters, selector, dispatch, getState)
            console.log(groupData)
            set_users_list(groupData)
            return groupData
        }
        return bodyfunc()
      }
      