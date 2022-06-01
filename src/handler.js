const { response } = require('@hapi/hapi/lib/validation');
const { nanoid } = require('nanoid');
const books = require('./cerita/books.json');
const Predict = require('./Predict.js');
const converttoMP3 = require('./TextToSpeech.js');

const getAllBooksHandler = (request, h) => {
  
  const {title, author} = request.query; //http://localhost:5000//books

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
      'story' : book.story[0].line1,
      'createdAt' : book.createat,
    })),
  },
 
  });
  response.code(200);
  return response;
};


const getBookByIdHandler = (request, h) => { 
  const { id } = request.params;    //http://localhost:5000//books/{id}

  const book = books.filter((n) => n.id === id)[0];

  if (book !== undefined) {

    //audio = book.audio;

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
  
const upload = async (request, h) => {
  
  const {text} = request.query; //http://localhost:5000/upload?text={your text here}

  audio = await converttoMP3(text);

  const response = h.response({
    audio,
  });
  response.code(200);
  return response; 

};


const getPredict = (request, h) => {

  const {data} = request.query;

  data = data.split(',');
  let df = [];

  data.forEach((e) => {
    df.push(parseInt(e));
  });

  Predict(df).then((pred) => {
    h.status(200).send({ prob: pred[0] });
  });
};



  
module.exports = {  
  getAllBooksHandler, 
  getBookByIdHandler,
  getPredict,
  upload,
};