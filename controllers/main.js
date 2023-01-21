
const User = require('../models/User')
const main = {
    addLike : async (req, res) => {
        const user = await User.find({user: req.user})
        user[0].likes.push(req.body.animeId)
        user[0].save()

        res.status(200).json({isError: false, msg: 'Successfully updated'})
    },
    hate : async (req, res) => {
        const user = await User.find({user: req.user})
        user[0].notLikes.push(req.body.animeId)
        user[0].save()

        res.status(200).json({isError: false, msg: 'Successfully updated'})
    }
}

module.exports = main