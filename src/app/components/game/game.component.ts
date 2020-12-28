import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Cell } from 'src/app/model/cell';
import { Game } from 'src/app/model/game';
import { GameBuilder } from 'src/app/model/game-builder';

enum State {
  NONE, DRAWING, ERASING, MARKING
}

@Component({
  selector: 'app-game [sizeX] [sizeY]',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  
  @Input() sizeX = 10;
  @Input() sizeY = 10;

  @Output() gameFinished = new EventEmitter();

  public game: Game | null = null;

  public state: State = State.NONE;

  constructor() {
  }

  ngOnInit(): void {
    this.game = new GameBuilder(this.sizeX, this.sizeY, 0.7).build();
    console.log(this.game.solutionToString());
    console.log(this.game.rowHints);
    console.log(this.game.colHints);
    
  }

  public onMouseDown(event: MouseEvent, x: number, y: number): void {
    if (event.buttons === 1) {
      if (this.game?.getCell(x, y) === Cell.BLACK) {
        this.game?.setCell(x, y, Cell.EMPTY);
        this.state = State.ERASING;
      } else {
        this.game?.setCell(x, y, Cell.BLACK);
        this.state = State.DRAWING;
      }
    } else if (event.buttons === 2) {
      if (this.game?.getCell(x, y) === Cell.MARKED) {
        this.game?.setCell(x, y, Cell.EMPTY);
        this.state = State.ERASING;
      } else {
        this.game?.setCell(x, y,Cell.MARKED);
        this.state = State.MARKING;
      }
    } else if (event.buttons === 4) {
        this.game?.setCell(x, y, Cell.EMPTY);
        this.state = State.ERASING;
    }

    // console.log(`mouse down (${x}, ${y}) button ${event.buttons}`);
  }

  public onMouseUp(event: MouseEvent, x: number, y: number): void {
    // console.log(`mouse up (${x}, ${y})`);
    this.state = State.NONE;
  }

  public onMouseEnter(event: MouseEvent, x: number, y: number): void {
    if (this.state === State.DRAWING && this.game?.getCell(x, y) !== Cell.BLACK) {
      this.game?.setCell(x, y, Cell.BLACK);
    }
    if (this.state === State.ERASING && this.game?.getCell(x, y) !== Cell.EMPTY) {
      this.game?.setCell(x, y, Cell.EMPTY);
    }
    if (this.state === State.MARKING && this.game?.getCell(x, y) !== Cell.MARKED) {
      this.game?.setCell(x, y, Cell.MARKED);
    }
    // console.log(`mouse enter (${x}, ${y}), event: ${JSON.stringify(event)}`)
  }

  public onMouseLeavesGame(): void {
    this.state = State.NONE;
  }

  public getRowHint(col: number): number[] {
    if (this.game != null) {
      return this.game.rowHints[col];
    } else {
      return [];
    }
  }

  public getColHint(row: number): string {
    if (this.game != null) {
      if (this.game.colHints[row] === []) {
        return 'no hint';
      }
      return this.game.colHints[row].toString();
    }
    return '';
  }

  public counter(num: number): number[] {
    return Array.from({length:num},(v,k)=>k+1);
  }

  public getCellStyle(): object {
    let percent = 100 / this.sizeX;
    return {'width': `${percent}%`, 'padding-bottom': `${percent}%`};
  }

  public getCellClass(x: number, y: number): string {
    switch(this.game?.getCell(x, y)) {
      case Cell.EMPTY: return 'empty';
      case Cell.BLACK: return 'black';
      case Cell.MARKED: return 'marked';
    }
    return 'null';
  }
}