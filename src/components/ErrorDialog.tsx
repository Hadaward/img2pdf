import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { useState } from "react";

export function ErrorDialog({ title, message, onClose }: { title: string, message: string, onClose?: () => void }): JSX.Element {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        onClose?.();
        setOpen(false);
    }
    
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    )
}