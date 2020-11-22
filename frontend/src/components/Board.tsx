import React, { Component } from 'react';
import Square from './Square';
import User from '../objects/User';
import '../App.css';
import CSS from 'csstype';
import Icon from './Icon';
import IconComponent from './IconComponent';
import axios from 'axios';

let ENDPOINT = 'http://localhost:5000/'; //'https://mazer-backend.herokuapp.com/';
let iconNm = "blue-simple-icon";



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

    /*for(let i=0; i < this.props.user.mazes.length; i++) {
      if(this.props.user.mazes[0] === this.props.mazeId) {            
        //this.maze = this.props.user.mazes[i];
      }
    }*/
    this.maze = this.props.user.mazes[this.props.mazeId];
    
    this.rows = this.maze.rows;
    this.cols = this.maze.cols;

    this.state = {
      squares: [],
      board: [],
      icons: {},
      seed: this.maze.seed,
      user: this.props.user
    };

    //console.log(this.maze.users);
    

    this.keyHandler = this.keyHandler.bind(this);
    this.move = this.move.bind(this);
    this.createSquares = this.createSquares.bind(this);
    this.updateBoardAndSquares = this.updateBoardAndSquares.bind(this);
    document.body.addEventListener("keydown", this.keyHandler);
  }

  componentDidMount() {
    this.props.socket.on('move', this.updateBoardAndSquares);
    this.updateBoardAndSquares();
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

    let squareStyle: any[][] = this.removeSide(positions);

    for (let i = 0; i < this.rows; i++) {
      squares.push([]);
      for (let j = 0; j < this.cols; j++) {
        for (var key in icons) {
          // check if the property/key is defined in the object itself, not in parent
          //icons.hasOwnProperty(key) &&
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
    let icons: { [id: string] : Icon } = {};
    let users = this.maze.users;

    //id     -> [0]
    //x      -> [1]
    //y      -> [2]
    //option -> [3]
    for(let i = 0; i < users.length; i++) {
      icons[users[i][0].toString()] = new Icon(users[i][0].toString(),
                                                users[i][1],
                                                users[i][2],
                                                <IconComponent key={users[i][0].toString()} size={16} iconName={iconNm}/>);
    }
    
    if(this.state.user.username !== "") {
      this.setState((state) => ({
        squares: this.createSquares(icons)[0],
        board: this.createSquares(icons)[1],
        icons: icons,
      }));
    }
  }

  /********************************************
   * @name removeSide
   * 
   ********************************************/
  removeSide(positions: any[]): any[][] {
    let squareStyles: CSS.Properties[][] = [];

    for (let i = 0; i < positions.length; i++) {
      squareStyles.push([]);
      for (let j = 0; j < positions[i].length; j++) {

        squareStyles[i].push({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",

          border: "2px solid black",
          background: "#61dafb",
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

    for (let i = 0; i < positions.length; i++) {
      squareStyles[i][0]["borderTop"] = "4px solid black";
      squareStyles[0][i]["borderLeft"] = "4px solid black";
      squareStyles[i][squareStyles[i].length-1]["borderBottom"] = "4px solid black";
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
    console.log(newIcons);
    
    console.log("moved | id: " + this.state.user.id);
    
    
    if(newIcons[this.state.user.id]) {
      if (newIcons[this.state.user.id].x + oppx[type] >= 0 && 
          newIcons[this.state.user.id].x + oppx[type] < this.rows &&
          this.state.board[newIcons[this.state.user.id].y][newIcons[this.state.user.id].x][type] === 1 &&
          newIcons[this.state.user.id].y + oppy[type] >= 0 && 
          newIcons[this.state.user.id].y + oppy[type] < this.cols) { // if to test if it is able to move

            
        newIcons[this.state.user.id].x = newIcons[this.state.user.id].x + oppx[type];
        newIcons[this.state.user.id].y = newIcons[this.state.user.id].y + oppy[type];
      
        //check if won aka checkWinner()
        if(newIcons[this.state.user.id].x === this.rows-1 && newIcons[this.state.user.id].y === this.cols-1) {
          newIcons[this.state.user.id].x = 0;
          newIcons[this.state.user.id].y = 0;
        }

        const user: {userId:string, mazeId:string, y:number, x:number, option:string} = {
          userId: this.state.user.id,
          mazeId: this.maze._id,
          y: newIcons[this.state.user.id].x,
          x: newIcons[this.state.user.id].y,
          option: "0",
        }

        //updating this.maze here instead of calling for db
        console.log(this.maze.users);
        
        for(let i=0; i < this.maze.users.length; i++) {
          if(this.maze.users[i][0] === this.state.user.id) {            
            this.maze.users[i][1]=newIcons[this.state.user.id].x;
            this.maze.users[i][2]=newIcons[this.state.user.id].y;
          }
        }

        //update
        axios.post(ENDPOINT + "mazes/updateCoord", user /* body */)
          .then(response => {
            this.props.socket.emit('move', { userId: this.state.user.id });
            //this.props.socket.broadcast.to(<maze_room>).emit('move', { userId: this.state.user.id });

            this.setState((state) => ({
              icons: newIcons,
              squares: this.createSquares(newIcons)[0],
              board: this.createSquares(newIcons)[1],
            }));
          });
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
