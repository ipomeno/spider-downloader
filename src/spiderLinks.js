import { getPageLinks } from './getPageLinks.js';
import { spider } from './spider.js';

/**
 * Realiza download sequenacial dos links dentro de uma página do site indicado para download, indo até a profundidade indicada em (nesting).
 * @param {String} url URL do site para download
 * @param {String} body Conteúdo HTML da url
 * @param {Number} nesting Profundidade atual do site para download
 * @param {Function} callback 
 * @returns 
 */
function spiderLinks (url, body, nesting, callback) {
  if (nesting == 0) {
    return process.nextTick(callback);
  }

  const links = getPageLinks(url, body);
  if (links.length === 0) {
    process.nextTick(callback);
  }

  function iterate(index) {
    if (index === links.length) {
      return callback();
    }

    spider(links[ index ], nesting -1, function(error) {
      if (error) {
        return callback(error);
      }

      iterate(index+1);
    });
  }

  iterate(0);
}

export { spiderLinks };