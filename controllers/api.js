module.exports = {
    getTrailer: (req, res) => {
        res.status(200).json({
            yUrl : 'https://www.youtube.com/embed/jfKfPfyJRdk'
        })
    },
    checkUser : (req, res) => {
        console.log(req.user)
        res.status(200).json("i'm trying")
    }
}