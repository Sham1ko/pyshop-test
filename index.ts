const TIMESTAMPS_COUNT = 50000;

const PROBABILITY_SCORE_CHANGED = 0.0001;

const PROBABILITY_HOME_SCORE = 0.45;

const OFFSET_MAX_STEP = 3;

type Score = {
  home: number;
  away: number;
};

type Stamp = {
  offset: number;
  score: Score;
};

const emptyScoreStamp: Stamp = {
  offset: 0,
  score: {
    home: 0,
    away: 0,
  },
};

export const generateStamps = (): Stamp[] => {
  const scoreStamps = Array(TIMESTAMPS_COUNT)
    .fill(emptyScoreStamp)
    .map(
      ((acc) => () => {
        const scoreChanged = Math.random() > 1 - PROBABILITY_SCORE_CHANGED;
        const homeScoreChange =
          scoreChanged && Math.random() < PROBABILITY_HOME_SCORE ? 1 : 0;
        const awayScoreChange = scoreChanged && !homeScoreChange ? 1 : 0;
        return {
          offset: (acc.offset +=
            Math.floor(Math.random() * OFFSET_MAX_STEP) + 1),
          score: {
            home: (acc.score.home += homeScoreChange),
            away: (acc.score.away += awayScoreChange),
          },
        };
      })(emptyScoreStamp)
    );

  return scoreStamps;
};

export const getScore = (gameStamps: Stamp[], offset: number): Score => {
  let low = 0;
  let high = gameStamps.length - 1;
  let latestStampIndex = -1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (gameStamps[mid].offset <= offset) {
      latestStampIndex = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  if (latestStampIndex === -1) {
    return { home: 0, away: 0 };
  }

  return gameStamps[latestStampIndex].score;
};

const score = getScore(generateStamps(), 40);
console.log("Score:", score);
