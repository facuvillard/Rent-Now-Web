import React, { useState } from 'react';
import { Typography, Button, Grid, Paper, useMediaQuery, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AlertCustom from '../../../utils/AlertCustom/AlertCustom';
import successImage from '../../../../assets/img/register-success-image.png';

const useStyles = makeStyles((theme) => ({
	divider: {
		borderTop: '2px solid #656b74',
		marginLeft: theme.spacing(4),
		marginRight: theme.spacing(4),
		borderRadius: '1.5px',
	},
	paper: {
		[theme.breakpoints.down('md')]: { height: '80vh' },
		height: '65vh',
		width: '100%',
	},
	title: {
		marginBottom: theme.spacing(3),
		marginTop: theme.spacing(3),
	},
	grid: {
		height: '100%',
	},
	snackbar: {
		[theme.breakpoints.down('xs')]: {
			bottom: 60,
		},
	},
	image: {
		height: '30vh',
		width: '100%',
	},
}));

export const RegisterSuccessComplejo = ({ complejo }) => {
	const classes = useStyles();
	const [alertCustomOpen, setAlertCustomOpen] = useState(true);
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('sm'));
	return (
		<>
			<Paper variant="outlined" className={classes.paper}>
				<Grid container className={classes.grid} spacing={5} justify="center">
					<Grid item xs={12}>
						{matches ? (
							<Typography align="center" variant="h5" className={classes.title}>
								¡Tu complejo <b>{complejo.nombre}</b> fue registrado con éxito!
							</Typography>
						) : (
							<Typography align="center" variant="h6" className={classes.title}>
								¡Tu complejo <b>{complejo.nombre}</b> fue registrado con éxito!
							</Typography>
						)}
						<hr className={classes.divider} />
					</Grid>
					<Grid item xs={12}>
						<img src={successImage} alt="exitoImage" className={classes.image} />
					</Grid>
					<Grid item xs={12}>
						<Typography align="center">
							¡Podrás comenzar a registrar los <b>espacios</b> cuando el complejo esté habilitado!
						</Typography>
					</Grid>
					<Grid item xs={5}>
						{/* <Button fullWidth variant='contained' color='primary'>agregar espacios</Button> */}
						{/* On Click redireccionar a la pagina de registrar espacios */}
					</Grid>
				</Grid>
			</Paper>
			<AlertCustom
				type="warning"
				text="Recuerda que el complejo permanecerá en estado Deshabilitado (por lo que no podrá ser utilizado) hasta que el equipo de RentNow valide y apruebe la solicitud de registro."
				open={alertCustomOpen}
				setOpen={setAlertCustomOpen}
				infinite={true}
				vertical="bottom"
			/>
		</>
	);
};
