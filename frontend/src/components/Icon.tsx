interface Icon {
  id: string;
  x: number;
  y: number;
}

class Icon {
  constructor(id: string, x: number, y: number) {
    this.id = id;
    this.x = x;
    this.y = y;
  }
}

export default Icon;