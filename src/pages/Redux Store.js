import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { GroupReducer, RoleReducer, UserReducer,HierarchyReducer, bindGroupActions } from 'Reducers/Reducer Slice';
/*Store configure with 4 slices
*group: holding most of the data
*roles: roles list from roletypePage to handle role selections
*users: individual user's data
*hierarchy: Full hierarchy list of the system
*/
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