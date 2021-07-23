import React, { useState, useContext, useEffect } from 'react'
import { Grid, Typography, TextField, Button, InputLabel, FormControl, Select, MenuItem } from '@material-ui/core'
import useStyles from './style'
import { ExpenseTrackerContext } from '../../../context/context'
import { useSpeechContext } from '@speechly/react-client'
import { v4 as uuidv4 } from 'uuid'
import { incomeCategories, expenseCategories } from '../../../constants/category'
import formatDate from '../../../utils/formateDate'
import CustomSnackbar from '../../../Snackbar/SnackBar'

const Form = () => {
    const { addTransaction } = useContext(ExpenseTrackerContext)
    const classes = useStyles()
    const initialState = {
        amount: '',
        type: '',
        category: '',
        date: formatDate(new Date()),
    }
    const [formData, setFormData] = useState(initialState)
    const selectedCategory = formData.type === 'income' ? incomeCategories: expenseCategories
    const { segment } = useSpeechContext()
    const [open, setOpen] = useState(false)

    const createTransaction = () => {
        const transaction = { ...formData, amount: Number(formData.amount), id: uuidv4()}
        
        if(Number(formData.amount) !== 0 ){
            setOpen(true)
            addTransaction(transaction)
            setFormData(initialState)
        }
        
    }

    useEffect(() => {
        if(segment){
            if(segment.intent.intent === 'add_expense'){
                setFormData({...formatDate, type: 'expense'})
            }else if (segment.intent.intent === 'add_income'){
                setFormData({...formatDate, type: 'income'})
            }else if(segment.isFinal && segment.intent.intent === 'create_transaction'){
                return createTransaction()
            }else if (segment.isFinal && segment.intent.intent === 'cancel_transaction'){
                return setFormData(initialState)
            }

            segment.entities.map((e) => {
                const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`
                switch(e.type){
                    case 'amount':
                        setFormData({ ...formData, amount: e.value})
                        break

                    case 'category':
                        if(incomeCategories.map(iC => iC.type).includes(category)){
                            setFormData({ ...formData, type:'income', category})
                        }else if(expenseCategories.map(eC => eC.type).includes(category)){
                            setFormData({ ...formData, type:'expense', category})
                        }
                        break

                    case 'date':
                        setFormData({ ...formData, date: e.value})
                        break
                    default:
                        break
                }
            })

            if(segment.isFinal && formData.amount !== NaN && formData.category && formData.type && formData.date){
                createTransaction()
            }
        }
    },[segment])

    return (
        <Grid container spacing={2}>
            <CustomSnackbar open={open} setOpen={setOpen} />
            <Grid item xs={12}>
                <Typography align='center' variant='subtitle2' gutterBottom>
                    {segment ?(
                        <>
                            {segment.words.map((w) => w.value).join(' ')}
                        </>
                    ) : null}
                </Typography>
            </Grid>

            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                        <MenuItem value='income'>Income</MenuItem>
                        <MenuItem value='expense'>Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                        {selectedCategory.map((selected) => (
                            <MenuItem key={selected.type} value={selected.type}>{selected.type}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={6}>
                <TextField value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} type='number' label='Amount' fullWidth/>
            </Grid>

            <Grid item xs={6}>
                <TextField value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} type='date' label='Date' fullWidth/>
            </Grid>

            <Button onClick={() => createTransaction()} className={classes.button} variant='outlined' color='primary' fullWidth>
                Create
            </Button>
        </Grid>
    )
}

export default Form
