import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({ open, setOpen, deleteUser }) {

    const handleClose = (e) => {

        if (e.target.textContent === 'Confirm') {
            console.log('should delete user')
            deleteUser()
        }
        setOpen(false);
    };

    return (
    <div>
        
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete this student?"}
            </DialogTitle>
            
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose} autoFocus>
                Confirm
            </Button>
            </DialogActions>
        </Dialog>
    </div>
    );
}
