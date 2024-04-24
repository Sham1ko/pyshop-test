"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScore = exports.generateStamps = void 0;
const TIMESTAMPS_COUNT = 50000;
const PROBABILITY_SCORE_CHANGED = 0.0001;
const PROBABILITY_HOME_SCORE = 0.45;
const OFFSET_MAX_STEP = 3;
const emptyScoreStamp = {
    offset: 0,
    score: {
        home: 0,
        away: 0,
    },
};
const generateStamps = () => {
    const scoreStamps = Array(TIMESTAMPS_COUNT)
        .fill(emptyScoreStamp)
        .map(((acc) => () => {
        const scoreChanged = Math.random() > 1 - PROBABILITY_SCORE_CHANGED;
        const homeScoreChange = scoreChanged && Math.random() < PROBABILITY_HOME_SCORE ? 1 : 0;
        const awayScoreChange = scoreChanged && !homeScoreChange ? 1 : 0;
        return {
            offset: (acc.offset +=
                Math.floor(Math.random() * OFFSET_MAX_STEP) + 1),
            score: {
                home: (acc.score.home += homeScoreChange),
                away: (acc.score.away += awayScoreChange),
            },
        };
    })(emptyScoreStamp));
    return scoreStamps;
};
exports.generateStamps = generateStamps;
const getScore = (gameStamps, offset) => {
    let low = 0;
    let high = gameStamps.length - 1;
    let latestStampIndex = -1;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (gameStamps[mid].offset <= offset) {
            latestStampIndex = mid;
            low = mid + 1;
        }
        else {
            high = mid - 1;
        }
    }
    if (latestStampIndex === -1) {
        return { home: 0, away: 0 };
    }
    return gameStamps[latestStampIndex].score;
};
exports.getScore = getScore;
const score = (0, exports.getScore)((0, exports.generateStamps)(), 30000);
console.log("Score:", score);
