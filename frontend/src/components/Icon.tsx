interface Icon {
  id: string;
  x: number;
  y: number;
  component: any;
}

class Icon {
  constructor(id: string, x: number, y: number, component: any) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.component = component;
  }
}

export default Icon;