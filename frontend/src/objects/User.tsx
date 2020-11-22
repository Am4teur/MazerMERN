interface User {
  id: string,
  username: string,
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
  constructor(id: string="", username: string="", mazes: mazeType={}) {
    this.id = id;
    this.username = username;
    this.mazes = mazes;
  }
}

export default User;
