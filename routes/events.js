const express = require('express');
const router = express.Router();
const {validationResult } = require('express-validator');
const apiHandler = require("./apiHandler").apiHandler;
const eventsController = require("../controller/eventsController");
const routerUtil = require("../utils/routerUtil");

router.get('/getGames', async (req, res) => {
    const games = await eventsController.getGames();
    res.json(games);
});

router.get('/getGames', async (req, res) => {
    const games = await eventsController.getGames();
    res.json(games);
});

router.get('/getSeries', async (req, res) => {
    const sportId = req.query.sport_id;
    const series = await eventsController.getSeries(sportId);
    res.json(series);
});

router.get('/getMatches', async (req, res) => {
    const seriesId = req.query.series_id;
    const gameId = req.query.game_id;
    const matches = await eventsController.getMatches(seriesId, gameId);
    res.json(matches);
});

router.get('/getFancy', async (req, res) => {
    const matchId = req.query.matchId;
    const fancy = await eventsController.getFancy(matchId);
    res.json(fancy);
});

router.get('/getBM', async (req, res) => {
    const matchId = req.query.matchId;
    const bm = await eventsController.getBM(matchId);
    res.json(bm);
});

router.get('/getOddsList', async (req, res) => {
    const marketId = req.query.marketid;
    const oddsList = await eventsController.getOddsList(marketId);
    res.json(oddsList);
});

router.get('/getMarket', async (req, res) => {
    const matchId = req.query.match_id;
    const market = await eventsController.getMarket(matchId);
    res.json(market);
});

module.exports = router;