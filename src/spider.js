import fs from 'fs';
import { urlToFileName } from './urlToFilename.js';
import { downloadPage } from './downloadPage.js';

function spider(url, callback) {
  const filename = urlToFileName(url);
  fs.access(filename, (error) => {
    if (!error || error.code !== 'ENOENT') {
      return callback(null, filename, false);
    }

    return downloadPage(url, filename, (error) => {
      if (error) {
        return callback(error)
      }

      return callback(null, filename, true);
    });
  });
}

export { spider };