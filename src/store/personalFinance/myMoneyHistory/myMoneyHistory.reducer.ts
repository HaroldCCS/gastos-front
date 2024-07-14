import { createReducer } from '@reduxjs/toolkit'

import { initial_data, Interface } from './index'
import ACTIONS from './myMoneyHistory.action'


const name_storage = 'my_money_history'
interface IReducer { [name_storage]: Interface[] }

const initialState: IReducer = { [name_storage]: initial_data }

const reducer = createReducer<IReducer>(initialState, (builder) => {

    builder.addCase(ACTIONS.add, (state, action) => {
        state[name_storage].push(action.payload)
    })

    builder.addCase(ACTIONS.changeStatus, (state, action) => {
        state[name_storage] = state[name_storage].map(h => h._id === action.payload._id ? { ...h, status: action.payload.status } : h)
    })

    builder.addCase(ACTIONS.delete, (state, action) => {
        state[name_storage] = state[name_storage].filter(h => h._id !== action.payload._id)
    })
})

export default reducer
