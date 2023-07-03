const globalFetchParams = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    redirect: 'follow', // manual, *follow, error
}

/**
 * This function helps to fetch the data to server with a predefined form
 * @param {*} path The path of our server, in this case is called directly as '/api/gql'
 * @param {*} params The data from server to overwrite the default params
 * @returns promise
 */
export const authorizedFetch = (path, params) => {
    const newParams = { ...globalFetchParams, ...params } // allow owerwrite default parameters (globalFetchParams)
    const overridenPath = '/api/gql' // This is the path of our sever
    return (
        fetch(overridenPath, newParams) //params.header should be extended with Authorization TOKEN
    )
}