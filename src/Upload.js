const {Storage} = require('@google-cloud/storage'); // Imports the Google Cloud client library

process.env.GOOGLE_APPLICATION_CREDENTIALS = "src/service-account.json";

const bucketName = 'alpaca-350506.appspot.com'; // The ID of your GCS bucket

// Creates a client
const storage = new Storage();

async function uploadFile(filePath) {

  const destFileName = `temp-audio/${Date.now()}-${filePath.originalname}.mp3`;
  
  await storage.bucket(bucketName).upload(filePath, {
    destination: destFileName,
  });

  await storage.bucket(bucketName).file(destFileName).makePublic();

  //console.log(`${filePath} uploaded to ${bucketName}`);

  const string = `http://storage.googleapis.com/${bucketName}/${destFileName}`;
  
  return await string;
}

//uploadFile().catch(console.error);

module.exports = uploadFile;

 
