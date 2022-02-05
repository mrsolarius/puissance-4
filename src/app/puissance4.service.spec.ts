import {TestBed} from '@angular/core/testing';
import {Board, genBoard, genBoardResult, initReturns, similarBoard, winnerReturns} from './puissance4.data';
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
      width: 5, height: 5, data: [
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

  /**
   * Should throw errors
   */
  //Check invalide magnitude
  //Check invalide data
  it("should throw error if array is empty", () => {
    const b: Board = {width: 1, height: 1, data: []};
    const R = service.init(b);
    expect(R.error).toEqual('invalid magnitudes');
    expect(service.board).toBeUndefined();
  });

  it("should throw an error if data don't have the same length", () => {
    const b: Board = {width: 5, height: 5, data: [[], [], [], []]};
    const R = service.init(b);
    expect(R.error).toEqual('invalid data');
    expect(service.board).toBeUndefined();
  });

  it("should throw error if array is empty with big width and height", () => {
    const b: Board = {width: 5, height: 5, data: []};
    const R = service.init(b);
    expect(R.error).toEqual('invalid magnitudes');
    expect(service.board).toBeUndefined();
  });

  it("should throw error if width dimension are smaller than array length", () => {
    const b: Board = {width: 4, height: 5, data: [['RED'], ['YELLOW']]};
    const R = service.init(b);
    expect(R.error).toEqual('invalid magnitudes');
    expect(service.board).toBeUndefined();
  });

  it("should throw error if height dimension are smaller than array column length", () => {
    const b: Board = {
      width: 5,
      height: 4,
      data: [['RED', 'YELLOW', 'RED', 'YELLOW', 'YELLOW'], ['YELLOW'], [], [], ['RED']]
    };
    const R = service.init(b);
    expect(R.error).toEqual('invalid magnitudes');
    expect(service.board).toBeUndefined();
  });

  it("should throw error if both dimensions are smaller than array length", () => {
    const b: Board = {width: 4, height: 3, data: [['RED', 'YELLOW', 'RED', 'YELLOW'], ['YELLOW']]};
    const R = service.init(b);
    expect(R.error).toEqual('invalid magnitudes');
    expect(service.board).toBeUndefined();
  });

  //Check invalide dimensions
  it("should throw error if width is negative", () => {
    const b: Board = {width: -2, height: 5, data: [['RED'], []]};
    const R = service.init(b);
    expect(R.error).toEqual('invalid magnitudes');
    expect(service.board).toBeUndefined();
  });

  it("should throw error if height is negative", () => {
    const b: Board = {width: 2, height: -5, data: [['RED'], []]};
    const R = service.init(b);
    expect(R.error).toEqual('invalid magnitudes');
    expect(service.board).toBeUndefined();
  });

  it("should return an error if x || y <= 0", () => {
    const b: Board = {width: 0, height: 0, data: []};
    const R = service.init(b);
    expect(R.error).toEqual('invalid magnitudes');
    expect(service.board).toBeUndefined();
  });

  it("should throw an error if both height and with are negative", () => {
    const b: Board = {width: -2, height: -5, data: [[], []]};
    const R = service.init(b);
    expect(R.error).toEqual('invalid magnitudes');
    expect(service.board).toBeUndefined();
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

  it("should not be possible to start with YELLOW", () => {
    service.init(empty7x5);
    const res = service.play('YELLOW', 1);
    expect(res.error).toEqual("not your turn");
  });

});

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

  it("no winner when starting", () => {
    service.init(empty7x5);
    expect(service.winner(1)).toEqual("NONE")
    expect(service.winner(2)).toEqual("NONE")
    expect(service.winner(3)).toEqual("NONE")
    expect(service.winner(4)).toEqual("NONE")
    expect(service.winner(5)).toEqual("NONE")
  });

});
