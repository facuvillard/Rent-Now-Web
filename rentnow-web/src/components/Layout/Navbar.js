import { Chip, Divider, Grid, Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Badge from '@material-ui/core/Badge';
import IconButton from "@material-ui/core/IconButton";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone";
import HelpIcon from '@material-ui/icons/Help';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from '@material-ui/icons/Notifications';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import { setNotificationAsReaded } from 'api/usuarios'
import { AuthContext } from "Auth/Auth";
import clsx from "clsx";
import { ComplejoContext } from 'components/App/Context/ComplejoContext'
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { signOut } from "../../api/auth";
import logoHorizontal from "../../assets/img/logos/rentnow-letra.png";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},

	navBar: {
		zIndex: theme.zIndex.drawer,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	menuButtonSBClosed: {
		marginLeft: theme.spacing(4),
		[theme.breakpoints.down("xs")]: {
			marginLeft: theme.spacing(0.2),
		},
	},
	menuButtonSBOpen: {
		marginLeft: theme.spacing(28),
	},
	hidden: {display: "none"},
	title: {
		flexGrow: 1,
	},
	icon: {
		flexGrow: 0,
	},
	navBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	link: {
		color: "white",
		textDecoration: "none",
	},
	logo: {
		maxWidth: 170,
		marginTop: 10,
	},
	container: {
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1),
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1),
	},
}));

function Navbar(props) {
	const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
	const classes = useStyles();
	let currentComplejo = useContext(ComplejoContext)
	let {currentUser, notificaciones} = useContext(AuthContext)

	const openNots = Boolean(notificationsAnchorEl);

	useEffect(() => {
		console.log(notificaciones);
	}, [notificaciones])


	const handleNotClick = (not) => {
		setNotificationAsReaded(currentUser.uid, not.id);
		window.location.href = `/app/complejos/${not.complejo.id}/reservas/pendientes`
	};

	const handleOpenNots = (event) => {
		setNotificationsAnchorEl(event.currentTarget)
	};

	const handleCloseNots = (event) => {
		setNotificationsAnchorEl(null)
	};

	const handleLogout = async () => {
		await signOut();
		props.history.push("/login")
	}

	return (
		<AppBar
			position="fixed"
			color="primary"
			className={clsx(classes.navBar, {
				[classes.navBarShift]: false,
			})}
		>
			<Toolbar>
				{!props.withoutSidebar ? (
					<>
						<IconButton
							edge="start"
							onClick={props.sideBarOpenHandler}
							className={clsx(classes.menuButtonSBClosed, {
								[classes.menuButtonSBOpen]: props.isSideBarOpen,
							})}
							color="inherit"
							aria-label="menu"
						>
							{props.isSideBarOpen ? <ChevronLeftIcon/> : <MenuIcon/>}
						</IconButton>
						<Typography align="center" className={classes.title}/>
					</>
				) : (
					<Typography align="left" className={classes.title}>
						<img src={logoHorizontal} alt="logo" className={classes.logo}/>
					</Typography>
				)}
				{currentComplejo ? (
					<Grid
						container
						direction="column"
						justify="center"
						alignItems="center"
					>
						<Chip
							variant="outlined"
							icon={<HomeIcon/>}
							label={currentComplejo.nombre.toUpperCase()}
							color="secondary"
						/>
					</Grid>
				) : (null)}
				<Link to="/app/ayuda" className={classes.link}>
					<IconButton>
						<HelpIcon/>
					</IconButton>
				</Link>

				<IconButton onClick={handleOpenNots}>
					<Badge color="secondary" badgeContent={notificaciones.filter(not => not.leida === false).length}>
						<NotificationsIcon/>
					</Badge>
				</IconButton>


				<Popover
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
					open={openNots}
					onClose={handleCloseNots}
					anchorEl={notificationsAnchorEl}
					marginThreshold={2}
				>
					<Grid
						container
						direction="column"
						justify="center"
						alignItems="center"
						className={classes.container}
					>
						<Typography variant='h6'>NOTIFICACIONES</Typography>
					</Grid>
					<Divider className={classes.divider} variant='fullWidth'/>
					<List dense={true}>
						{notificaciones.map((not, i) =>
							<ListItem button onClick={() => {
								handleNotClick(not)
							}} selected={not.leida === false ? true : false}>
								<ListItemText
									primary={<Typography> {not.mensaje} en <b>{not.complejo.nombre}</b></Typography>}
									secondary={`${not.espacio} → ${moment().format("DD/MM h:mm")} - ${moment().format("h:mm")}`}
								/>
								{not.leida === false ? <PriorityHighIcon color="primary"/> : null}
							</ListItem>
						)
						}
					</List>
				</Popover>

				<Link className={classes.link}>
					<IconButton onClick={handleLogout}>
						<ExitToAppTwoToneIcon/>
					</IconButton>
				</Link>
			</Toolbar>
		</AppBar>
	);
}

export default withRouter(Navbar);
