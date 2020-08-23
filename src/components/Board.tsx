import React, { Component } from 'react';
import Square from './Square';
import '../App.css';
import Icon from './Icon'
import axios from 'axios';

import io from 'socket.io-client';
const queryString = require('query-string');

let socket: any;
let ENDPOINT = 'localhost:5000';


interface Board {
  rows: number;
  cols: number;
}

interface BoardState {
  squares: any[]; //matrix of Square
  board: any[][];
  icons: { [id: string] : Icon; };
  iconId: string;
  seed: number;
}


class Board extends Component<Board, BoardState, {}> {

  /********************************************
   * @constructor
   * 
   ********************************************/
  constructor(props: any) {
    super(props);

    this.rows = 10;
    this.cols = 10;

    this.state = {
      squares: [],
      board: [],
      icons: {},
      iconId: '',
      seed: 0,
    };

    this.keyHandler = this.keyHandler.bind(this);
    this.move = this.move.bind(this);
    this.createSquares = this.createSquares.bind(this);
    document.body.addEventListener("keydown", this.keyHandler);
  }

  updateBoardAndSquares() {
    axios.get('http://localhost:5000/users/')
    .then(response => {
      if(response.data.length > 0) {
        let icons: { [id: string] : Icon } = {};
        let users = response.data;
        const { username } = queryString.parse(window.location.search);
        for(let i = 0; i < users.length; i++) {
          icons[users[i]._id.toString()] = new Icon(users[i]._id.toString(), users[i].y, users[i].x); //TODO cannot create Icons everytime, maybe put object Icon on MongoDB
        }

        let id: string = "";
        users.forEach((element: any) => {
          if(element.username === username) {
            id = element._id;
          }
        });
        
        if(username !== "") {
          this.setState((state) => ({
            squares: this.createSquares(this.rows, this.cols, state.seed, icons)[0],
            board: this.createSquares(this.rows, this.cols, state.seed, icons)[1],
            icons: icons,
            iconId: id,
          }));
        }
        
      }
    });
  }

  componentDidMount() {
    socket = io(ENDPOINT);
    this.updateBoardAndSquares();
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  componentWillUnmount() {
    socket.on('move', (userId: string) => {
      console.log(userId);
      this.updateBoardAndSquares();
    });
  }

  /********************************************
   * @name initMaze
   * @namespace initGroup
   * 
   ********************************************/
  initMaze(rows: number, cols: number, mazeSeed: number): any[] {
    /* using the x,y major order (or Column major order) != from memory and C (Row major order) */
    let positions: any[][]= this.initPositions(rows, cols);
    
    /* put this variable set inside of kruskal algorithm method because thats the only place that this variable is used */
    let set: Tree[][] = this.initSet(rows, cols);

    let edges: Edge[] = this.initEdges(positions, mazeSeed);

    let board: any[] = this.kruskalAlgorithm(positions, set, edges);

    return board;
  }

  /********************************************
   * @name initPositions
   * @namespace initGroup
   * 
   ********************************************/
  initPositions(rows: number, cols: number): any[][] {
    let positions: { N: number; E: number; S: number; W: number; }[][] = [];
    for (let i = 0; i < rows; ++i) {
      positions.push([]);
      for (let j = 0; j < cols; ++j) {
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
  initSet(rows: number, cols: number): Tree[][] {
    let set: Tree[][] = [];
    for (var i = 0; i < rows; ++i) {
      set.push([]);
      for (var j = 0; j < cols; ++j) {
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
  createSquares(rows: number, cols: number, seed: number, icons: { [id: string] : Icon }): any[][] {
    let squares: any[][] = [];
    let iconsInSquare: Icon[] = [];

    let positions: any[] = this.initMaze(rows, cols, seed);

    let squareStyle: any[][] = this.removeSide(rows, cols, positions);

    for (let i = 0; i < rows; i++) {
      squares.push([]);
      for (let j = 0; j < cols; j++) {
        for (var key in icons) {
          // check if the property/key is defined in the object itself, not in parent
          if (icons.hasOwnProperty(key) && icons[key].x === i && icons[key].y === j) {           
            iconsInSquare.push(icons[key]);
          }
        }

        squares[i].push(<Square
          key={i + ":" + j}
          style={squareStyle[j][i]}
          icons={iconsInSquare} />);

        iconsInSquare = [];
      }
    }

    return [squares, positions];
  }

  /********************************************
   * @name removeSide
   * 
   ********************************************/
  removeSide(rows: number, cols: number, positions: any[]): any[][] {
    let squareStyles: any[][] = [];

    for (let i = 0; i < positions.length; i++) {
      squareStyles.push([]);
      for (let j = 0; j < positions[i].length; j++) {
        squareStyles[i].push({
          border: "2px solid black",
          background: "#61dafb",
          width: "50px",
          height: "50px",
    
          lineHeight: "40px",
          color: "black",
          fontWeight: "bold",
          fontSize: "3em",
          textAlign: "center",
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
      squareStyles[i][rows-1]["borderBottom"] = "4px solid black";
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
    
    if(newIcons[this.state.iconId]) {
      if (newIcons[this.state.iconId].x + oppx[type] >= 0 && 
          newIcons[this.state.iconId].x + oppx[type] < this.state.board[0].length &&
          this.state.board[newIcons[this.state.iconId].y][newIcons[this.state.iconId].x][type] === 1 &&
          newIcons[this.state.iconId].y + oppy[type] >= 0 && 
          newIcons[this.state.iconId].y + oppy[type] < this.state.board[0].length) {

        newIcons[this.state.iconId].x = newIcons[this.state.iconId].x + oppx[type];
        newIcons[this.state.iconId].y = newIcons[this.state.iconId].y + oppy[type];
      }

      const user = {
        y: newIcons[this.state.iconId].x,
        x: newIcons[this.state.iconId].y,
      }

      //update
      axios.post('http://localhost:5000/users/update/' + newIcons[this.state.iconId].id, user);
      socket.emit('move', { userId: this.state.iconId });

      this.setState((state) => ({
        squares: this.createSquares(this.rows, this.cols, state.seed, newIcons)[0],
        board: this.createSquares(this.rows, this.cols, state.seed, newIcons)[1],
        icons: newIcons,
      }));
    }
  }

  /********************************************
   * @name keyHandler
   * 
   ********************************************/
  keyHandler(e: any): void {
    switch (e.keyCode) {
      case 37: //left
        this.move("W");
        break;
      case 38: //up
        this.move("N");
        break;
      case 39: //right
        this.move("E");
        break;
      case 40: //down
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
    const boardStyle: any = {
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
