import { URL } from 'url';
import cheerio from 'cheerio';

/**
 * Cria o link local a partir de uma página e uma URL base (domínio).
 * @param {string} url URL ou link da página local do site.
 * @param {string} urlBase URL ou domínio principal do site.
 * @returns string URL completa da página incluindo o domínio principal do site.
 */
function createLocalLink(url, urlBase = null) {
  return new URL(url, urlBase).toString();
}

/**
 * Verifica se um link local está dentro de uma URL base ou domínio do site.
 * @param {string} urlBase URL principal ou domínio do site.
 * @param {string} urlLink URL de uma página interna
 * @returns boolean
 */
function isNotLocalLink(urlBase, urlLink) {
  const base = new URL(urlBase);
  const link = new URL(urlLink, urlBase);

  return (
    (base.hostname !== link.hostname) ||
    (!link.pathname)
  );
}

/**
 * Encontra o link interno completo de uma página num site.
 * @param {string} urlBase URL principal ou domínio de um site
 * @param {HTMLElement} tag Tag a contendo o link local do site
 * @returns {string}
 */
function getUrlLink (urlBase, tag) {
  const urlLink = tag.attribs.href || '';
  if (isNotLocalLink(urlBase, urlLink)) {
    return null;
  }

  return createLocalLink(urlLink, urlBase);
}

/**
 * Encontra a lista de links numa página de um site.
 * @param {string} currentUrl URL da página corrente num site.
 * @param {string} body HTML da página na currentUrl
 * @returns {Array<string>} Lista de links encontrados na página
 */
function getPageLinks (currentUrl, body) {
  const $ = cheerio.load(body);
  let result = Array.from($('a'));
  result = result.map((item) => { return getUrlLink(currentUrl, item) });
  result = result.filter((item) => { return (item); });
  return result;
}

export { getPageLinks };