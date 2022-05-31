const { 
  getAllBooksHandler,
  getBookByIdHandler,
  getPredict,
  upImage,
 
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
    method : 'POST',
    path: '/predict',
    handler: getPredict,
  },
  {
    method : 'POST',
    path: '/upload',
    handler:upImage,
  },
  
];
 
module.exports = routes;