import { Component, Input, OnInit } from '@angular/core';
import { Cell } from 'src/app/model/cell';

enum State {
  NONE, DRAWING, ERASING, MARKING
}

@Component({
  selector: 'app-game [sizeX] [sizeY] [solution]',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  
  @Input() sizeX = 10;
  @Input() sizeY = 10;
  @Input() solution = [];

  public image: Cell[][] = [];

  public state: State = State.NONE;

  constructor() { }

  ngOnInit(): void {
    this.resetImage();
    console.log(this.image);
  }

  public onMouseDown(event: MouseEvent, x: number, y: number): void {
    if (event.buttons === 1) {
      if (this.image[y][x] === Cell.BLACK) {
        this.image[y][x] = Cell.EMPTY;
        this.state = State.ERASING;
      } else {
        this.image[y][x] = Cell.BLACK;
        this.state = State.DRAWING;
      }
    } else if (event.buttons === 2) {
      if (this.image[y][x] === Cell.MARKED) {
        this.image[y][x] = Cell.EMPTY;
        this.state = State.ERASING;
      } else {
        this.image[y][x] = Cell.MARKED;
        this.state = State.MARKING;
      }
    } else if (event.buttons === 4) {
        this.image[y][x] = Cell.EMPTY;
        this.state = State.ERASING;
    }

    console.log(`mouse down (${x}, ${y}) button ${event.buttons}`);
  }

  public onMouseUp(event: MouseEvent, x: number, y: number): void {
    // console.log(`mouse up (${x}, ${y})`);
    this.state = State.NONE;
  }

  public onMouseEnter(event: MouseEvent, x: number, y: number): void {
    if (this.state === State.DRAWING && this.image[y][x] !== Cell.BLACK) {
      this.image[y][x] = Cell.BLACK;
    }
    if (this.state === State.ERASING && this.image[y][x] !== Cell.EMPTY) {
      this.image[y][x] = Cell.EMPTY;
    }
    if (this.state === State.MARKING && this.image[y][x] !== Cell.MARKED) {
      this.image[y][x] = Cell.MARKED;
    }
    // console.log(`mouse enter (${x}, ${y}), event: ${JSON.stringify(event)}`)
  }

  public getTableWidth(): number { return 100/this.sizeX; }

  public getTableHeight(): number { return 100/this.sizeY; }

  public getCellClass(x: number, y: number): string {
    switch(this.image[y][x]) {
      case Cell.EMPTY: return 'empty';
      case Cell.BLACK: return 'black';
      case Cell.MARKED: return 'marked';
    }
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