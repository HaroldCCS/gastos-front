import { createReducer } from '@reduxjs/toolkit'

import { initial_data, Interface } from './index'
import ACTIONS from './home.action'

const name_storage = 'homes'
interface IReducer { [name_storage]: Interface[] }

const initialState: IReducer = { [name_storage]: initial_data }

const homeReducer = createReducer<IReducer>(initialState, (builder) => {
    builder.addCase(ACTIONS.add, (state, action) => {
        state.homes.push(action.payload)
    })

    builder.addCase(ACTIONS.delete_all, (state, action) => {
        state.homes = []
    })
})

export default homeReducer
