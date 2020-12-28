import { Cell } from "./cell";

export class Game {

  public image: Cell[][] = [];
  public rowHints: number[][] = [];
  public colHints: number[][] = [];

  constructor(
    public sizeX: number,
    public sizeY: number,
    public solution: Cell[][]) {
      this.resetImage();
      this.createHints();
  }

  public setCell(x: number, y: number, content: Cell) {
    this.image[y][x] = content;
  }

  public getCell(x: number, y: number): Cell {
    return this.image[y][x];
  }

  public imageToString(): string {
    return this.arrayToString(this.image);
  }

  public solutionToString(): string {
    return this.arrayToString(this.solution);
  }

  public isSolved(): boolean {
    for (let col = 0; col < this.solution.length; col++) {
      for (let row = 0; row < this.solution[0].length; row++) {
        if (this.image[col][row] !== this.solution[col][row]) {
          return false;
        }
      }
    }
    return true;
  }

  private createHints(): void {
    this.solution.forEach(row => {
      let counter = 0;
      let rowHint: number[] = [];
      row.forEach(cell => {
        if (cell === Cell.BLACK) {
          counter++;
        } else if (counter > 0) {
          rowHint.push(counter);
          counter = 0;
        }
      });
      if (counter > 0) {
        rowHint.push(counter);
      }
      this.rowHints.push(rowHint);
    });

    console.log('cols = ' + this.solution[0].length);

    for (let col = 0; col < this.solution[0].length; col++) {
      let counter = 0;
      let colHint: number[] = [];
      for (let row = 0; row < this.solution.length; row++) {
        let cell = this.solution[row][col];
        if (cell === Cell.BLACK) {
          counter++;
        } else if (counter > 0) {
          colHint.push(counter);
          counter = 0;
        }
      }
      if (counter > 0) {
        colHint.push(counter);
      }
      this.colHints.push(colHint);
    }
  }

  private arrayToString(array: Cell[][]): string {
    let s = '';
    array.forEach(row => {
      row.forEach(cell => {
        s += cell;
        s += ' ';
      })
      s += '\n';
    })
    return s;
  }

  private resetImage(): void {
    for (let i = 0; i < this.sizeY; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < this.sizeX; j++) {
        row.push(Cell.EMPTY);
      }
      this.image.push(row);
    }
  }
}
