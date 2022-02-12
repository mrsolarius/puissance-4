import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  Board,
  emptyBoard,
  initReturns,
  playReturns,
  Puissance4Interface,
  Token,
  winnerReturns
} from './puissance4.data';

type Steps = -1 | 0 | 1
type Directions = [width:Steps, height:Steps];
type WinTokenReturns = number | {error: 'not token here'} | {error: 'out of range'} | {error: 'invalid direction'};

@Injectable({
  providedIn: 'root'
})
export class Puissance4Service implements Puissance4Interface {
  private readonly _boardSubj = new BehaviorSubject<Board>(emptyBoard);
  public  readonly boardObs = this._boardSubj.asObservable();

  /** The current board managed by the service \
   * board[i][j] is the position at column i, line j \
   * For each column, lines begins at the "bottom" \
   * Exemple with a 4 x 3 board \
   * 2          \
   * 1          \
   * 0 1 2 3 4
  */
  get board(): Board  {return this._boardSubj.value}
  set board(b: Board) {this._boardSubj.next(b)}
  /**
   * Initialize the board.
   * Errors should be considered in order (if several errors are possible, returns the first one in the following list)
   * @param board The new board
   * @returns \{error: undefined, board: Board} if the board is valid
   * @returns \{error: 'invalid magnitudes'} if width or height are not valid magnitude (i.e. strictly positive integers)
   * @returns \{error: 'invalid data'} if data contains invalid number of tokens (#RED should be equals to #YELLOW or #YELLOW+1)
   *                                   or if data has different magnitudes than width and height (if they are valid ones).
   */
  init(board: Board): initReturns {
    if (board.width<1 || board.height<1 || !Number.isInteger(board.width) || !Number.isInteger(board.height)) return {error: 'invalid magnitudes'};
    if (board.width != board.data.length || board.data.filter(line => line.length > board.height).length > 0) return {error: 'invalid data'};
    if (!(nbTokensInBoard(board,'RED') == nbTokensInBoard(board,'YELLOW') ||
          nbTokensInBoard(board,'RED') == nbTokensInBoard(board,'YELLOW')  + 1)) return {error: 'invalid data'};

    this.board = board;
    return {error: undefined, board};
  }

  /**
   * Play token at columnIndex.
   * PRECONDITION : the board is correct.
   * Errors should be considered in order (if several errors are possible, returns the first one in the following list)
   * @param token The token to play
   * @param columnIndex The columnIndex where to play, must be an integer
   * @returns \{error: undefined, board: the new board} with token t at columnIndex in case of success. The new board is then set to the board attribute
   * @returns \{error: 'out of range'} in case columnIndex is not a valid column index
   * @returns \{error: 'column is full'} in case column is ALREADY full.
   * @returns \{error: 'not your turn'} As RED begins, then #RED should be equals to #YELLOW or #YELLOW + 1.
   */
  play(token: Token, columnIndex: number): playReturns {
    if (columnIndex < 0 || columnIndex >= this.board.width || !Number.isInteger(columnIndex)) return {error: 'out of range'};
    if (this.board.data[columnIndex].length === this.board.height) return {error: 'column is full'};
    if(token === 'RED'){
      if (!(nbTokensInBoard(this.board,'RED') == nbTokensInBoard(this.board,'YELLOW'))) return {error: 'not your turn'};
    }else{
      if (!(nbTokensInBoard(this.board,'YELLOW')+1 == nbTokensInBoard(this.board,'RED'))) return {error: 'not your turn'};
    }

    //Concatenate the token to the column
    const column = this.board.data[columnIndex].concat(token);
    const board = {
      //Copy old board metadata (width, height)
      ...this.board,
      data:
        //Map the old board data with the new column
        this.board.data.map((currentColumn, i) => i === columnIndex ? column : currentColumn)
    };

    this.board = board;
    return {error: undefined,board};
  }

  /**
   * Identify who is the winner, if there is any. NONE otherwise. \
   * The winner has got at least nb tokens aligned.
   * nb should be >= 3, if it is not, result should be set to NONE.\
   * If two winners are possible, then choose the one that has a winning token
   * at the lower column index or the lower line index if columns are the same. \
   * PRECONDITION : the board is correct.
   * @param nb Minimal number of token that have to be aligned (in any of 8 directions) to declare a winner
   * @returns the token of the winner if any, NONE otherweise
   */
  winner(nb: number): winnerReturns {
    if (nb<3 || !Number.isInteger(nb)) return 'NONE';

    const possibleDirection : Directions[] = [
      [0,1],
      [1,1],
      [1,0],
      [1,-1],
      [0,-1],
      [-1,-1],
      [-1,0],
      [-1,1]
    ];

    for (let columnIndex = 0; columnIndex < this.board.data.length; columnIndex++) {
      for (let lineIndex = 0; lineIndex < this.board.data[columnIndex].length; lineIndex++) {
        for (let direction of possibleDirection) {
          let nbTokens = 0;
          const token = this.board.data[columnIndex][lineIndex];
          let currentHeight=columnIndex, currentWidth = lineIndex;
          while (this.board.data[currentHeight]?.[currentWidth] === token && currentHeight >=0 && currentWidth >=0) {
            if(this.board.data[currentHeight][currentWidth] === token) {
              nbTokens++;
              currentHeight += direction[1];
              currentWidth += direction[0];
            }
          }
          if (nbTokens >= nb) return this.board.data[columnIndex][lineIndex];
        }
      }
    }
    return 'NONE'
  }
}


/**
 * Get the number of tokens in the board
 * @param board The board where to count the tokens
 * @param token The token to count
 * @returns The number of selected tokens in the board
 */
function nbTokensInBoard(board:Board,token: Token): number {
  return board.data.reduce((acc, column) => {
    //Filter selected tokens to get number of selected tokens in column
    return acc + column.filter(t => t == token).length;
  }, 0);
}
