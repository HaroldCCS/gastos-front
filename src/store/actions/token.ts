import { createAction } from '@reduxjs/toolkit'

export const setToken = createAction<string>('token/setToken')
export const deleteToken = createAction<null>('token/deleteToken')
