import { createReducer } from '@reduxjs/toolkit'
import { incrementarContador, decrementarContador, restableserContador } from '../actions/contador'

interface ContadorReducer {
    cantidad: number
}

const initialState: ContadorReducer = {
    cantidad: 0
}

const contadorReducer = createReducer<ContadorReducer>(initialState, (builder) => {
    builder.addCase(incrementarContador, (state, action) => {
        state.cantidad++;
    })

    builder.addCase(decrementarContador, (state, action) => {
        state.cantidad--;
    })

    builder.addCase(restableserContador, (state, action) => {
        state.cantidad = 0
    })
})

export default contadorReducer
