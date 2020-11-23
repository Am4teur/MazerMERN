interface User {
  id: string,
  username: string,
}

class User {
  constructor(id: string="", username: string="") {
    this.id = id;
    this.username = username;
  }
}

export default User;
