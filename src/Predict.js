const tf = require("@tensorflow/tfjs");

async function Predict(img){
  let model = await tf.loadLayersModel(
    "https://firebasestorage.googleapis.com/v0/b/alpaca-350506.appspot.com/o/Model-ML%2FOCR%20document%2Fmodel.json?alt=media&token=5165eefd-c485-4532-ae96-0bf0bf0a2c41"
  );
 
  let input = tf.tensor3d(img);
  input = input.expandDims(0);
  return await model.predict(input).dataSync();
   
}
 module.exports = Predict;