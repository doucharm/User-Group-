import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { GroupReducer,RoleReducer,UserReducer,bindGroupActions } from 'Reducers/Reducer Slice'; 


export const store = configureStore(
    { 
        reducer: {
            groups: GroupReducer,
            roles: RoleReducer,
            users: UserReducer
            
        }, 
        preloadedState: {
            groups: {},
            roles: {},
            users: {}
            
        }
})

export const dispatch=store.dispatch
export const actions={...bindGroupActions(dispatch)}

export const AppProvider = (props) => {
    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    )
}