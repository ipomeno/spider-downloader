import fs from 'fs';
import path from 'path';
import { URL } from 'url';
import superagent from 'superagent';
import slug from 'slug';

/**
 * Converte uma URL para um nome de arquivo.
 * @param {string} url URL de um site qualquer
 * @returns {string} URL convertida para nome de arquivo
 */
function urlToFileName(url) {
  const parseUrl = new URL(url);
  let result = parseUrl.pathname.split('/');
  result = result.filter((part) => {
    return (part !== '');
  });

  result = result.map((part) => {
    return slug(part, { remove: null });
  });

  result = result.join('/');
  result = path.join(parseUrl.hostname, result);
  if (!path.extname(result).match(/html/)) {
    result = result + '.html';
  }

  return `./files/${result}`;
}

function spider(url, callback) {
  const filename = urlToFileName(url);
  fs.access(filename, (error) => {
    if (error && error.code === 'ENOENT') {
      console.log(`Baixando ${url} into ${filename}.`);
      superagent.get(url).end((error, result) => {
        if (error) {
          callback(error);
        }
        else {
          fs.mkdir(path.dirname(filename), {recursive: true}, (error) => {
            if (error) {
              callback(error);
            }
            else {
              callback(null, filename, true);
            }
          });
        }
      });
    }
    else {
      callback(null, filename, false);
    }
  });
}

spider('http://google.com.br', (error, filename, downloaded) => {
  if (error) {
    console.log(error);
  }
  else if (downloaded) {
    console.log(`Completed the download of ${filename}.`);
  }
  else {
    console.log(`${filename} was already downloaded.`);
  }
});