const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const keys = require('./config/keys')
const ToDoRouter = require('./routes/todo')

const app = express()

mongoose.connect(keys.mongoURI,
    { 
        useNewUrlParser: true ,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
  )
  .then(() => console.log('MongoDB connected.'))
  .catch(error => console.log(error)) 
   
mongoose.set('useFindAndModify', false)

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/todos', ToDoRouter)


module.exports = app