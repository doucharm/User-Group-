import { act } from "react-dom/test-utils"

export const Update_User = (state, action) => {
    const newUser = action.payload
    const oldUser = state[newUser.id]
    state[newUser.id] = { ...oldUser, ...newUser }
    return state
}

