const { 
  getAllBooksHandler,
  getBookByIdHandler,
  upload,
 
} = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler,
  },
  {
    method : 'GET',
    path: '/upload',
    handler:upload,
  },
  
];
 
module.exports = routes;