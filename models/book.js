require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGO_URI)

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'must have a title'],
        trim: true
    },
    comments:[{
        type: String,
        trim: true
    }]
})

module.exports = mongoose.model('Book', bookSchema)