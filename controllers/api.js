module.exports = {
    getTrailer: (req, res) => {
        res.status(200).json({
            yUrl : 'https://www.youtube.com/embed/jfKfPfyJRdk'
        })
    },
    checkUser : (req, res) => {
        console.log(req.session)
        res.status(200).json('checkuser called')
    }
}