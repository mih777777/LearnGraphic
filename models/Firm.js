const mongoose = require('mongoose')
const Schema = mongoose.Schema

const firmSchema = new Schema({

    location: {
        type: String
    },
    firm: {
        type: String
    }


})


module.exports = mongoose.model('firm', firmSchema)