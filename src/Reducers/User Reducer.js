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
