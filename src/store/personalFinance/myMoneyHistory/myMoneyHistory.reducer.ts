import { createReducer } from '@reduxjs/toolkit'

import { initial_data, Interface } from './index'
import ACTIONS from './myMoneyHistory.action'


const name_storage = 'my_history_money'
interface IReducer { [name_storage]: Interface[] }

const initialState: IReducer = { [name_storage]: initial_data }

const reducer = createReducer<IReducer>(initialState, (builder) => {

    builder.addCase(ACTIONS.add, (state, action) => {
        state[name_storage].push(action.payload)
    })

})

export default reducer
