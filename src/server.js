const path = require('node:path')
const express = require('express')
const app = express()
require('dotenv').config()

// app.use('/scripts', express.static(path.join(__dirname, '/scripts')))
app.use(express.static(path.resolve('./public')))


app.set('view cache', false); // Clear your application's cache
app.set('views', path.join(__dirname, 'views')); // Set the correct path to your views directory
app.set('view engine', 'ejs'); // Set your view engine (in this case, EJS)

const {router: indexPageData} = require('./routes/api/data/indexPageData') 

app.use('/api/index-page-data', indexPageData)

app.get('/', (req, res) => {
    res.render('root/index')
})

const appStart = () => {
    app.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`))
}

module.exports = {appStart}