const fsPromises = require('fs').promises;
const path = require('path');
const from = path.join(__dirname, '/sysmlink/test.js');
const to = './elasticSearch.js';
(async () => {
  try {
    console.log(from);
    await fsPromises.symlink(from, to, 'file');
    console.log('Symbolic link creation complete!');
  } catch (error) {
    console.error(error);
  }
})();
