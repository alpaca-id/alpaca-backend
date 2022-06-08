const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const uploadFile = require('./Upload');


process.env.GOOGLE_APPLICATION_CREDENTIALS = "src/service-account.json";

const client = new textToSpeech.TextToSpeechClient();

async function converttoMP3(text) {
   // The text to synthesize
  
   const outputFile = 'output.mp3';
   // Construct the request
   const request = {
     input: {text: text},
     // Select the language and SSML voice gender (optional)
     voice: {languageCode: 'id-ID', ssmlGender: 'FEMALE'},
     // select the type of audio encoding
     audioConfig: {audioEncoding: 'MP3'},
   };
  
   // Performs the text-to-speech request
   const [response] = await client.synthesizeSpeech(request);
   // Write the binary audio content to a local file
   const writeFile = util.promisify(fs.writeFile);
   await writeFile(outputFile, response.audioContent, 'binary');

   return await uploadFile(outputFile);
   

 }

  
 module.exports = converttoMP3;