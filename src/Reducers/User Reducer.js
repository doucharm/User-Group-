
/**
 * This reducer helps to update an user into store after fetching it from the sever. Afterward, we can easily call the user that holds the user id from the store
 * @param {Object} state all of the users in store
 * @param {Object} action contains all of the payload's details needed to modify our state
 * @returns state
 */
export const Update_User = (state, action) => {
    const newUser = action.payload;
    if (!newUser) {
        return state; // Return the current state if newUser is null
    }
    return {
        ...state,
        [newUser.id]: {
            ...state[newUser.id],
            ...newUser,
        },
    };
};

