import React, { useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';
import { useHistory } from "react-router-dom";

import maze_gif from '../imgs/v1_maze.gif';
import avatar from '../imgs/icons/icon-blue-512.png';

import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

import NoAuthBtns from './NoAuthBtns';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    home: {
      display: 'flex',
      height: '100%',
      width: '100%',
    },
    primaryColumn: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: theme.spacing(3),
      width: '75%',
    },
    secondaryColumn: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'center',
      margin: theme.spacing(3, 3, 3, 0),
      width: '25%',
    },
    userInfo: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'start',
      alignItems: 'center',
      width: '100%',
      backgroundColor: '#343a40',
      borderRadius: theme.spacing(0.75),
      marginBottom: theme.spacing(3),
      //rounded shadow
    },
    userInfoText: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      flexGrow: 1,
    },
    note: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      backgroundColor: '#343a40',
      borderRadius: theme.spacing(0.75),
      marginBottom: theme.spacing(3),
      //rounded shadow
    }
  }),
);

const Home = () => {
  const history = useHistory();
  const { userData } = useContext(UserContext);

  const classes = useStyles();
  const theme = useTheme();

	const routeMazeHome = () => {
		history.push('/mazehome');
	};

  /*const routeSolver = () => {}*/

  return (
    <div className={classes.home}>
      <div className={classes.primaryColumn}>
        { userData.user.username !== "" ?
          <div className="greeting">
            <h1>Welcome {userData.user.username}</h1>
          </div>
          : null
        }
        <h1>Can you solve the maze first?</h1>
        <h1>Compete against your friends!</h1>

        <div className="d-flex flex-column align-items-center shadow rounded bg-dark m-2" style={{border: "2px solid black"}}>
          <button className="btn btn-primary m-3" onClick={routeMazeHome}><i className="fas fa-play mr-2"></i> Mazer</button>
          <img className="m-4 " src={maze_gif} alt="Maze Gif" style={{height: "250px", width: "250px", border: "2px solid black", display: "block"}}></img>
        </div>

      </div>
      <div className={classes.secondaryColumn}>
        {userData.user.username !== ""
        ?
        <div className={classes.userInfo}>
          <img className="m-2 mr-3" src={avatar} alt="Avatar" style={{height: "64px", width: "64px", borderRadius: theme.spacing(0.75),}}></img>
          <div className={classes.userInfoText}>
              <Typography noWrap variant="h4">{userData.user.username}</Typography>
              <a className="d-flex" href="/userInfo" style={{ color: 'white', textDecoration: 'none' }}>
                <PersonIcon />
                <Typography>User Info</Typography>
              </a>
          </div>
        </div>
        :
        <div className={classes.note}>
          <Typography className="m-2" variant="h4">Please note</Typography>
          <Typography className="m-2" variant="body1">Register or Login to play Mazer</Typography>
          <div className="mb-2">
            <NoAuthBtns />
          </div>
        </div>
        }
      </div>
    </div>
  );
}

export default Home;