import fs from 'fs';
import { urlToFileName } from './urlToFilename.js';
import { downloadPage } from './downloadPage.js';
import { spiderLinks } from './spiderLinks.js';

/**
 * Ponto inicial de execução do download das páginas da internet
 * @param {string} url Url para download
 * @param {integer} nesting Nível de profundidade do site para download
 * @param {function} callback 
 */
function spider(url, nesting, callback) {
  const filename = urlToFileName(url);
  fs.readFile(filename, 'utf8', (error, fileContent) => {
    if (error) {
      if (error.code !== 'ENOENT') {
        return callback(error);
      }

      return downloadPage(url, filename, (error, pageContent) => {
        if (error) {
          return callback(error);
        }

        return spiderLinks(url, pageContent, nesting, callback);
      });
    }

    return spiderLinks(url, fileContent, nesting, callback);
  });
}

export { spider };