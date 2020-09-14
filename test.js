const fsPromises = require('fs').promises;
const path = require('path');
const from =  './sysmlink/test.js';
const to = './elastic.js';
(async () => {
  try {
    console.log(from);
    await fsPromises.symlink(from, to, 'file');
    console.log('Symbolic link creation complete!');
  } catch (error) {
    console.error(error);
  }
})();
