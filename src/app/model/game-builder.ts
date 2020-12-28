import { Cell } from "./cell";
import { Game } from "./game";

export class GameBuilder {
  private solution: Cell[][] = [];

  constructor(private sizeX: number, private sizeY: number, private percentBlack: number) {
    this.createRandomSolution();
  }

  private createRandomSolution(): void {
    for (let i = 0; i < this.sizeY; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < this.sizeX; j++) {
        if (Math.random() < this.percentBlack) {
          row.push(Cell.BLACK);
        } else {
          row.push(Cell.EMPTY);
        }
      }
      this.solution.push(row);
    }
  }

  public build(): Game {
    return new Game(this.sizeX, this.sizeY, this.solution);
  }
}
