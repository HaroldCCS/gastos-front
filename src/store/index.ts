//@LIBRERIAS
import { ThunkDispatch, UnknownAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import storage from 'redux-persist/lib/storage' // defaults to localStorage


import homeReducer from 'store/home/home.reducer'
import myMoneyHistoryReducer from 'store/personalFinance/myMoneyHistory/myMoneyHistory.reducer'

const rootReducer = combineReducers({
    home: homeReducer,
    'personal_finances': myMoneyHistoryReducer
})

const persistedReducer = persistReducer(
    {
        key: 'root',
        storage,
        whitelist: ['home', 'personal_finances']
    },
    rootReducer
)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, any, UnknownAction>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export const persistor = persistStore(store)

