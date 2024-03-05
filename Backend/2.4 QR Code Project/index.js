/**
 * 1. Use the inquirer npm package to get user input.
 * 2. Use the qr-image npm package to turn the user entered URL into a QR code image.
 * 3. Create a txt file to save the user input using the native fs node module.
 *
 * @format
 */

//Solution

// 1. Inquirer npm package

import inquirer from 'inquirer';
import qr from 'qr-image';
// var qr = require('qr-image');
import fs from 'fs';

inquirer
  .prompt([
    /* Pass your questions in here */
    {
      message: 'Type your input?',
      name: 'URL',
    },
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    // console.log(answers);
    const url = answers.URL;
    // console.log(url);
    // 2. Turn user answer into qr image
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream('qr_img.png'));

    // 3. Create a new file and save the user entered answer
    fs.writeFile('qr.txt', url, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });