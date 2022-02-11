import {TestBed} from '@angular/core/testing';
import {Board, emptyBoard, genBoard, genBoardResult, initReturns, similarBoard, winnerReturns} from './puissance4.data';
import {Puissance4Service} from './puissance4.service';
import {assertEqual, Assertion} from './utils.alx';

describe('Puissance4Service test init', () => {
  let service: Puissance4Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Puissance4Service);
  });

  it('Puissance4Service should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * Should WORK !
   */
  describe("should work", () => {
    //Should work if bord is empty
    it("should init if x = y = 5", () => {
      const b: Board = {width: 5, height: 5, data: [[], [], [], [], []]};
      const R = service.init(b);
      expect(R.error).toBeUndefined();
      expect(service.board).toBe(b);
    });

    it("should init an empty 7x5", () => {
      const b: Board = {width: 7, height: 5, data: [[], [], [], [], [], [], []]};
      const R = service.init(b);
      expect(R.error).toBeUndefined();
      expect(service.board).toBe(b);
    });

    //Should work if bord is not empty
    it("should init a bord that contain only one token", () => {
      const b: Board = {width: 7, height: 5, data: [['RED'], [], [], [], [], [], []]};
      const R = service.init(b);
      expect(R.error).toBeUndefined();
      expect(service.board).toBe(b);
    });

    it("should init a bord that is 1 by 1", () => {
      const b: Board = {width: 1, height: 1, data: [['RED']]};
      const R = service.init(b);
      expect(R.error).toBeUndefined();
      expect(service.board).toBe(b);
    });

    it("should init a board that contain token without special case", () => {
      const b: Board = {
        width: 4, height: 5, data: [
          ['RED', 'RED', 'RED', 'YELLOW', 'YELLOW'],
          ['YELLOW', 'RED', 'YELLOW', 'YELLOW'],
          ['YELLOW', 'RED', 'RED'],
          ['RED', 'YELLOW']]
      }
      const R = service.init(b);
      expect(R.error).toBeUndefined();
      expect(service.board).toBe(b);
    });

    //Should work if bord is not empty and contain special case
    it("should init a bord that contain an horizontal puissance 4", () => {
      const b: Board = {
        width: 4, height: 5, data: [
          ['RED', 'RED', 'RED', 'YELLOW', 'YELLOW'],
          ['YELLOW', 'RED', 'YELLOW', 'YELLOW'],
          ['YELLOW', 'RED', 'RED', 'YELLOW'],
          ['RED', 'RED', 'YELLOW']]
      }
      const R = service.init(b);
      expect(R.error).toBeUndefined();
      expect(service.board).toBe(b);
    });

    it("should init a bord that contain an vertical puissance 4", () => {
      const b: Board = {
        width: 4, height: 5, data: [
          ['RED', 'RED', 'RED', 'RED'],
          ['YELLOW', 'RED', 'YELLOW', 'YELLOW'],
          ['YELLOW', 'RED', 'RED', 'YELLOW'],
          ['RED', 'YELLOW', 'YELLOW', 'YELLOW']]
      }
      const R = service.init(b);
      expect(R.error).toBeUndefined();
      expect(service.board).toBe(b);
    });

    it("should init a bord that contain an diagonal puissance 4", () => {
      const b: Board = {
        width: 4, height: 5, data: [
          ['RED', 'RED', 'RED', 'RED'],
          ['YELLOW', 'RED', 'YELLOW', 'YELLOW'],
          ['YELLOW', 'RED', 'RED', 'YELLOW'],
          ['YELLOW', 'YELLOW', 'YELLOW', 'RED']]
      }
      const R = service.init(b);
      expect(R.error).toBeUndefined();
      expect(service.board).toBe(b);
    });

    it("should init a bord that contain an multiple puissance 4", () => {
      const b: Board = {
        width: 4, height: 5, data: [
          ['YELLOW', 'RED', 'RED', 'RED', 'RED'],
          ['YELLOW', 'YELLOW', 'YELLOW', 'YELLOW'],
          ['YELLOW', 'RED', 'RED', 'RED', 'RED'],
          ['YELLOW', 'YELLOW', 'YELLOW', 'RED']]
      }
      const R = service.init(b);
      expect(R.error).toBeUndefined();
      expect(service.board).toBe(b);
    });

    it("should init a bord that conatain more than 4 algin token", () => {
      const b: Board = {
        width: 5, height: 6, data: [
          ['YELLOW', 'RED', 'RED', 'RED', 'RED', 'RED'],
          ['YELLOW', 'YELLOW', 'YELLOW', 'YELLOW'],
          ['YELLOW', 'RED', 'RED', 'RED', 'RED', 'RED'],
          ['YELLOW', 'YELLOW', 'YELLOW', 'RED'],
          ['YELLOW', 'YELLOW', 'YELLOW', 'RED']]
      }
      const R = service.init(b);
      expect(R.error).toBeUndefined();
      expect(service.board).toBe(b);
    });

    it("should init a bord if there is 1 more yellow token than the red", () => {
      const b: Board = {
        width: 6, height: 6, data: [
          ['YELLOW', 'RED', 'RED', 'RED', 'RED', 'RED'],
          ['YELLOW', 'YELLOW', 'YELLOW', 'YELLOW'],
          ['YELLOW', 'RED', 'RED', 'RED', 'RED', 'RED'],
          ['YELLOW', 'YELLOW', 'YELLOW', 'RED'],
          ['YELLOW', 'YELLOW', 'YELLOW', 'RED'],
          ['YELLOW', 'YELLOW', 'RED', 'RED']]
      }
      const R = service.init(b);
      expect(R.error).toBeUndefined();
      expect(service.board).toBe(b);
    });
  });

  /**
   * Should throw errors
   */
  describe("should throw errors", () => {
    describe("should throw `invalid magnitudes` errors", () => {
      //Check invalide magnitude

      it("should throw error if width is not an integer", () => {
        const b: Board = {width: 1.8, height: 1, data: []};
        const R = service.init(b);
        expect(R.error).toEqual('invalid magnitudes');
      });

      it("should throw error if height is not an integer", () => {
        const b: Board = {width: 1, height: 1.8, data: []};
        const R = service.init(b);
        expect(R.error).toEqual('invalid magnitudes');
      });

      it("should throw error if width is negative", () => {
        const b: Board = {width: -2, height: 5, data: [['RED'], []]};
        const R = service.init(b);
        expect(R.error).toEqual('invalid magnitudes');
      });

      it("should throw error if height is negative", () => {
        const b: Board = {width: 2, height: -5, data: [['RED'], []]};
        const R = service.init(b);
        expect(R.error).toEqual('invalid magnitudes');
      });

      it("should return an error if x || y <= 0", () => {
        const b: Board = {width: 0, height: 0, data: []};
        const R = service.init(b);
        expect(R.error).toEqual('invalid magnitudes');
      });

    });
    describe("should throw `invalid data` errors", () => {
      //Check invalide data
      it("should throw an error if data width don't have the same length", () => {
        const b: Board = {width: 5, height: 5, data: [['RED','YELLOW'], [], [], []]};
        const R = service.init(b);
        expect(R.error).toEqual('invalid data');
      });

      it("should throw an error if data height don't have the same length", () => {
        const b: Board = {width: 5, height: 2, data: [['RED'], ['YELLOW','RED','YELLOW'], [], []]};
        const R = service.init(b);
        expect(R.error).toEqual('invalid data');
      });

      it("should throw an error if total of red and yellow token are different", () => {
        const b: Board = {
          width: 5, height: 5, data: [
            ['RED', 'YELLOW', 'RED', 'YELLOW', 'YELLOW'],
            ['YELLOW', 'RED', 'RED', 'RED', 'RED'],
            ['YELLOW', 'YELLOW', 'YELLOW', 'RED'],
            ['YELLOW', 'YELLOW', 'YELLOW', 'RED'],
            ['YELLOW', 'YELLOW', 'YELLOW', 'RED']]
        };
        const R = service.init(b);
        expect(R.error).toEqual('invalid data');
      });

      it("should throw an error if there is two more red token than yellow one", () => {
        const b: Board = {
          width: 5, height: 5, data: [
            ['RED', 'YELLOW', 'RED', 'YELLOW', 'YELLOW'],
            ['YELLOW', 'RED', 'RED', 'RED', 'RED'],
            ['YELLOW', 'YELLOW', 'YELLOW', 'RED'],
            ['YELLOW', 'YELLOW', 'YELLOW', 'RED'],
            ['RED', 'RED', 'RED', 'RED']]
        };
        const R = service.init(b);
        expect(R.error).toEqual('invalid data');
      });

      it("should throw an error if the bord is full of red token", () => {
        const b: Board = {
          width: 5, height: 5, data: [
            ['RED', 'RED', 'RED', 'RED', 'RED'],
            ['RED', 'RED', 'RED', 'RED', 'RED'],
            ['RED', 'RED', 'RED', 'RED', 'RED'],
            ['RED', 'RED', 'RED', 'RED', 'RED'],
            ['RED', 'RED', 'RED', 'RED', 'RED']]
        };
        const R = service.init(b);
        expect(R.error).toEqual('invalid data');
      });

      it("should throw an error if the board is full of yellow token", () => {
        const b: Board = {
          width: 5, height: 5, data: [
            ['YELLOW', 'YELLOW', 'YELLOW', 'YELLOW', 'YELLOW'],
            ['YELLOW', 'YELLOW', 'YELLOW', 'YELLOW', 'YELLOW'],
            ['YELLOW', 'YELLOW', 'YELLOW', 'YELLOW', 'YELLOW'],
            ['YELLOW', 'YELLOW', 'YELLOW', 'YELLOW', 'YELLOW'],
            ['YELLOW', 'YELLOW', 'YELLOW', 'YELLOW', 'YELLOW']]
        };
        const R = service.init(b);
        expect(R.error).toEqual('invalid data');
      });
    });
  });
});

describe('Puissance4Service test play', () => {
  let service: Puissance4Service;
  let empty7x5: Board;

  beforeAll(() => {
    const gb = genBoard(` |
                          |
                          |
                          |
                          |
                          |-------`);
    if (gb.error === undefined) {
      empty7x5 = gb.board;
    }
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Puissance4Service);
  });

  /**
   * Should work
   */
  describe("should work", () => {
    it("should play red if bord is empty", () => {
      service.init(empty7x5);
      const R = service.play('RED', 1);
      expect(R.error).toBeUndefined();
      expect(service.board.data[1][0]).toEqual('RED');
    });

    it("should play yellow if bord contain one red token", () => {
      const gb2 = genBoard(` |
                           |
                           |
                           |
                           |
                           |R
                           |-------`);
      if (gb2.error === undefined) {
        service.init(gb2.board);
        const R = service.play('YELLOW', 2);
        expect(R.error).toBeUndefined();
        expect(service.board.data[2][0]).toEqual('YELLOW');
      }
      expect(gb2.error).toBeUndefined();
    });

    it("should play yellow on same column as red", () => {
      const gb2 = genBoard(` |
                             |
                             |
                             |
                             |
                             |R
                             |-------`);
      if (gb2.error === undefined) {
        service.init(gb2.board);
        const R = service.play('YELLOW', 0);
        expect(R.error).toBeUndefined();
        expect(service.board.data[0][1]).toEqual('YELLOW');
      }
      expect(gb2.error).toBeUndefined();
    });

    it('should be possible to play yellow if multiple red are on the board', () => {
      const gb2 = genBoard(` |
                             |
                             |
                             |
                             |Y
                             |RR
                             |-------`);
      if (gb2.error === undefined) {
        service.init(gb2.board);
        const R = service.play('YELLOW', 1);
        expect(R.error).toBeUndefined();
        expect(service.board.data[1][1]).toEqual('YELLOW');
      }
      expect(gb2.error).toBeUndefined();
    });

    it("should be possible to play red if there are same number of yellow than red", () => {
      const gb2 = genBoard(` |
                             |
                             |
                             |
                             |YY
                             |RR
                             |-------`);
      if (gb2.error === undefined) {
        service.init(gb2.board);
        const R = service.play('RED', 1);
        expect(R.error).toBeUndefined();
        expect(service.board.data[1][2]).toEqual('RED');
      }
      expect(gb2.error).toBeUndefined();
    });

    it("should be possible to play red if a column is almost full", () => {
      const gb2 = genBoard(` |
                             |Y
                             |R
                             |Y
                             |R
                             |Y
                             |R
                             |-------`);
      if (gb2.error === undefined) {
        service.init(gb2.board);
        const R = service.play('RED', 0);
        expect(R.error).toBeUndefined();
        expect(service.board.data[0][6]).toEqual('RED');
      }
      expect(gb2.error).toBeUndefined();
    });

    it("should be possible to play yellow if a column is almost full", () => {
      const gb2 = genBoard(` |
                             |R
                             |Y
                             |R
                             |Y
                             |R
                             |YR
                             |-------`);
      if (gb2.error === undefined) {
        service.init(gb2.board);
        const R = service.play('YELLOW', 0);
        expect(R.error).toBeUndefined();
        expect(service.board.data[0][6]).toEqual('YELLOW');
      }
      expect(gb2.error).toBeUndefined();
    });

    it('should be possible to play at the last column as yellow', () => {
      const gb2 = genBoard(` |
                             |
                             |
                             |
                             |
                             |
                             |R
                             |-------`);
      if (gb2.error === undefined) {
        service.init(gb2.board);
        const R = service.play('YELLOW', 6);
        expect(R.error).toBeUndefined();
        expect(service.board.data[6][0]).toEqual('YELLOW');
      }
    });
  });
  /**
   * Should return an error
   */
  //out of range errors
  describe("should throw errors", () => {
    describe("should throw `out of range` errors", () => {

      it("should thorw an error if column is not integer", () => {
        const gb2 = genBoard(` |
                               |
                               |
                               |
                               |
                               |
                               |R
                               |-------`);
        if (gb2.error === undefined) {
          service.init(gb2.board);
          const R = service.play('YELLOW', 2.5);
          expect(R.error).toEqual('out of range');
        }
        expect(gb2.error).toBeUndefined();
      });

      it("sould not be possible to play in negative column", () => {
        service.init(empty7x5);
        const R = service.play('RED', -1);
        expect(R.error).toEqual('out of range');
      });

      it("sould not be possible to play in column 7", () => {
        service.init(empty7x5);
        const R = service.play('RED', 7);
        expect(R.error).toEqual('out of range');
      });
    });

    describe("should throw `column is full` errors", () => {
      it("should not be possible to play in colum that's alredy full for yellow", () => {
        const gb2 = genBoard(` |R
                           |Y
                           |R
                           |Y
                           |R
                           |Y
                           |R
                           |-------`);
        if (gb2.error === undefined) {
          service.init(gb2.board);
          const R = service.play('YELLOW', 0);
          expect(R.error).toEqual('column is full');
        }
        expect(gb2.error).toBeUndefined();
      });

      it("should not be possible to play in column that's already full for red", () => {
        const gb2 = genBoard(` |R
                           |Y
                           |R
                           |Y
                           |R
                           |Y
                           |RY
                           |-------`);
        if (gb2.error === undefined) {
          service.init(gb2.board);
          const R = service.play('RED', 0);
          expect(R.error).toEqual('column is full');
        }
        expect(gb2.error).toBeUndefined();
      });
    });

    describe("should throw `not your turn` errors", () => {
      it("should not be possible to start with YELLOW", () => {
        service.init(empty7x5);
        const res = service.play('YELLOW', 1);
        expect(res.error).toEqual("not your turn");
      });

      it("should not be possible to play with red if number of red is 1 more than yellow", () => {
        const gb2 = genBoard(` |
                           |
                           |
                           |R
                           |YR
                           |YY
                           |RR
                           |-------`);
        if (gb2.error === undefined) {
          service.init(gb2.board);
          const R = service.play('RED', 2);
          expect(R.error).toEqual("not your turn");
        }
        expect(gb2.error).toBeUndefined();
      });

      it("should not be possible to play with yellow if number of yellow is equal to red", () => {
        const gb2 = genBoard(` |
                           |
                           |
                           |
                           |YR
                           |RY
                           |YR
                           |-------`);
        if (gb2.error === undefined) {
          service.init(gb2.board);
          const R = service.play('YELLOW', 2);
          expect(R.error).toEqual("not your turn");
        }
        expect(gb2.error).toBeUndefined();
      });
    });
  });
});
/*
describe('Puissance4Service test winner', () => {
  let service: Puissance4Service;
  let empty7x5: Board;

  beforeAll(() => {
    const gb = genBoard(` |
                          |
                          |
                          |
                          |
                          |-------`);
    if (gb.error === undefined) {
      empty7x5 = gb.board;
    }
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Puissance4Service);
  });

  // Horizontal Tests
  describe('should winn horizontally', () => {
    it("should return winner for red", () => {
      const gb2 = genBoard(` |
                           |
                           |
                           |
                           |
                           |R
                           |-------`);
      if (gb2.error === undefined) {
        service.init(gb2.board);
        expect(service.winner(1)).toEqual('RED');
        expect(service.winner(2)).toEqual('NONE');
      }
      expect(gb2.error).toBeUndefined();
    });

    it("should return winner for yellow", () => {
      const gb2 = genBoard(` |
                           |
                           |
                           |
                           |
                           |Y
                           |-------`);
      if (gb2.error === undefined) {
        service.init(gb2.board);
        expect(service.winner(1)).toEqual('YELLOW');
        expect(service.winner(2)).toEqual('NONE');
      }
      expect(gb2.error).toBeUndefined();
    });

    // horizontal bottom
    it("should return winner for red with 5 horizontal tokens", () => {
      const gb2 = genBoard(` |
                           |
                           |
                           |
                           |Y Y Y
                           |RRRRR Y
                           |-------`);
      if (gb2.error === undefined) {
        service.init(gb2.board);
        expect(service.winner(1)).toEqual('RED');
        expect(service.winner(2)).toEqual('RED');
        expect(service.winner(3)).toEqual('RED');
        expect(service.winner(4)).toEqual('RED');
        expect(service.winner(5)).toEqual('RED');
        expect(service.winner(6)).toEqual('NONE');
      }
      expect(gb2.error).toBeUndefined();
    });

    it("should return winner for yellow with 5 horizontal tokens", () => {
      const gb2 = genBoard(` |
                           |
                           |
                           |
                           |R R R
                           |YYYYY R
                           |-------`);
      if (gb2.error === undefined) {
        service.init(gb2.board);
        expect(service.winner(1)).toEqual('YELLOW');
        expect(service.winner(2)).toEqual('YELLOW');
        expect(service.winner(3)).toEqual('YELLOW');
        expect(service.winner(4)).toEqual('YELLOW');
        expect(service.winner(5)).toEqual('YELLOW');
        expect(service.winner(6)).toEqual('NONE');
      }
      expect(gb2.error).toBeUndefined();
    });

    // Hortizontal at diffrent height
    it("should return winner for red with 5 horizontal tokens at different height of 2", () => {
      const gb2 = genBoard(` |
                           |
                           |
                           |
                           |RRRRR
                           |RYRYR
                           |-------`);
      if (gb2.error === undefined) {
        service.init(gb2.board);
        expect(service.winner(1)).toEqual('RED');
        expect(service.winner(2)).toEqual('RED');
        expect(service.winner(3)).toEqual('RED');
        expect(service.winner(4)).toEqual('RED');
        expect(service.winner(5)).toEqual('RED');
        expect(service.winner(6)).toEqual('NONE');
      }
      expect(gb2.error).toBeUndefined();
    });

    it("should return winner for yellow with 5 horizontal tokens at different height of 2", () => {
      const gb2 = genBoard(` |
                           |
                           |
                           |
                           |YYYYY
                           |YRYYR
                           |-------`);
      if (gb2.error === undefined) {
        service.init(gb2.board);
        expect(service.winner(1)).toEqual('YELLOW');
        expect(service.winner(2)).toEqual('YELLOW');
        expect(service.winner(3)).toEqual('YELLOW');
        expect(service.winner(4)).toEqual('YELLOW');
        expect(service.winner(5)).toEqual('YELLOW');
        expect(service.winner(6)).toEqual('NONE');
      }
      expect(gb2.error).toBeUndefined();
    });

    it("should return winner for red with 5 horizontal tokens at max height", () => {
      const gb2 = genBoard(` |RRRRR
                           |RYRYR
                           |-------`);
      if (gb2.error === undefined) {
        service.init(gb2.board);
        expect(service.winner(1)).toEqual('RED');
        expect(service.winner(2)).toEqual('RED');
        expect(service.winner(3)).toEqual('RED');
        expect(service.winner(4)).toEqual('RED');
        expect(service.winner(5)).toEqual('RED');
        expect(service.winner(6)).toEqual('NONE');
      }
      expect(gb2.error).toBeUndefined();
    });

    it("should return winner for yellow with 5 horizontal tokens at max height", () => {
      const gb2 = genBoard(` |YYYYY
                           |YRYRY
                           |-------`);
      if (gb2.error === undefined) {
        service.init(gb2.board);
        expect(service.winner(1)).toEqual('YELLOW');
        expect(service.winner(2)).toEqual('YELLOW');
        expect(service.winner(3)).toEqual('YELLOW');
        expect(service.winner(4)).toEqual('YELLOW');
        expect(service.winner(5)).toEqual('YELLOW');
        expect(service.winner(6)).toEqual('NONE');
      }
      expect(gb2.error).toBeUndefined();
    });
  });
  // Vertical Tests
  describe('should winn vertically', () => {
    it("should return winner for red with 5 vertical tokens", () => {
      const gb2 = genBoard(` |
                           |R
                           |R
                           |R
                           |R
                           |R
                           |-------`);
      if (gb2.error === undefined) {
        service.init(gb2.board);
        expect(service.winner(1)).toEqual('RED');
        expect(service.winner(2)).toEqual('RED');
        expect(service.winner(3)).toEqual('RED');
        expect(service.winner(4)).toEqual('RED');
        expect(service.winner(5)).toEqual('RED');
        expect(service.winner(6)).toEqual('NONE');
      }
      expect(gb2.error).toBeUndefined();
    });

    it("should return winner for yellow with 5 vertical tokens", () => {
      const gb2 = genBoard(` |
                           |Y
                           |Y
                           |Y
                           |Y
                           |Y
                           |-------`);
      if (gb2.error === undefined) {
        service.init(gb2.board);
        expect(service.winner(1)).toEqual('YELLOW');
        expect(service.winner(2)).toEqual('YELLOW');
        expect(service.winner(3)).toEqual('YELLOW');
        expect(service.winner(4)).toEqual('YELLOW');
        expect(service.winner(5)).toEqual('YELLOW');
        expect(service.winner(6)).toEqual('NONE');
      }
      expect(gb2.error).toBeUndefined();
    });

    it("should return winner for red with 5 vertical tokens place in center", () => {
      const gb2 = genBoard(` |
                           |   R
                           |   R
                           |   R
                           |   R
                           |   R
                           |-------`);
      if (gb2.error === undefined) {
        service.init(gb2.board);
        expect(service.winner(1)).toEqual('RED');
        expect(service.winner(2)).toEqual('RED');
        expect(service.winner(3)).toEqual('RED');
        expect(service.winner(4)).toEqual('RED');
        expect(service.winner(5)).toEqual('RED');
        expect(service.winner(6)).toEqual('NONE');
      }
      expect(gb2.error).toBeUndefined();
    });

    it("should return winner for yellow with 5 vertical tokens place in center", () => {
      const gb2 = genBoard(` |
                           |   Y
                           |   Y
                           |   Y
                           |   Y
                           |   Y
                           |-------`);
      if (gb2.error === undefined) {
        service.init(gb2.board);
        expect(service.winner(1)).toEqual('YELLOW');
        expect(service.winner(2)).toEqual('YELLOW');
        expect(service.winner(3)).toEqual('YELLOW');
        expect(service.winner(4)).toEqual('YELLOW');
        expect(service.winner(5)).toEqual('YELLOW');
        expect(service.winner(6)).toEqual('NONE');
      }
      expect(gb2.error).toBeUndefined();
    });

    it("should return winner for red with 5 vertical token place at the edge", () => {
      const gb2 = genBoard(` |
                           |      R
                           |      R
                           |      R
                           |      R
                           |      R
                           |-------`);
      if (gb2.error === undefined) {
        service.init(gb2.board);
        expect(service.winner(1)).toEqual('RED');
        expect(service.winner(2)).toEqual('RED');
        expect(service.winner(3)).toEqual('RED');
        expect(service.winner(4)).toEqual('RED');
        expect(service.winner(5)).toEqual('RED');
        expect(service.winner(6)).toEqual('NONE');
      }
      expect(gb2.error).toBeUndefined();
    });

    it("should return winner for yellow with 5 vertical token place at the edge", () => {
      const gb2 = genBoard(` |
                           |      Y
                           |      Y
                           |      Y
                           |      Y
                           |      Y
                           |-------`);
      if (gb2.error === undefined) {
        service.init(gb2.board);
        expect(service.winner(1)).toEqual('YELLOW');
        expect(service.winner(2)).toEqual('YELLOW');
        expect(service.winner(3)).toEqual('YELLOW');
        expect(service.winner(4)).toEqual('YELLOW');
        expect(service.winner(5)).toEqual('YELLOW');
        expect(service.winner(6)).toEqual('NONE');
      }
      expect(gb2.error).toBeUndefined();
    });
  });
  // Diagonal Tests
  describe('should winn diagonally', () => {
    it("should return winner for red with 2 tokens place in right diagonal", () => {
      const gb2 = genBoard(` |
                           |
                           |
                           |
                           | R
                           | YR
                           |-------`);
      if (gb2.error === undefined) {
        service.init(gb2.board);
        expect(service.winner(1)).toEqual('RED');
        expect(service.winner(2)).toEqual('RED');
        expect(service.winner(3)).toEqual('NONE');
      }
      expect(gb2.error).toBeUndefined();
    });

    it("should return winner for yellow with 5 tokens place in right diagonal", () => {
      const gb2 = genBoard(` |
                           |
                           |
                           |
                           | Y
                           | RY
                           |-------`);
      if (gb2.error === undefined) {
        service.init(gb2.board);
        expect(service.winner(1)).toEqual('YELLOW');
        expect(service.winner(2)).toEqual('YELLOW');
        expect(service.winner(3)).toEqual('NONE');
      }
      expect(gb2.error).toBeUndefined();
    });

    it("should return winner for red with 5 tokens place in left diagonal", () => {
      const gb2 = genBoard(` |
                           |
                           |
                           |
                           | R
                           |RY
                           |-------`);
      if (gb2.error === undefined) {
        service.init(gb2.board);
        expect(service.winner(1)).toEqual('RED');
        expect(service.winner(2)).toEqual('RED');
        expect(service.winner(3)).toEqual('NONE');
      }
      expect(gb2.error).toBeUndefined();
    });

    it("should return winner for yellow with 5 tokens place in left diagonal", () => {
      const gb2 = genBoard(` |
                           |
                           |
                           |
                           | Y
                           |YR
                           |-------`);
      if (gb2.error === undefined) {
        service.init(gb2.board);
        expect(service.winner(1)).toEqual('YELLOW');
        expect(service.winner(2)).toEqual('YELLOW');
        expect(service.winner(3)).toEqual('NONE');
      }
      expect(gb2.error).toBeUndefined();
    });
  });

  describe('win priority', () => {

    describe("check win priority horizontally", () => {
      it('red should win in priority with 3 horizontal tokens in a row', () => {
        const gb2 = genBoard(` |
                           |
                           |
                           | Y
                           | Y
                           | Y
                           |RRR
                           |-------`);
        if (gb2.error === undefined) {
          service.init(gb2.board);
          expect(service.winner(1)).toEqual('RED');
          expect(service.winner(2)).toEqual('RED');
          expect(service.winner(3)).toEqual('RED');
          expect(service.winner(4)).toEqual('NONE');
        }
        expect(gb2.error).toBeUndefined();
      });

      it('yellow should win in priority with 3 horizontal tokens in a row', () => {
        const gb2 = genBoard(` |
                           |
                           |
                           |  R
                           |  R
                           |  R
                           | YYY
                           |-------`);
        if (gb2.error === undefined) {
          service.init(gb2.board);
          expect(service.winner(1)).toEqual('YELLOW');
          expect(service.winner(2)).toEqual('YELLOW');
          expect(service.winner(3)).toEqual('YELLOW');
          expect(service.winner(4)).toEqual('NONE');
        }
        expect(gb2.error).toBeUndefined();
      });
    });
    describe("check win priority vertically", () => {
      it('red should win in priority with 3 vertical tokens in a row', () => {
        const gb2 = genBoard(` |
                           |
                           |
                           |
                           |RY
                           |RY
                           |RY
                           |-------`);
        if (gb2.error === undefined) {
          service.init(gb2.board);
          expect(service.winner(1)).toEqual('RED');
          expect(service.winner(2)).toEqual('RED');
          expect(service.winner(3)).toEqual('RED');
          expect(service.winner(4)).toEqual('NONE');
        }
        expect(gb2.error).toBeUndefined();
      });

      it('yellow should win in priority with 3 vertical tokens in row', () => {
        const gb2 = genBoard(` |
                           |
                           |
                           |
                           |YR
                           |YR
                           |YR
                           |-------`);
        if (gb2.error === undefined) {
          service.init(gb2.board);
          expect(service.winner(1)).toEqual('YELLOW');
          expect(service.winner(2)).toEqual('YELLOW');
          expect(service.winner(3)).toEqual('YELLOW');
          expect(service.winner(4)).toEqual('NONE');
        }
        expect(gb2.error).toBeUndefined();
      });
    });
    describe("check win priority diagonally", () => {
      it('red should win in priority with 3 tokens in left diagonal', () => {
        const gb2 = genBoard(` |
                           |
                           |
                           |
                           |  R
                           | RY
                           |RYYY
                           |-------`);
        if (gb2.error === undefined) {
          service.init(gb2.board);
          expect(service.winner(1)).toEqual('RED');
          expect(service.winner(2)).toEqual('RED');
          expect(service.winner(3)).toEqual('RED');
          expect(service.winner(4)).toEqual('NONE');
        }
        expect(gb2.error).toBeUndefined();
      });
      it("yellow should win in priority with 3 tokens in left diagonal", () => {
        const gb2 = genBoard(` |
                           |
                           |
                           |
                           |  Y
                           | YR
                           |YRRR
                           |-------`);
        if (gb2.error === undefined) {
          service.init(gb2.board);
          expect(service.winner(1)).toEqual('YELLOW');
          expect(service.winner(2)).toEqual('YELLOW');
          expect(service.winner(3)).toEqual('YELLOW');
          expect(service.winner(4)).toEqual('NONE');
        }
        expect(gb2.error).toBeUndefined();
      });
      it('red should win in priority with 3 tokens in right diagonal', () => {
        const gb2 = genBoard(` |
                           |
                           |
                           |
                           |R
                           |YR
                           |RYRYYY
                           |-------`);
        if (gb2.error === undefined) {
          service.init(gb2.board);
          expect(service.winner(1)).toEqual('RED');
          expect(service.winner(2)).toEqual('RED');
          expect(service.winner(3)).toEqual('RED');
          expect(service.winner(4)).toEqual('NONE');
        }
        expect(gb2.error).toBeUndefined();
      });
      it("yellow should win in priority with 3 tokens in right diagonal", () => {
        const gb2 = genBoard(` |
                           |
                           |
                           |
                           |Y
                           |RY
                           |YRYRRR
                           |-------`);
        if (gb2.error === undefined) {
          service.init(gb2.board);
          expect(service.winner(1)).toEqual('YELLOW');
          expect(service.winner(2)).toEqual('YELLOW');
          expect(service.winner(3)).toEqual('YELLOW');
          expect(service.winner(4)).toEqual('NONE');
        }
        expect(gb2.error).toBeUndefined();
      });
    });
  });

  it("no winner when starting", () => {
    service.init(empty7x5);
    expect(service.winner(1)).toEqual("NONE")
    expect(service.winner(2)).toEqual("NONE")
    expect(service.winner(3)).toEqual("NONE")
    expect(service.winner(4)).toEqual("NONE")
    expect(service.winner(5)).toEqual("NONE")
  });

  it("should not return winer if nb is not integer", () => {
    const gb2 = genBoard(` |
                           |
                           |
                           |
                           |
                           |RRR
                           |YYYR
                           |-------`);
    if (gb2.error === undefined) {
      service.init(gb2.board);
      expect(service.winner(1.2)).toEqual("NONE")
    }
  });
});*/
