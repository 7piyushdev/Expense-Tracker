import React from "react";

const ExpenseContext = React.createContext({
    expenses: [],
    addExpense: (item) => { },
    getExpense: () => { },
    deleteExpense: (id) => { },
    edit: (id) => { },
    state: {},
    setState: () => { }
})

export default ExpenseContext;