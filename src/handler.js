const { response } = require('@hapi/hapi/lib/validation');
const { nanoid } = require('nanoid');
const books = require('./books');
const tf = require("@tensorflow/tfjs");


const getAllBooksHandler = (request, h) => {
  
  const {title, author} = request.query;

  var Filter = books;

  if (title !== undefined) {
      Filter = Filter.filter((book) => book.name.toLowerCase().includes(title.toLowerCase()));
  }

  if (author !== undefined) {
    Filter = Filter.filter((book) => book.author.toLowerCase().includes(author.toLowerCase()));
  }

  

  const response = h.response({
    status: 'success',
  data: {
    books : Filter.map((book)=>({
      'id': book.id,
      'title': book.title,
      'image': book.image,
      'author': book.author,
    })),
    
  },
  });
  response.code(200);
  return response;
};


const getBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const book = books.filter((n) => n.id === id)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const getPredict = (request, response, h) => {

  response.code(200);
  return response;
};

async function Predict(data){
  let model = await tf.loadLayersModel(
    "https://firebasestorage.googleapis.com/v0/b/alpaca-api-6323d.appspot.com/o/model.json?alt=media&token=04146ffc-3e21-4413-9c13-07ff87c0805a"
  );
  
  let input = tf.tensor1d(data);
  input = input.expandDims(0);
  return model.predict(input).dataSync();
};



  
module.exports = {  
  getAllBooksHandler, 
  getBookByIdHandler,
  getPredict,
};