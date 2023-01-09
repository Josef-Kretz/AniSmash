const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.json({message: 'Neat'})
})

app.listen(process.env.PORT, () => {
    console.log('Server listening on: ', process.env.PORT || 3001)
})