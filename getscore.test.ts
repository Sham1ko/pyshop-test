import { getScore } from ".";

describe("getScore", () => {
  const gameStamps = [
    { offset: 0, score: { home: 0, away: 0 } },
    { offset: 10, score: { home: 1, away: 0 } },
    { offset: 20, score: { home: 1, away: 1 } },
    { offset: 30, score: { home: 2, away: 1 } },
  ];

  test("should return correct score when offset is equal to one of the timestamps", () => {
    expect(getScore(gameStamps, 10)).toEqual({ home: 1, away: 0 });
  });

  test("should return initial score when offset is less than the first timestamp", () => {
    expect(getScore(gameStamps, 5)).toEqual({ home: 0, away: 0 });
  });

  test("should return latest score when offset is greater than the last timestamp", () => {
    expect(getScore(gameStamps, 40)).toEqual({ home: 2, away: 1 });
  });

  test("should return initial score when there are no timestamps and offset is 0", () => {
    expect(getScore([], 0)).toEqual({ home: 0, away: 0 });
  });

  test("should return initial score when there are no timestamps and offset is greater than 0", () => {
    expect(getScore([], 10)).toEqual({ home: 0, away: 0 });
  });

  test("should return initial score when gameStamps is an empty array", () => {
    expect(getScore([], 0)).toEqual({ home: 0, away: 0 });
  });
});
