import { Dialog, DialogTitle, DialogContent, Alert, DialogActions, AlertColor } from "@mui/material";
import Button from "@mui/material/Button";

interface AlertDialogProps {
    openDialog: boolean;
    handleDialogClose: () => void;
    alertSeverity: AlertColor | undefined;
    alertMessage: string;
}


export const AlertDialog = ({openDialog, handleDialogClose, alertSeverity, alertMessage}: AlertDialogProps) => {
    return (
        <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Status</DialogTitle>
        <DialogContent>
          <Alert severity={alertSeverity}>{alertMessage}</Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Zamknij</Button>
        </DialogActions>
      </Dialog>
    )
}