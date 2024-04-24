"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScore = exports.generateStamps = void 0;
var TIMESTAMPS_COUNT = 50000;
var PROBABILITY_SCORE_CHANGED = 0.0001;
var PROBABILITY_HOME_SCORE = 0.45;
var OFFSET_MAX_STEP = 3;
var emptyScoreStamp = {
    offset: 0,
    score: {
        home: 0,
        away: 0,
    },
};
var generateStamps = function () {
    var scoreStamps = Array(TIMESTAMPS_COUNT)
        .fill(emptyScoreStamp)
        .map((function (acc) { return function () {
        var scoreChanged = Math.random() > 1 - PROBABILITY_SCORE_CHANGED;
        var homeScoreChange = scoreChanged && Math.random() < PROBABILITY_HOME_SCORE ? 1 : 0;
        var awayScoreChange = scoreChanged && !homeScoreChange ? 1 : 0;
        return {
            offset: (acc.offset +=
                Math.floor(Math.random() * OFFSET_MAX_STEP) + 1),
            score: {
                home: (acc.score.home += homeScoreChange),
                away: (acc.score.away += awayScoreChange),
            },
        };
    }; })(emptyScoreStamp));
    return scoreStamps;
};
exports.generateStamps = generateStamps;
var getScore = function (gameStamps, offset) {
    var low = 0;
    var high = gameStamps.length - 1;
    var latestStampIndex = -1;
    while (low <= high) {
        var mid = Math.floor((low + high) / 2);
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
var score = (0, exports.getScore)((0, exports.generateStamps)(), 40);
console.log("Score:", score);
