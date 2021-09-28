const express = require('express')
const Author = require('../models/author')
const router = express.Router()

//All Authors
router.get('/', async (req,res) => {
    let searchOptions = {}
    if(req.query.name !=null && req.query != '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', { authors: authors, searchOptions: req.query})
    } catch (error) {
       res.redirect('/')
       
    }
    
})
//New Author 
router.get('/new', (req,res) => {
    res.render('authors/new', { author: new Author()})
})
//Create Author Route
router.post('/', async (req,res) => {
    const author = new Author({
        name: req.body.name
    }) 
    try {
        const newAuthor = await author.save()
          // res.redirect(`authors/${newAuthor.id}`)
          res.redirect('authors')
    } catch (error) {
        let locals = {errorMessage: 'Error Creating Author'}
            res.render('authors/new', {
                author: author,
                locals: locals
               
            })
        
    }
   
  
})

module.exports = router