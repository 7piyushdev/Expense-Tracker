import { configureStore } from '@reduxjs/toolkit'
import expenseReducer from './expenses';
import authReducer from './auth'

const store = configureStore({
    reducer: {
        expenses: expenseReducer,
        auth: authReducer
    }
});

export default store;