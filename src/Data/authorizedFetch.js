const globalFetchParams = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    redirect: 'follow', // manual, *follow, error
}


export const authorizedFetch = (path, params) => {
    const newParams = { ...globalFetchParams, ...params } // allow owerwrite default parameters (globalFetchParams)
    const overridenPath = '/api/gql' // This is the path of our sever
    return (
        fetch(overridenPath, newParams) //params.header should be extended with Authorization TOKEN
    )
}