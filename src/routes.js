const { 
  getAllBooksHandler,
  getBookByIdHandler,
  getPredict,
 
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
  
];
 
module.exports = routes;