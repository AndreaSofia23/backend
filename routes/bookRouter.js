const express = require ('express');
const booksController = require ('../controllers/bookController');
const bookSchema = require ('../validationsSchemas/booksValidations')
const bookValidator = require ('express-joi-validation').createValidator();


const routes = (Book) => {
    const bookRouter = express.Router();

    
    const { getBooks, postBooks , getBookById ,putBooks, deleteBookById} =booksController(Book);
    
    bookRouter.route('/books')
        .get( getBooks)
        .post(bookValidator.body(bookSchema),postBooks);

    bookRouter.route('/books/:bookId')
        .get( getBookById)
        .put(putBooks)
        .delete(deleteBookById)

    
    
      return bookRouter;
  }

  
  module.exports = routes;