
const User = require('../models/User')
const main = {
    addLike : async (req, res) => {
        const user = await User.find({user: req.user})
        
    }
}

module.exports = main