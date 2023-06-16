// Update the state of roles in store, in our project's case is pushing all of the roles from sever to the store for roles
export const Update_Role = (state, action) => {
    const newItem = action.payload;
    state = { ...state, ...newItem }

    return state
}