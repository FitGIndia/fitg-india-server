//Imports
require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('colors')

//My routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const gymRoutes = require('./routes/gym')

// var corsOptions = {
//   origin: "*",
//   optionsSuccessStatus: 200
// }

//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((conn) => {
    console.log(`DB CONNECTED: ${conn.connection.host}`.cyan.underline)
  })
  .catch((error) => {
    console.log(`Error: ${error.message}`.red.bold)
    process.exit(1)
  })

//Middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//My Routes
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', gymRoutes)

//PORT
const port = process.env.PORT || 8000

//Starting a server
app.listen(port, () => {
  console.log(
    `Server is up & running in ${process.env.NODE_ENV} at port ${port}`.yellow
      .bold
  )
})
