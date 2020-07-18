import { TileModel } from "./tile";

export class ValueTileModel extends TileModel {
  value: number;

  constructor(x: number, y: number, value: number) {
    super(x, y);

    this.value = value;
  }
}
