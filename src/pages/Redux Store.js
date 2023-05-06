import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { GroupReducer,bindGroupActions } from 'Reducers/Reducer Slice'; 
import {data} from 'Data/data'
export const store = configureStore(
    { 
        reducer: {
            groups: GroupReducer
        }, 
        preloadedState: {
            groups: {}
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