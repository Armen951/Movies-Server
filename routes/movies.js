require('dotenv').config();
const express = require('express');
const movieService = require("../services/movie-services");
const redisCache = require('redis').createClient({ url: process.env.REDIS_URL });

const router = express.Router();

redisCache.on('connect', () => console.log('Connected to Redis!'));
redisCache.on('error', (err) => console.log('Redis Client Error', err));
redisCache.connect();

router.get('/', async (req, res) => {
    const CACHE_KEY = `movies${JSON.stringify(req.query)}`;

    try {
        const data = await redisCache.get(CACHE_KEY);

        if (!data) {
            try {
                const movies = await movieService.getMovies(req.query);
                redisCache.set(CACHE_KEY, JSON.stringify(movies));
                res.json(movies);
            } catch (error) {
                res.status(500).json({ error: 'Failed to fetch movies' });
            }
        } else {
            res.json(JSON.parse(data));
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Unexpected error occurred' });
    }
});

module.exports = router;
