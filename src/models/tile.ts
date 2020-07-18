export class TileModel {
  x: number;
  y: number;
  state: "OPEN" | "CLOSE" = "CLOSE";
  flagged: boolean = false;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  open() {
    this.state = "OPEN";
  }
}
