
const User = require('../models/User')
const main = {
    addLike : async (req, res) => {
        const user = await User.find({user: req.user})
        const animeId = req.body.animeId

        if(user[0].notLikes.includes(animeId)) user[0].notLikes = user[0].notLikes.filter(id => id != animeId)
        if(!user[0].likes.includes(animeId)) user[0].likes.push(animeId)

        user[0].save()

        res.status(200).json({isError: false, msg: 'Successfully updated'})
    },
    hate : async (req, res) => {
        const user = await User.find({user: req.user})
        const animeId = req.body.animeId

        if(user[0].likes.includes(animeId)) user[0].likes = user[0].likes.filter(id => id != animeId)
        if(!user[0].notLikes.includes(animeId)) user[0].notLikes.push(animeId)

        user[0].save()

        res.status(200).json({isError: false, msg: 'Successfully updated'})
    },
    getProfile : async (req, res) => {
        const user = await User.find({user : req.user})

        return res.status(200).json({
            email: user[0].email,
            likes : user[0].likes,
            notLikes : user[0].notLikes
        })
    }
}

module.exports = main