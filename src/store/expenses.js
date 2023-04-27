import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    expenses: [],
    activatePremium: false,
    isPremium: false,
    darkMode: false
};

const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        addExpense: (state, action) => {
            state.expenses = action.payload;
        },
        showPremium: (state) => {
            state.activatePremium = true;
        },
        hidePremium: (state) => {
            state.isPremium = false;
            state.activatePremium = false;
            state.darkMode= false
        },
        isPremium: (state) => {
            state.isPremium = true;
            state.darkMode = true
        },
        setMode: (state) => {
            state.darkMode = !state.darkMode
        }
    }
})

export const expenseActions = expenseSlice.actions

export default expenseSlice.reducer

