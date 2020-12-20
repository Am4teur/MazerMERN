interface User {
  id: string,
  username: string,
  icon: string,
}

class User {
  constructor(id: string="", username: string="", icon: string="") {
    this.id = id;
    this.username = username;
    this.icon = icon
  }
}

export default User;
