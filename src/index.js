import { spider } from './spider.js';

spider('http://google.com.br', (error, filename, downloaded) => {
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