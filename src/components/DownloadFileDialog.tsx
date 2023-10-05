import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { useState } from "react";

export function DownloadFileDialog({ onClose, url }: { url: string, onClose?: () => void }): JSX.Element {
    const [open, setOpen] = useState(true);

    const fileName = Math.random().toString(36).substring(2) + ".pdf";

    const handleClose = () => {
        URL.revokeObjectURL(url);

        onClose?.();
        setOpen(false);
    }

    const handleDownload = () => {
        const link = document.createElement("a");
        link.download = fileName;
        link.href = url;
        link.click();
    }
    
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                PDF Gerado
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Seu arquivo PDF foi gerado com sucesso com o nome <b>{fileName}</b>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDownload} variant="contained" color="inherit" autoFocus>
                    Baixar PDF
                </Button>
                <Button onClick={handleClose} variant="contained" color="inherit">
                    Sair
                </Button>
            </DialogActions>
        </Dialog>
    )
}