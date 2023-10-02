import { URL } from 'url';
import slug from 'slug';
import path from 'path';

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

export { urlToFileName };