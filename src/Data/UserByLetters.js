import { authorizedFetch } from "./authorizedFetch"
// This function asks for the possible users with the input letters
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
// Fetch it from sever using authorizedFetch with the newparams is the above function
export const UserbyLetters = (letters) =>
    authorizedFetch('/gql', {
        body: JSON.stringify(UserbyLettersJSON(letters)),
    })
    // This function helps to define what we would do with the data we get from sever
export const UserbyLettersFetch = (letters, query, selector) => {
    const log = (text) => (p) => {
        console.log(text)
        console.log(JSON.stringify(p))
        return p
    }
    const p = query(letters)
        .then(
            response => response.json(), //convert it to jason
            error => error
        )
        .then(
            (i) => log('incomming')(i) //stringify it
        )
        .then(
            json => log('converted')(selector(json)), //get the part that we need
            error => error
        )
    return p
}
// // In the function below we call the previous function that require the letter, the query and the selector in which are input letters, GroupTypePage and the data.groupTypePage respectively
export const fetch_by_letters = (letters, set_users_list) => {
    console.log('function fetch by letter called')
    const selector = (json) => json.data.userByLetters
    const bodyfunc = async () => {
        let groupData = await UserbyLettersFetch(letters, UserbyLetters, selector)
        console.log("users",groupData)
        set_users_list(groupData) //return the users list with given letters
        return groupData
    }
    return bodyfunc()
}