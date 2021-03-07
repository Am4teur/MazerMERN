import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import logo from '../imgs/maze.png';
import UserContext from '../context/UserContext';
import User from '../objects/User';
import NoAuthBtns from './NoAuthBtns';

import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import { Drawer, AppBar, Toolbar, List, CssBaseline, Typography, Divider, IconButton, 
	ListItem, ListItemIcon, ListItemText, } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import GamesIcon from '@material-ui/icons/Games';


import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const drawerWidth = 210;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
			color: 'white',
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
			backgroundColor: '#007bff', //bg-primary
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(9),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
			backgroundColor: '#007bff', //bg-primary
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: theme.spacing(1, 1.25),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
		list: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'flex-start',
		},
		listItem: {
			color: 'white',
		},
		listItemIcon: {
			color: 'white',
			padding: theme.spacing(0, 0.75),
		},
		authIcon: {
			color: 'white',
			padding: theme.spacing(0, 1.25),
		},
		logo: {
			width: "32px",
			height: "32px",
			marginLeft: '14px',
		},
  }),
);

const Sidebar = () => {
  const history = useHistory();
	const { userData, setUserData } = useContext(UserContext);

	const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(true);

  const handleDrawerSwitch = () => {
		const o = !open;
    setOpen(o);
  };

	const routeHome = () => {
		history.push('/');
	};

	const routeMazer = () => {
		history.push({
			pathname: '/mazer',
			state: {
				mazeId: "5fbac485d8017b593cf11df5"
			}
		});
	};

	const routeLogin = () => {
		history.push('/login');
	};

	const routeRegister = () => {
		history.push('/register');
	};

	const routeLogout = () => {
		setUserData({
			token: "",
			user: new User(),
			loading: false,
		});
		localStorage.setItem("auth-token", "");
		history.push('/')
	};

	const userInfo = () => {
		history.push('/userInfo');
	};

	const routeMazeHome = () => {
		history.push('/mazeHome');
	};

	return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
					<IconButton color="inherit" aria-label="open drawer" className={classes.menuButton} onClick={handleDrawerSwitch}>
						<MenuIcon />
					</IconButton>
					<a href="/">
						<img src={logo} alt="logo" className={classes.logo}/>
					</a>
					<a href="/" style={{textDecoration: 'none', color: 'white', margin: '8px 0 0 4px',}}><h3>Mazer</h3></a>
        </div>
				<Divider />
        <List>
					<ListItem button key={"Home"} className={classes.listItem} onClick={routeHome}>
						<ListItemIcon className={classes.listItemIcon}>{<HomeIcon />}</ListItemIcon>
						<ListItemText primary={"Home"} />
					</ListItem>
					<ListItem button key={"Mazer"} className={classes.listItem} onClick={routeMazeHome}>
						<ListItemIcon className={classes.listItemIcon}>{<GamesIcon />}</ListItemIcon>
						<ListItemText primary={"Mazer"} />
					</ListItem>
        </List>
        <Divider />
				{userData.user.username === "" ?
        <List>
					<ListItem button key={"Login"} className={classes.listItem} onClick={routeLogin}>
						<ListItemIcon className={classes.authIcon}>{<i className="fas fa-sign-in-alt fa-lg"></i>}</ListItemIcon>
						<ListItemText primary={"Login"} />
					</ListItem>
					<ListItem button key={"Register"} className={classes.listItem} onClick={routeRegister}>
						<ListItemIcon className={classes.authIcon}>{<i className="fas fa-user-edit fa-lg"></i>}</ListItemIcon>
						<ListItemText primary={"Register"} />
					</ListItem>
        </List>
				:
				<List>
					<ListItem button key={"Logout"} className={classes.listItem} onClick={routeLogout}>
						<ListItemIcon className={classes.authIcon}>{<i className="fas fa-sign-out-alt fa-lg"></i>}</ListItemIcon>
						<ListItemText primary={"Logout"} />
					</ListItem>
				</List>
				}
      </Drawer>
    </div>
  );
}

export default Sidebar;
