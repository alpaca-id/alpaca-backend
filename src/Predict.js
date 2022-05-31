const tf = require("@tensorflow/tfjs");

async function Predict(data){
   let model = await tf.loadLayersModel(
     "https://firebasestorage.googleapis.com/v0/b/alpaca-api-6323d.appspot.com/o/model.json?alt=media&token=04146ffc-3e21-4413-9c13-07ff87c0805a"
   );
   
   let input = tf.tensor1d(data);
   input = input.expandDims(0);
   return model.predict(input).dataSync();
 };

 module.exports = Predict;