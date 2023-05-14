export const Update_Membership =(state,action) =>
{
    const newItem = action.payload;
    state = {...state, ...newItem}
    
    return state
}