interface User {
  id: string,
  username: string,
  x: number,
  y: number
}

class User {
  constructor(id: string, username: string, x: number, y: number) {
    this.id = id;
    this.username = username;
    this.x = x;
    this.y = y;
  }
}

export default User;