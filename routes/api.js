/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const Book = require('../models/book.js');
module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      Book.find({}, (err, booksData)=>{
        if(err) return res.status(404).json({error: err})
        if(!booksData) return res.status(404).json({msj: 'no books in data base'})
        let bookJSON =[]
        booksData.forEach(book => {
          bookJSON.push({
            '_id': book._id,
            'title': book.title,
            'commentcount': book.comments.length
          })
        })
        res.status(200).json(bookJSON)
      })
    })
    
    .post(function (req, res){
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      if(!title) return res.status(404).send('missing required field title')
      Book.create({title}, (err, bookData)=>{
        if(err) return res.status(404).json({error: err})
        res.status(200).json({title: bookData.title, _id: bookData._id})
      })
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
      Book.deleteMany({}, (err, d)=>{
        if(err || d.deletedCount == 0){
          return res.status(404).json({error: 'no book exists'})
        }
        res.status(200).send('complete delete successful')
      })
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      Book.findOne({_id: bookid}, {'__v': 0}, (err, bookData)=>{
        if(err || !bookData) return res.status(404).json({msj: 'no book exists'});
        res.status(200).json(bookData)
      })
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      if(!comment) return res.status(404).json({msj: 'missing required field comment'})
      Book.findById(bookid, {'__v': 0}, (err, bookData)=>{
        if(err || !bookData) return res.status(404).json({msj: 'no book exists'})
        bookData.comments.push(comment)
        bookData.save((err, data)=>{
          if(err) return res.status(404).json({error: err})
          res.status(200).json(data)
        })
      })
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      Book.deleteOne({_id: bookid}, (err, d)=>{
        if(err || d.deletedCount == 0){
          return res.status(404).send('no book exists')
        }
        res.status(200).send('delete successful')
      })
    });
  
};
