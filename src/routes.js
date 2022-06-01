const { 
  getAllBooksHandler,
  getBookByIdHandler,
  getPredict,
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
    path: '/predict',
    handler: getPredict,
  },
  {
    method : 'GET',
    path: '/upload',
    handler:upload,
  },
  
];
 
module.exports = routes;