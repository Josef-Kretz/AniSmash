
const User = require('../models/User')
const main = {
    addLike : async (req, res) => {
        try{
            const user = await User.find({user: req.user})
            const animeId = req.body.animeId

            if(user[0].notLikes.includes(animeId)) user[0].notLikes = user[0].notLikes.filter(id => id != animeId)
            if(!user[0].likes.includes(animeId)) user[0].likes.push(animeId)

            user[0].save()

            res.status(200).json({isError: false, msg: 'Successfully updated'})
        }catch(err){
            console.log('err main addLike:', err)
        }
        
    },
    hate : async (req, res) => {
        try{
            const user = await User.find({user: req.user})
            const animeId = req.body.animeId
    
            if(user[0].likes.includes(animeId)) user[0].likes = user[0].likes.filter(id => id != animeId)
            if(!user[0].notLikes.includes(animeId)) user[0].notLikes.push(animeId)
    
            user[0].save()
    
            res.status(200).json({isError: false, msg: 'Successfully updated'})
        }catch(err){
            console.log('err main hate:', err)
        }

    },
    getProfile : async (req, res) => {
        try{
            const user = await User.find({user : req.user})

            res.status(200).json({
                email: user[0].email,
                likes : user[0].likes,
                notLikes : user[0].notLikes
            })
        }catch(err){
            console.log('err main getProfile:', err)
        }

    },
    eraseLikes : async (req, res) => {
        try{
            const user = await User.find({user : req.user})

            user[0].likes = []
            user[0].save()
    
            res.status(200).json('Successfully erased Liked Anime')
        }catch(err){
            console.log('err main eraseLikes:', err)
        }
    },
    eraseNotLikes : async (req, res) => {
        try{
            const user = await User.find({user : req.user})

            user[0].notLikes = []
            user[0].save()
    
            res.status(200).json('Successfully erase Not Liked Anime')
        }catch(err){
            console.log('err main eraseNotLikes:', err)
        }
    },
    deleteUser : async (req, res) => {
        try{
            await User.deleteOne({user : req.user})
            res.status(200).json('User is deleted')
        }catch(err){
            console.log('err main deleteUser:', err)
        }

    }
}

module.exports = main