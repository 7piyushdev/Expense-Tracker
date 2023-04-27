import React from 'react'
import ExpensesForm from '../../components/ExpensesForm'
import ExpensesList from '../../components/ExpensesList'

const HomePage = () => {
    return (
        <>
            <section>
                <ExpensesForm />
            </section>
            <section>
                <ExpensesList />
            </section>
        </>
    )
}

export default HomePage