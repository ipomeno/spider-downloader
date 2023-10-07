import { spider } from './spider.js';

spider('https://olavodecarvalho.org/', 3, (error, filename, downloaded) => {
  if (error) {
    console.log(error);
    return;
  }

  if (downloaded) {
    console.log(`Completed the download of ${filename}.`);
    return;
  }

  console.log(`${filename} was already downloaded.`);
});