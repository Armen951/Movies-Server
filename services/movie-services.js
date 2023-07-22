const axios = require('axios');
require('dotenv').config();

async function getMovies(params={}) {
    try {
        let BASE_URL = process.env.MOVIE_BASE_URL
       const {data} = await axios.get(BASE_URL,{
           params : {
               i : process.env.MOVIE_IMB,
               apikey : process.env.MOVIE_API_KEY,
               ...params
           }
       });
       return data
    } catch (e) {
        console.log(e);
       return e;
    }
}

module.exports = {
    getMovies
};
