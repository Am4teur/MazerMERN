interface User {
  id: string,
  username: string,
  x: number,
  y: number,
  mazes: mazeType,
}

export interface mazeType {
  [mazeId: string] : any
}

/*export interface mazeType {
  [mazeId: string] : {
    users: any[],
    name: string,
    userCreater: string,
    seed: number,
    length: number,
    width: number,
    createdAt: string,
  }
}*/

class User {
  constructor(id: string="", username: string="", x: number=0, y: number=0, mazes: mazeType={}) {
    this.id = id;
    this.username = username;
    this.x = x;
    this.y = y;
    this.mazes = mazes;
  }
}

export default User;
