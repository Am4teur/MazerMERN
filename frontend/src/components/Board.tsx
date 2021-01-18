import React, { Component } from 'react';

import CSS from 'csstype';
import Square from './Square';
import User from '../objects/User';
import Icon from './Icon';
import IconComponent from './IconComponent';

import axios from 'axios';

let ENDPOINT = 'http://localhost:5000/'; //'https://mazer-backend.herokuapp.com/';



interface Board {
  rows: number;
  cols: number;
  maze: any;
}

interface BoardState {
  squares: any[]; //matrix of Square
  board: any[][];
  icons: { [id: string] : Icon; };
  seed: number;
  user: User;
}

interface BoardProps {
  socket: any;
  user: User;
  mazeId: string;
  onIconChange(v: string): void;
}


class Board extends Component<BoardProps, BoardState, Board> {
  /********************************************
   * @constructor
   * 
   ********************************************/
  constructor(props: any) {
    super(props);

    this.rows = 1;
    this.cols = 1;

    this.state = {
      squares: [],
      board: [],
      icons: {},
      seed: 0,
      user: props.user
    };
    

    this.keyHandler = this.keyHandler.bind(this);
    this.move = this.move.bind(this);
    this.createSquares = this.createSquares.bind(this);
    this.updateBoardAndSquares = this.updateBoardAndSquares.bind(this);
  }

  componentDidMount() {
    axios.post(ENDPOINT + "mazes/getById", {mazeId: this.props.mazeId})
    .then(maze => {
      this.maze = maze.data;

      this.rows = this.maze.rows;
      this.cols = this.maze.cols;
      this.setState({
        seed: this.maze.seed,
      });

      window.addEventListener("keydown", this.keyHandler);
      this.props.socket.on('move', this.updateBoardAndSquares);
      this.updateBoardAndSquares();
    });
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.keyHandler);
    //this.props.socket.emit('disconnect');
    this.props.socket.off('move', this.updateBoardAndSquares);
  }

  /********************************************
   * @name initMaze
   * @namespace initGroup
   * 
   ********************************************/
  initMaze(mazeSeed: number): any[] {
    /* using the x,y major order (or Column major order) != from memory and C (Row major order) */
    let positions: any[][]= this.initPositions();
    
    /* put this variable set inside of kruskal algorithm method because thats the only place that this variable is used */
    let set: Tree[][] = this.initSet();

    let edges: Edge[] = this.initEdges(positions, mazeSeed);

    let board: any[] = this.kruskalAlgorithm(positions, set, edges);

    return board;
  }

  /********************************************
   * @name initPositions
   * @namespace initGroup
   * 
   ********************************************/
  initPositions(): any[][] {
    let positions: { N: number; E: number; S: number; W: number; }[][] = [];
    for (let i = 0; i < this.rows; ++i) {
      positions.push([]);
      for (let j = 0; j < this.cols; ++j) {
        positions[i].push({ "N": 0, "E": 0, "S": 0, "W": 0 });
      }
    }
    return positions;
  }

  /********************************************
   * @name initSet
   * @namespace initGroup
   * 
   ********************************************/
  initSet(): Tree[][] {
    let set: Tree[][] = [];
    for (var i = 0; i < this.rows; ++i) {
      set.push([]);
      for (var j = 0; j < this.cols; ++j) {
        set[i].push(new Tree());
      }
    }
    return set;
  }

  /********************************************
   * @name initEdges
   * @namespace initGroup
   * 
   ********************************************/
  initEdges(positions: any[], mazeSeed: number): Edge[] {
    let edges: Edge[] = [];
    for (var i = 0; i < positions.length; ++i) {
      for (let j = 0; j < positions[i].length; ++j) {
        if (j > 0) {
          edges.push(new Edge(i, j, "N", i, j-1));
        }
        if (i > 0) {
          edges.push(new Edge(i, j, "W", i-1, j));
        }
      }
    }

    // shuffle with seed 
    edges = shuffle(edges, mazeSeed);
    return edges;
  }

  /********************************************
   * @name kruskalAlgorithm
   * 
   ********************************************/
  kruskalAlgorithm(positions: any[][], set: Tree[][], edges: Edge[]): any[] {
    let x1, y1, x2, y2, set1, set2;
    let opp: { [side: string]: string; } = {"N": "S", "E": "W", "S": "N", "W": "E"};

    for (let i = 0; i < edges.length; ++i) {
      x1 = edges[i].x1;
      y1 = edges[i].y1;
      x2 = edges[i].x2;
      y2 = edges[i].y2;

      set1 = set[x1][y1];
      set2 = set[x2][y2];
      if (!(set1.connected(set2))) {
        set1.connect(set2);
        positions[x1][y1][edges[i].dir] = 1;
        positions[x2][y2][opp[edges[i].dir]] = 1;
      }
    }

    return positions;
  }

  /********************************************
   * @name createSquares
   * 
   ********************************************/
  createSquares(icons: { [id: string] : Icon }): any[][] {
    let squares: any[][] = [];
    let iconsInSquare: Icon[] = [];
    let iconComps: IconComponent[] = [];
    let isEnd: boolean = false;

    let positions: any[] = this.initMaze(this.state.seed);

    let squareStyle: any[][] = this.removeSides(positions);

    for (let i = 0; i < this.rows; i++) {
      squares.push([]);
      for (let j = 0; j < this.cols; j++) {
        for (var key in icons) {
          if (icons[key].x === i && icons[key].y === j) {
            iconsInSquare.push(icons[key]);
          }
        }

        iconComps = [];
        iconsInSquare.forEach(e => {
          iconComps.push(e.component);
        });
        if(i === this.rows-1 && j === this.cols-1) {
          isEnd = true;
        }

        squares[i].push(<Square key={i + ":" + j} style={squareStyle[j][i]} icons={iconComps} isEnd={isEnd}/>);

        iconsInSquare = [];
      }
    }

    return [squares, positions];
  }

  /********************************************
   * @name updateBoardAndSquares
   * 
   ********************************************/
  updateBoardAndSquares() {
    axios.post(ENDPOINT + "mazes/getById", {mazeId: this.props.mazeId})
    .then(maze => {
      let icons: { [id: string] : Icon } = {};
      let users = maze.data.users;

      for (var userId in users) {
        icons[userId.toString()] = new Icon(userId.toString(),
                                            users[userId].x,
                                            users[userId].y,
                                            <IconComponent key={userId.toString()} size={16} iconName={this.state.user.icon}/>);
      }
      
      if(this.state.user.username !== "") {
        this.setState((state) => ({
          squares: this.createSquares(icons)[0],
          board: this.createSquares(icons)[1],
          icons: icons,
        }));
      }
    });
  }

  /********************************************
   * @name removeSides
   * 
   ********************************************/
  removeSides(positions: any[]): any[][] {
    let squareStyles: CSS.Properties[][] = [];

    for (let i = 0; i < this.rows; i++) {
      squareStyles.push([]);
      for (let j = 0; j < this.cols; j++) {

        squareStyles[i].push({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",

          border: "2px solid black",
          background: "#ff9933", // bluedark#1895aa orange#ef9f35 lightblue#63c8cd orangeoriginal#ff9800
          width: "50px",
          height: "50px",
        });

        if (positions[i][j]["N"] === 1) {
          squareStyles[i][j]["borderTop"] = "0px";
        }
        if (positions[i][j]["W"] === 1) {
          squareStyles[i][j]["borderLeft"] = "0px";
        }
        if (positions[i][j]["S"] === 1) {
          squareStyles[i][j]["borderBottom"] = "0px";
        }
        if (positions[i][j]["E"] === 1) {
          squareStyles[i][j]["borderRight"] = "0px";
        }
      }
    }
    
    for (let i = 0; i < this.rows; i++) {
      squareStyles[i][0]["borderTop"] = "4px solid black";
      squareStyles[i][squareStyles[i].length-1]["borderBottom"] = "4px solid black";
    }

    for (let i = 0; i < this.cols; i++) {
      squareStyles[0][i]["borderLeft"] = "4px solid black";
      squareStyles[squareStyles.length-1][i]["borderRight"] = "4px solid black";
    }

    return squareStyles;
  }
  
  /********************************************
   * @name move
   * 
   ********************************************/
  move(type: string) {
    let oppx: { [id: string]: number; } = { "W": 0, "N": -1, "S": 1, "E": 0 };
    let oppy: { [id: string]: number; } = { "W": -1, "N": 0, "S": 0, "E": 1 };
    let newIcons = {...this.state.icons};
    
    let userId = this.state.user.id;
    let mazeId = this.props.mazeId;

    console.log("moved " + type + " | userId: " + userId + " | mazeId: " + mazeId);
    
    console.log(this.state.icons);
    

    if(newIcons[userId]) {
      if (newIcons[userId].x + oppx[type] >= 0 && 
          newIcons[userId].x + oppx[type] < this.rows &&
          this.state.board[newIcons[userId].y][newIcons[userId].x][type] === 1 &&
          newIcons[userId].y + oppy[type] >= 0 && 
          newIcons[userId].y + oppy[type] < this.cols) { // if to test if it is able to move

        newIcons[userId].x = newIcons[userId].x + oppx[type];
        newIcons[userId].y = newIcons[userId].y + oppy[type];
      
        //check if won aka checkWinner()
        if(newIcons[userId].x === this.rows-1 && newIcons[userId].y === this.cols-1) {
          newIcons[userId].x = 0;
          newIcons[userId].y = 0;
          soundWinner();
        }

        const user: {userId:string, mazeId:string, y:number, x:number, option:string} = {
          userId: userId,
          mazeId: mazeId,
          y: newIcons[userId].x,
          x: newIcons[userId].y,
          option: "0",
        }

        //update
        //updateUserPosition();
        axios.post(ENDPOINT + "mazes/addUser", user /* body */)
        .then(response => {
          this.props.socket.emit('move', { userId: userId, mazeId: mazeId });
          //this.props.socket.broadcast.to(<maze_room>).emit('move', { userId: this.state.user.id });

          this.setState((state) => ({
            icons: newIcons,
            squares: this.createSquares(newIcons)[0],
            board: this.createSquares(newIcons)[1],
          }));
        });

        soundMoved();

        //axios.post();
      }
      else {
        soundNotMoved();
      }
    }
  }

  /********************************************
   * @name keyHandler
   * 
   ********************************************/
  keyHandler(e: any): void {
    
    switch (e.keyCode) {
      case 37: //left
      e.preventDefault();
        this.move("W");
        break;
      case 38: //up
      e.preventDefault();
        this.move("N");
        break;
      case 39: //right
      e.preventDefault();
        this.move("E");
        break;
      case 40: //down
      e.preventDefault();
        this.move("S");
        break;
      default:
        //console.log("No function for that key");
        break;
    }
  };

  /********************************************
   * @name render
   * 
   ********************************************/
  render() {
    const boardStyle: CSS.Properties = {
      display: "inline-grid",
      gridTemplateRows: "repeat(" + this.rows + ", 1fr)",
      gridTemplateColumns: "repeat(" + this.cols + ", 1fr)",
    };

    return (
      <div className="board" style={boardStyle}>
        {this.state.squares}
      </div>
    );
  }
}

export default Board;


interface Tree {
  parent: any;
  rootV: any;
}

class Tree {
  constructor() {
      this.parent = null;
      this.rootV = null;
  }

  root() { //this recursion could be improved with "memory" of the root
      if(this.parent == null) {
          return this;
      }
      else
          return this.parent.root();
  }

  connected(tree: Tree) {
      return this.root() === tree.root();
  }

  connect(tree: Tree) {
      tree.root().parent = this.root();
  }
}


interface Edge {
  x1: number;
  y1: number;
  dir: string;
  x2: number;
  y2: number;
}

class Edge {
  constructor(x1: number, y1: number, dir: string, x2: number, y2: number) {
      this.x1 = x1;
      this.y1 = y1;
      this.dir = dir;
      this.x2 = x2;
      this.y2 = y2;
  }
}



/*_____________________ Functions _______________________*/
function shuffle(array: any[], seed: number) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

      // Pick a remaining element…
      i = Math.floor(random(seed) * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
      ++seed;
  }

  return array;
}

function random(seed: number) {
  var x = Math.sin(seed++) * 10000; 
  return x - Math.floor(x);
}



function soundWinner(): void {

}

function soundMoved(): void {
  if(false) {
    playFile('https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/success.mp3');
  }
}

function soundNotMoved(): void {
  if(false) {
    playFile('https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/error.mp3');
  }
}

const context = new window.AudioContext();

function playFile(filepath:string) {
  // see https://jakearchibald.com/2016/sounds-fun/
  fetch(filepath)
    // Read it into memory as an arrayBuffer
    .then(response => response.arrayBuffer())
    // Turn it from mp3/aac/whatever into raw audio data
    .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
      // Now we're ready to play!
      const soundSource = context.createBufferSource();
      soundSource.buffer = audioBuffer;
      soundSource.connect(context.destination);
      soundSource.start();
    });
}