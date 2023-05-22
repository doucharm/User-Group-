import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { GroupReducer, MembershipReducer, RoleReducer, UserReducer, bindGroupActions, UserByNameReducer } from 'Reducers/Reducer Slice';
import { data } from 'Data/data'


export const store = configureStore(
    {
        reducer: {
            groups: GroupReducer,
            roles: RoleReducer,
            users: UserReducer,
            usersByName: UserByNameReducer

        },
        preloadedState: {
            groups: {},
            roles: {},
            users: {},
            usersByName: {
                users: []
            }

        }
    })

export const dispatch = store.dispatch
export const actions = { ...bindGroupActions(dispatch) }

export const AppProvider = (props) => {
    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    )
}