const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({

    title: {
        type: String
    },
    count: {
        type: Number
    }


})


module.exports = mongoose.model('todos', todoSchema)