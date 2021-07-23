import React, {useContext} from 'react'
import useStyles from './styles'
import { ExpenseTrackerContext } from '../../../context/context'
import { 
        List as MUIList, ListItem, ListItemAvatar, ListItemText,
        Avatar, ListItemSecondaryAction, IconButton, Slide 
    } from '@material-ui/core'
import { Delete, MoneyOff } from '@material-ui/icons'

const MyList = () => {
    const { deleteTransaction, transactions } = useContext(ExpenseTrackerContext)
    const classes = useStyles()

    return (
        <MUIList dense={false} className={classes.list}>
            {transactions.map((transaction) => (
                <Slide key={transaction.id} direction='down' in mountOnEnter unmountOnExit>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar className={transaction.type === 'income' ? classes.avatarIncome: classes.avatarExpense}>
                                <MoneyOff />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={transaction.category} secondary={`Rs${transaction.amount} on ${transaction.date}`  } />
                        <ListItemSecondaryAction>
                            <IconButton edge='end' aria-label='delete' onClick={() => deleteTransaction(transaction.id)}>
                                <Delete />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </Slide>
            ))}
        </MUIList>
    )
}

export default MyList
