import React from 'react'
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core'
import { Doughnut } from 'react-chartjs-2'
import useTransactions from '../../useTransactions'
import useStyles from './styles'

const Details = ({ title }) => {
    const classes = useStyles()
    const { charData, total } = useTransactions(title)

    return (
        <Card className={ title === 'INCOME' ? classes.income : classes.expense}>
            <CardHeader title={title}/>
            <CardContent>
                <Typography varient='h5'>
                    Rs {total}
                </Typography>
                <Doughnut data={charData} />
            </CardContent>
        </Card>
    )
}

export default Details
