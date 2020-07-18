import { TileModel } from "./tile";
import { BombTileModel } from "./bombTile";
import { ValueTileModel } from "./valueTile";

export class BoardModel {
  public readonly size: number;
  public readonly bombs: number;
  public tiles: Array<Array<TileModel>>;

  constructor(size: number, bombs: number) {
    this.size = size;
    this.bombs = bombs;
    this.tiles = Array<Array<TileModel>>();
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
  }

  public open(x: number, y: number) {
    let tile = this.tiles[y][x];
    if (tile.flagged === true) return;

    // open tile
    if (tile.state === "OPEN") return;
    tile.open();

    // Check is lost
    if (tile instanceof ValueTileModel) {
      if (tile.value === 0) {
        this.openNeightbours(x, y);
      }
    } else if (tile instanceof BombTileModel) {
      console.log("Lost");
    }
  }

  public flag(x: number, y: number) {
    if (isNaN(x) || isNaN(y)) return;

    if (this.tiles[y][x].state === "CLOSE") {
      this.tiles[y][x].flagged = !this.tiles[y][x].flagged;
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
