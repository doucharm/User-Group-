import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { GroupReducer, RoleReducer, UserReducer,HierarchyReducer, bindGroupActions } from 'Reducers/Reducer Slice';

export const store = configureStore(
    {
        reducer: {
            groups: GroupReducer,
            roles: RoleReducer,
            users: UserReducer,
            hierarchy: HierarchyReducer
        },
        preloadedState: {
            groups: {},
            roles: {},
            users: {},
            hierarchy:{},
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