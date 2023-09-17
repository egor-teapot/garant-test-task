const path = require('node:path')
const express = require('express')
const app = express()
require('dotenv').config()

app.set('view cache', false); // Clear your application's cache
app.set('views', path.join(__dirname, 'views')); // Set the correct path to your views directory
app.set('view engine', 'ejs'); // Set your view engine (in this case, EJS)



app.get('/', (req, res) => {
    res.render('index')
})

const appStart = () => {
    app.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`))
}

appStart()

// module.exports = appStart