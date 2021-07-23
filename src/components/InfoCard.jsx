import React from 'react'

const isIncome = Math.round(Math.random())
const InfoCard = () => {
    return (
        <div style={{textAlign: 'center', padding: '0 10%'}}>
            Try saying: <br />
            Add {isIncome ? 'Rs 100 ' : 'Rs 50 '}
            for {isIncome ? 'Income ' : 'Expense '}
            in Category {isIncome ? 'Business ': 'Travel '}
            for {isIncome ? 'Monday' : 'Saturday'}
        </div>
    )
}

export default InfoCard
