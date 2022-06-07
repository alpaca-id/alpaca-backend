const express = require('express');
const router = express.Router();
const { 
  getAllBooksHandler,
  getBookByIdHandler,
  upload,
 
} = require('./handler');

router.get('/books',getAllBooksHandler);
router.get('/books/:id',getBookByIdHandler);
router.get('/upload',upload);



 
module.exports = router;