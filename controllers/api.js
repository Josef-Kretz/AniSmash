//All requests made to the AniList GraphQL API 
//must be made as a POST request to 'https://graphql.anilist.co'.
//testing GraphQL https://anilist.co/graphiql
const User = require('../models/User')
const api = {
    
    getTrailer: async (req, res) => {
        const AniSearch = require('./AniSearch')
        const user = await User.find({user: req.user})

        const data = await AniSearch.findTrending(user[0].likes, user[0].notLikes)
        if(data.isError) return res.status(500).json('Error retrieving data from Animes Databases')
        return res.status(200).json(data)
    },
    checkUser : (req, res) => {
        if(req.isAuthenticated()) return res.status(200).json(true)
        return res.status(200).json(false)
    },
    rec: async (req, res) => {
        const AniSearch = require('./AniSearch')
        const data = await AniSearch.findRecommends(269)
        if(data.isError) return res.status(500).json('Error retrieving data from Animes Databases')
        return res.status(200).json(data)
    },
    trending: async(req, res) => {
        const AniSearch = require('./AniSearch')
        const user = await User.find({user: req.user})

        const data = await AniSearch.findTrending(user[0].likes, user[0].notLikes)
        if(data.isError === true) return res.status(500).json('Error retrieving data from Animes Databases')
        return res.status(200).json(data)
    },
    getLibrary: async (req, res) => {
        const AniSearch = require('./AniSearch')
        const user = await User.find({user: req.user})
        const data = await AniSearch.getList(user[0].likes)

        return res.status(200).json(data)
    }
}

module.exports = api