import { createReducer } from '@reduxjs/toolkit'
import { setToken, deleteToken } from '../actions/token'

interface TokenReducer {
    token: string
}

const initialState: TokenReducer = {
    token: ''
}

const tokenReducer = createReducer<TokenReducer>(initialState, (builder) => {
    builder.addCase(setToken, (state, action) => {
        state.token = action.payload
    })

    builder.addCase(deleteToken, (state, action) => {
        state.token = ''
    })
})

export default tokenReducer
