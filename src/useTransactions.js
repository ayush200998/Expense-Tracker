import { useContext } from 'react'
import { ExpenseTrackerContext } from './context/context'
import { incomeCategories, expenseCategories, resetCategories } from './constants/category'

const useTransactions = (title) =>{
    resetCategories()
    const { transactions } = useContext(ExpenseTrackerContext)
    const transactionPerType = transactions.filter((t) => t.type === title)
    const total = transactionPerType.reduce((acc, currVal) => acc += currVal.amount, 0)
    const categories = title === 'income' ? incomeCategories : expenseCategories

    transactionPerType.forEach((t) => {
        const category = categories.find((c) => c.type === t.category)

        if(category) category.amount += t.amount
    })

    const filterCategories = categories.filter((c) => c.amount > 0)

    const charData = {
        datasets: [{
            data: filterCategories.map(c => c.amount),
            backgroundColor: filterCategories.map(c => c.color)
        }] ,
        labels: filterCategories.map(c => c.type)
    }

    return { charData, total }
}

export default useTransactions