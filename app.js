const express = require('express')
const path = require('path')
const csrf = require('csurf')
const expressSession = require('express-session')

const createSessionConfig = require('./config/session')
const db = require('./data/database')
const authRoutes = require('./routes/auth.router')
const productsRoutes = require('./routes/products.routes')
const baseRoutes = require('./routes/base.routes')
const addCsrfTokenMiddleware = require('./middlewares/csrf-token')
const errorHandlerMiddleware = require('./middlewares/error.handler')
const checkAuthStatusMiddleware = require('./middlewares/check-auth')
const { check } = require('prettier')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

const sessionConfig = createSessionConfig()

app.use(expressSession(sessionConfig))
app.use(csrf())
app.use(addCsrfTokenMiddleware)
app.use(checkAuthStatusMiddleware)

app.use(baseRoutes)
app.use(authRoutes)
app.use(productsRoutes)

app.use(errorHandlerMiddleware)

db.connectToDatabase()
  .then(function () {
    app.listen(3000, () => console.log(`listening at http://localhost:3000`))
  })
  .catch(function (error) {
    console.log('Failed to connect to the Database...')
    console.log(error)
  })
