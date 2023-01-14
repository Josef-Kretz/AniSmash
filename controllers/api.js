module.exports = {
    getTrailer: (req, res) => {
        res.status(200).json({
            yUrl : 'https://www.youtube.com/embed/jfKfPfyJRdk'
        })
    }
}