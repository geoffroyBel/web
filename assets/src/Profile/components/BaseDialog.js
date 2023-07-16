import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function BaseDialog({
	setOpen,
	open,
	label,
	text = "Vous etes sur le point de creer votre tarif",
	completion,
}) {
	// const [open, setOpen] = React.useState(true);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'>
				<DialogTitle id='alert-dialog-title'>{label}</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						{text}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Annuler</Button>
					<Button
						variant='contained'
						color='success'
						sx={{
							color: "white",
						}}
						onClick={completion || (() => setOpen(false))}
						autoFocus>
						Continuer
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
