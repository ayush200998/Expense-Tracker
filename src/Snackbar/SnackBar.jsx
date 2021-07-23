import React from 'react'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

const CustomSnackbar = ({ open, setOpen}) => {

    const handleClose = (e, reason) => {
        if(reason === 'clickaway') return 

        setOpen(false)
    }

    return(
        <div>
            <Snackbar 
                anchorOrigin={{vertical:'top', horizontal:'right'}}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <MuiAlert
                    severity='success'
                    onClose={handleClose}
                    elevation={6}
                    variant='filled'
                >
                    Transaction successfully created
                </MuiAlert>
            </Snackbar>
        </div>
    )
}

export default CustomSnackbar