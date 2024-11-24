import { createReducer } from '@reduxjs/toolkit'

import { initial_data, Interface } from './index'
import ACTIONS from './credit.action'


const name_storage = 'credit'
interface IReducer { [name_storage]: Interface[] }

const initialState: IReducer = { [name_storage]: initial_data }

const reducer = createReducer<IReducer>(initialState, (builder) => {
    builder.addCase(ACTIONS.addMany, (state, action) => {
        state[name_storage] = action.payload
    })

    builder.addCase(ACTIONS.add, (state, action) => {
        state[name_storage].push(action.payload)
    })

    builder.addCase(ACTIONS.changeStatus, (state, action) => {
        state[name_storage] = state[name_storage].map(h => h._id === action.payload._id ? { ...h, status: action.payload.status } : h)
    })

    builder.addCase(ACTIONS.delete, (state, action) => {
        state[name_storage] = state[name_storage].filter(h => h._id !== action.payload)
    })

    builder.addCase(ACTIONS.update, (state, action) => {
        const data = state[name_storage].filter(h => h._id !== action.payload?._id)
        data.push(action.payload)
        state[name_storage] = data
    })

    builder.addCase(ACTIONS.delete_all, (state, action) => {
        state[name_storage] = []
    })
})

export default reducer
