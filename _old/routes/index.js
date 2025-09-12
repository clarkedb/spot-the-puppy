var express = require('express');
var fs = require('fs');
var router = express.Router();
var request = require('request');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('index.html', { root: 'public' });
});

router.get('/scores', function(req, res, next) {
    var level = req.query['level'];
    var score = parseInt(req.query['score']);
    var player = req.query['player'];
    
    if (level == "all") {
        res.status(200).json(scores);
    }
    if (level == "champs") {
        champs.push({score: score, player: player});
        res.status(200).json(champs);
    }
    level = parseInt(level);
    level -= 1;
    if (level < scores.length && level >= 0) {
        var inserted = false;
        var scores2 = [];
        for (var j = 0; j < 5; j++) {
            scores2.push(scores[level][level+1][j]);
        }
        for (var i = 0; i < 5; i++) {
            if(score > scores[level][level+1][i]["score"] && !inserted) {
                for (var k = i + 1; k < 5; k++) {
                    scores[level][level+1][k] = scores2[k-1];
                }
                scores[level][level+1][i] = {score: score, player: player}; 
                inserted = true;
            }
        }
        res.status(200).json(scores[level]);
    }
    else {
        res.status(404).json({error: "Not a level"});
    }
});

router.get('/high_score', function(req, res, next) {
    var score = parseInt(req.query['score']);
    var player = req.query['player'];
    if (score > high_score["score"]) {
        high_score = {score: score, player: player};
    }
    res.status(200).json(high_score);
});

router.get('/high_level', function(req, res, next) {
    var level = parseInt(req.query['level']);
    var player = req.query['player'];
    if (level > high_level["level"]) {
        high_level = {level: level, player: player};
    }
    res.status(200).json(high_level);
});

var high_score = {score: 100, player: "R2-D2"};
var high_level = {level: 1, player: "Ferb"};

var scores = [
    {1: [{score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}]},
    {2: [{score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}]},
    {3: [{score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}]},
    {4: [{score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}]},
    {5: [{score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}]},
    {6: [{score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}]},
    {7: [{score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}]},
    {8: [{score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}]},
    {9: [{score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}]},
    {10: [{score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}]},
    {11: [{score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}]},
    {12: [{score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}]},
    {13: [{score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}]},
    {14: [{score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}]},
    {15: [{score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}]},
    {16: [{score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}]},
    {17: [{score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}]},
    {18: [{score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}]},
    {19: [{score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}]},
    {20: [{score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}, {score: 100, player: "Anonymous"}]}
];

var champs = [
    {score: 5000, player: "Clark Brown"}
];

module.exports = router;