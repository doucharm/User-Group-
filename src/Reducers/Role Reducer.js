export const Update_Role = (state, action) => {
    const newItem = action.payload;
    state = { ...state, ...newItem }

    return state
}