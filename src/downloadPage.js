import superagent from 'superagent';
import { saveFile } from "./saveFile.js";

/**
 * Realiza o download da página web w grava em disco.
 * @param {string} url URL para download da página web
 * @param {string} filename Caminho para gravar a página web wm aquivo (path)
 * @param {funciton} callback 
 */
function downloadPage(url, filename, callback) {
  console.log('download', url);
  superagent.get(url).end((error, result) => {
    if (error) {
      return callback(error);
    }

    saveFile(filename, result.text, callback);
  });
}

export { downloadPage };