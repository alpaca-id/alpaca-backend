const { response } = require('@hapi/hapi/lib/validation');
const { nanoid } = require('nanoid');
const books = require('./cerita/books.json');
const Predict = require('./Predict.js');
const converttoMP3 = require('./TextToSpeech.js');
const tf = require("@tensorflow/tfjs");
const fs = require('fs');
const { tensor, buffer } = require('@tensorflow/tfjs');


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
      'story' : book.story[0],
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


const getPredict = (request) => {

  //const {data} = request.query; //http://localhost:5000/predict?data={your path here}
  const path = './tes.jpg'
  const imageSize = 32
  const imageBuffer =  fs.readFileSync(path); 
  console.log(imageBuffer);    
    // can also use the async readFile instead
    // get tensor out of the buffer
    //image = tf.tensor3d()
    //const image = tf.buffer(imageBuffer); 
    //const buffer = image.toTensor()
    //console.log(buffer);
    //tf.node.decodeImage();
    // dtype to float
    //const dtype = tf.cast(buffer, 'float32');
    //console.log(dtype);
    // resize the image
    //const resize = tf.image.resizeBilinear(dtype, size = [imageSize, imageSize]);
    //console.log(resize); // can also use tf.image.resizeNearestNeighbor
    //const axis = resize.expandDims(); // to add the most left axis of size 1
    //console.log(axis);
    const hasil = Predict(imageBuffer);
    return hasil;
};



  
module.exports = {  
  getAllBooksHandler, 
  getBookByIdHandler,
  getPredict,
  upload,
};