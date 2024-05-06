import { createAction } from '@reduxjs/toolkit'

export const incrementarContador = createAction<null>('contador/setContador')
export const decrementarContador = createAction<null>('contador/decrementarContador')
export const restableserContador = createAction<null>('contador/restableserContador')
