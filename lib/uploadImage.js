const axios = require('axios');
const FormData = require('form-data');
const { fromBuffer } = require('file-type');
let fs = require('fs') 

module.exports = async buffer => {
  try {
    // Detect file extension and MIME type from buffer
    const { ext, mime } = await fromBuffer(buffer);
    
    if (!ext || !mime) {
      throw new Error('Unable to determine file type from buffer.');
    }

    // Create form data
    let form = new FormData();
    form.append('image', buffer, {
      filename: `upload.${ext}`, // Name the file with the detected extension
      contentType: mime // Provide the MIME type based on file
    });

    // Send POST request with axios
    const response = await axios.post('https://files.zxcoderid.my.id/api2image', form, {
      headers: {
        ...form.getHeaders(), // Add headers from FormData
      }
    });

    // Get URL from response JSON
    if (response.data && response.data.url) {
      return response.data.url;  // Return the uploaded image URL
    } else {
      throw new Error('URL not found in the response.');
    }
  } catch (error) {
    throw new Error('Error uploading file: ' + error.message);
  }
};

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})
