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
        if(err) return res.json({error: err})
        if(!booksData) return res.json({msj: 'no books in data base'})
        let bookJSON =[]
        booksData.forEach(book => {
          bookJSON.push({
            '_id': book._id,
            'title': book.title,
            'commentcount': book.comments.length
          })
        })
        res.json(bookJSON)
      })
    })
    
    .post(function (req, res){
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      if(!title) return res.json({msj: 'missing required field title'})
      Book.create({title}, (err, bookData)=>{
        if(err) return res.json({error: err})
        res.json(bookData)
      })
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
