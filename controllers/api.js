//All requests made to the AniList GraphQL API 
//must be made as a POST request to 'https://graphql.anilist.co'.
//testing GraphQL https://anilist.co/graphiql

const api = {
    
    getTrailer: (req, res) => {

        res.status(200).json({
            yUrl : 'https://www.youtube.com/embed/jfKfPfyJRdk'
        })
    },
    checkUser : (req, res) => {
        if(req.isAuthenticated()) return res.status(200).json(true)
        return res.status(200).json(false)
    },
    rec: async (req, res) => {
        const AniSearch = require('./AniSearch')
        const data = await AniSearch.findRecommends(269)
        if(data.isError === true) return res.status(500).json('Error retrieving data from Animes Databases:', data)
        return res.status(200).json(data)
    },
    trending: async(req, res) => {
        const likes = [] //update to grab from db later
        const notLikes = [] //update to grab from db later

        const AniSearch = require('./AniSearch')
        const data = await AniSearch.findTrending(likes, notLikes)
        if(data.isError === true) return res.status(500).json('Error retrieving data from Animes Databases')
        return res.status(200).json(data)
    }
}

module.exports = api