import React, { useContext } from 'react'
import { Card, CardHeader, CardContent, Grid, Divider, Typography,} from '@material-ui/core'
import useStyles from './styles'
import { ExpenseTrackerContext } from '../../context/context'
import Form from './Form/Form'
import MyList from './List/List'
import InfoCard from '../InfoCard'
 
const Main = () => {
    
    const classes = useStyles()
    const { balance } = useContext(ExpenseTrackerContext)

    return (
        <Card className={classes.root}>
            <CardHeader title='Expense Tracker' subheader='Powered by Speechly' />
            <CardContent>
                <Typography align='center' variant='h5'> Total balance Rs {balance} </Typography>
                <Typography variant='subtitle1' style={{lineHeight: '1.5em', marginTop: '20px'}}>
                    <InfoCard />
                </Typography>
                <Divider className={classes.divider} />

                <Form />

                <CardContent className={classes.cartContent}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <MyList />
                        </Grid>
                    </Grid>
                </CardContent>
            </CardContent>
        </Card>
    )
}

export default Main
