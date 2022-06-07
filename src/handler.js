const books = require('./Cerita/books.json');
const converttoMP3 = require('./TextToSpeech.js');
const fs = require('fs');
//const {createUserWithEmailAndPassword} = require('./Register.js');





const getAllBooksHandler = (request, h) => {
  
  const {title, author} = request.query; //http://localhost:5000//books

  var Filter = books;

  if (title !== undefined) {
      Filter = Filter.filter((book) => book.name.toLowerCase().includes(title.toLowerCase()));
  }

  if (author !== undefined) {
    Filter = Filter.filter((book) => book.author.toLowerCase().includes(author.toLowerCase()));
  }

  
  const response = h.json({
    status: 'berhasil',
  data: {
    books : Filter.map((book)=>({
      'id': book.id,
      'title': book.title,
      'image': book.image,
      'author': book.author,
      'story' : book.story[0],
      'createdAt' : book.createat,
    })),
  },
 
  });
  response.status(200);
  return response;
};


const getBookByIdHandler = (request, h) => { 
  const id  = request.params.id;
  //const user_id = req.params.user_id;
    //http://localhost:5000//books/{id}

  const book = books.filter((n) => n.id === id)[0];

  if (book !== undefined) {

    //audio = book.audio;

    h.json({
      status: 'berhasil',
      data: {
        book,
      },
    });
    return;
  }
  const response = h.json({
    status: 'gagal',
    message: 'Buku tidak ditemukan',
  });
  response.status(404);
  return response;
};
  
const upload = async (request, h) => {
  
  const {text} = request.query; //http://localhost:5000/upload?text={your text here}

  audio = await converttoMP3(text);

  const response = h.json({
    audio,
  });
  response.status(200);
  return response; 

};

  
module.exports = {  
  getAllBooksHandler, 
  getBookByIdHandler,
  upload,
  
};