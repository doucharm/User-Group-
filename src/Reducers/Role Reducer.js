/**
 * Update the state of roles in store, in our project's case is pushing all of the roles from sever to the store for roles
 * @param {*} state Store for roles
 * @param {*} action The payload needed to modify the state
 * @returns state
 */
export const Update_Role = (state, action) => {
    const newItem = action.payload;
    state = { ...state, ...newItem }

    return state
}