const express = require('express')
const path = require('path')

const db = require('./data/database')
const authRoutes = require('./routes/auth.router')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static('public'))
app.use(authRoutes)

app.get('/', (req, res) => {
  res.send('<h1>Working, Bitch</h1>')
})

db.connectToDatabase()
  .then(function () {
    app.listen(3000, () => console.log(`listening at http://localhost:3000`))
  })
  .catch(function (error) {
    console.log('Failed to connect to the Database...')
    console.log(error)
  })
