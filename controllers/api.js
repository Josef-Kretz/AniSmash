module.exports = {
    getTrailer: (req, res) => {
        res.status(200).json({
            yUrl : 'https://www.youtube.com/embed/jfKfPfyJRdk'
        })
    },
    checkUser : (req, res) => {
        if(req.isAuthenticated()) return res.status(200).json(true)
        return res.status(200).json(false)
    }
}