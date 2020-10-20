import { TileModel } from "./tile";
import { BombTileModel } from "./bombTile";
import { ValueTileModel } from "./valueTile";

export enum Status {
  PROGRESS,
  WIN,
  LOST,
  Stop,
}

export class BoardModel {
  public readonly size: number;
  public readonly bombs: number;
  public status: Status;
  public tiles: Array<Array<TileModel>>;

  // count up for every tile that get opened
  public counter: number = 0;

  constructor(size: number, bombs: number) {
    this.size = size;
    this.bombs = bombs;
    this.status = Status.Stop;
    this.tiles = Array<Array<TileModel>>();
  }

  public get flags() {
    return this.tiles.reduce((count, row) => count + row.reduce((count, row) => row.flagged ? count + 1 : count, 0), 0);
  }

  public generate() {
    // generate board
    this.tiles = Array(this.size)
      .fill(null)
      .map(() => Array(this.size).fill(null));

    // place bomb tiles
    let bombCounter = 0;
    while (bombCounter < this.bombs) {
      const x = Math.round(Math.random() * (this.size - 1));
      const y = Math.round(Math.random() * (this.size - 1));

      if (!(this.tiles[y][x] instanceof BombTileModel)) {
        this.tiles[y][x] = new BombTileModel(x, y);
        bombCounter += 1;
      }
    }

    // place value tiles
    for (let y = 0; y < this.tiles.length; y++) {
      for (let x = 0; x < this.tiles[y].length; x++) {
        let tile = this.tiles[y][x];

        if (!(tile instanceof BombTileModel)) {
          const value = this.getNeighbourBombsCount(x, y);
          this.tiles[y][x] = new ValueTileModel(x, y, value);
        }
      }
    }

    this.status = Status.PROGRESS;
  }

  public open(x: number, y: number) {
    let tile = this.tiles[y][x];
    if (tile.flagged === true) return;

    // open tile
    if (tile.state === "OPEN") return;

    tile.open();
    this.counter += 1

    // Check is game is lost
    if (tile instanceof ValueTileModel) {
      if (tile.value === 0) {
        this.openNeightbours(x, y);
      }
    } else if (tile instanceof BombTileModel) {
      this.openAll()
      this.status = Status.LOST
    }

    // Check if game is win
    if (this.counter === this.size * this.size - this.bombs) {
      this.status = Status.WIN;
    }
  }

  public flag(x: number, y: number) {
    if (isNaN(x) || isNaN(y)) return;

    if (this.tiles[y][x].state === "CLOSE") {
      this.tiles[y][x].flagged = !this.tiles[y][x].flagged;
    }
  }

  public openAll() {
    for (let row = 0; row < this.tiles.length; row++) {
      for (let column = 0; column < this.tiles[row].length; column++) {
        this.open(column, row)
      }
    }
  }

  private openNeightbours(x: number, y: number) {
    // top left
    if (y !== 0 && x !== 0) {
      this.open(x - 1, y - 1);
    }
    // top
    if (y !== 0) {
      this.open(x, y - 1);
    }
    // top right
    if (y !== 0 && x !== this.tiles[y].length - 1) {
      this.open(x + 1, y - 1);
    }
    // right
    if (x !== this.tiles[y].length - 1) {
      this.open(x + 1, y);
    }
    // bottom right
    if (y !== this.tiles.length - 1 && x !== this.tiles[y].length - 1) {
      this.open(x + 1, y + 1);
    }
    // bottom
    if (y !== this.tiles.length - 1) {
      this.open(x, y + 1);
    }
    // bottom left
    if (y !== this.tiles.length - 1 && x !== 0) {
      this.open(x - 1, y + 1);
    }
    // left
    if (x !== 0) {
      this.open(x - 1, y);
    }
  }

  private getNeighbourBombsCount(x: number, y: number): number {
    let counter = 0;
    // top left
    if (
      y !== 0 &&
      x !== 0 &&
      this.tiles[y - 1][x - 1] instanceof BombTileModel
    ) {
      counter += 1;
    }
    // top
    if (y !== 0 && this.tiles[y - 1][x] instanceof BombTileModel) {
      counter += 1;
    }
    // top right
    if (y !== 0 && this.tiles[y - 1][x + 1] instanceof BombTileModel) {
      counter += 1;
    }
    // right
    if (
      x !== this.tiles[y].length - 1 &&
      this.tiles[y][x + 1] instanceof BombTileModel
    ) {
      counter += 1;
    }
    // bottom right
    if (
      y !== this.tiles.length - 1 &&
      x !== this.tiles[y].length - 1 &&
      this.tiles[y + 1][x + 1] instanceof BombTileModel
    ) {
      counter += 1;
    }
    // bottom
    if (
      y !== this.tiles.length - 1 &&
      this.tiles[y + 1][x] instanceof BombTileModel
    ) {
      counter += 1;
    }
    // bottom left
    if (
      y !== this.tiles.length - 1 &&
      x !== 0 &&
      this.tiles[y + 1][x - 1] instanceof BombTileModel
    ) {
      counter += 1;
    }
    // left
    if (x !== 0 && this.tiles[y][x - 1] instanceof BombTileModel) {
      counter += 1;
    }

    return counter;
  }
}
