import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import { useHistory } from "react-router-dom";

import maze_gif from '../imgs/v1_maze.gif';
//import maze_logo from '../imgs/maze.png';

import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';

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
      backgroundColor: 'blue',
    },
    secondaryColumn: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'center',
      margin: theme.spacing(3, 3, 3, 0),
      width: '25%',
      backgroundColor: 'green',
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
      justifyContent: 'center',
      alignItems: 'center',
      flexGrow: 1,
    },
  }),
);

const Home = () => {
  const history = useHistory();
  const { userData } = useContext(UserContext);

  const classes = useStyles();
  const theme = useTheme();

	const routeMazeHome = () => {
		history.push('/mazehome');
	}

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

        {/*<div className="col mx-2" style={{border: "2px solid black"}}>
          <div className="my-2 text-center">
            <button className="btn btn-primary" onClick={routeSolver}><img className="mr-2" style={{height: "20px", width: "20px", marginTop: "-2px"}} src={maze_logo}></img> Solver</button>
          </div>
          <h1 className="my-4">Available soon!</h1>
        </div>*/}
      </div>
      <div className={classes.secondaryColumn}>
        <div className={classes.userInfo}>
          <img className="m-2" src={maze_gif} alt="Maze Gif" style={{height: "50px", width: "50px", border: "2px solid black"}}></img>
          <div className={classes.userInfoText}>
            <span>text</span>
            <span>text</span>
            <span>text</span>
          </div>
        </div>
        <div className={classes.userInfo}>
          <img className="m-2" src={maze_gif} alt="Maze Gif" style={{height: "50px", width: "50px", border: "2px solid black"}}></img>
          <div className={classes.userInfoText}>
            <span>text</span>
            <span>text</span>
            <span>text</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;