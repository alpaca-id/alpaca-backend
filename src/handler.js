const { response } = require('@hapi/hapi/lib/validation');
const { nanoid } = require('nanoid');
const books = require('./cerita/books.json');
const Predict = require('./Predict.js');
const converttoMP3 = require('./TextToSpeech.js');

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
    status: 'berhasil',
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

    //audio = book.audio;

    //suara = converttoMP3('Jericho Ganteng') ;

    return {
      status: 'berhasil',
      data: {
        book,
      },
    };
    
  }
  const response = h.response({
    status: 'gagal',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const upImage = () =>{

  
  return ;


}

const getPredict = (request, h) => {

  h.code(200);
  return h;
};



  
module.exports = {  
  getAllBooksHandler, 
  getBookByIdHandler,
  getPredict,
  upImage,
};