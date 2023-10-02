import fs from 'fs';
import path from 'path';

/**
 * Grava o conteúdo texto num arquivo em disco.
 * @param {string} filename Nome do arquivo para gravar em disco (path)
 * @param {string} content Conteúdo do arquivo (HTML)
 * @param {function} callback 
 */
function saveFile(filename, content, callback) {
  fs.mkdir(path.dirname(filename), (error) => {
    if (error) {
      return callback(error);
    }

    fs.writeFile(filename, content, callback);
  });
}

export { saveFile };