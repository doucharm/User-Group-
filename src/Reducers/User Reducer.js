// This reducer helps to update an user into store after fetching it from the sever.
// Afterward, we can easily call the user that holds the user id from the store
export const Update_User = (state, action) => {
    const newUser = action.payload;
    return {
        ...state,
        [newUser.id]: {
            ...state[newUser.id],
            ...newUser,
        },
    };
};
