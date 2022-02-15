const booksController = (Book) => {
  
  const getBooks = async (req,res) => {
      const { query } =req;
      const response = await Book.find(query)
      res.json(response);
  }
   
  const postBooks = async (req,res) => {
      const book = new Book(req.body);
      await book.save();
      res.json(book);
      }
  
  const getBookById = async (req,res) => {
      const response = await Book.findById(req.params.bookId);
      console.log(response);
      res.json(response);
    };

  const putBooks = async (req,res) =>{
      const { body } = req;
      const response = await Book.updateOne({
            _id: req.params.bookId
          }, {
                $set:{
                title: body.title,
                genre: body.genre,
                author: body.author,
                read: body.read
            }
        })

        res.status(202).json({message:'The book has been update sucessfully',
                                response});
    };
    
  const deleteBookById = async (req,res) =>{
        const id = req.params.bookId;
        await Book.findByIdAndDelete(id);
        res.status(202).json('The book has been delete sucessfully');
    }
  


  return{ getBooks,postBooks,getBookById,putBooks,deleteBookById};
}
module.exports = booksController;