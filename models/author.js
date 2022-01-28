const mongoose = require('mongoose');
const Book = require('./book')

const authorSchema = new mongoose.Schema({
name: {
    type: String,
    required: true
}
})
///addded not$ git commit -m "Added function to allow Users to say 'Hello World'"

authorSchema.pre('remove', function(next) {
    Book.find({ author: this.id}, (err, books) => {
        if (err){
            next(err)
        } else if (books.length > 0){
            next(new Error('This author has books still'))
        } else {
            next()
        }
    })
    })

module.exports = mongoose.model('Author', authorSchema)