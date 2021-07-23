// A Reducer is a function which takes 2 arguement (old state, action) and returns a new state.
// old state - Previous value of the state.
// action - Actions to be Performed on the state.

const contextReducer = (state, action) => {
    let transactions
    switch(action.type){
        case 'ADD_TRANSACTION':
            transactions = [action.payload, ...state]
            localStorage.setItem('transactions', JSON.stringify(transactions))

            return transactions

        case 'DELETE_TRANSACTION':
            transactions = state.filter((t) => t.id !== action.payload )
            localStorage.setItem('transactions', JSON.stringify(transactions))
            
            return transactions

        default:
            return state
    }
}

export default contextReducer