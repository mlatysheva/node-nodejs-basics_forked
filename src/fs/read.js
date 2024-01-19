import * as fs from 'fs/promises';
import { getResolvedPath } from '../utils/getResolvedPath.js';
import { throwErrorMessage } from '../utils/throwErrorMessage.js';
import { fileURLToPath } from 'url';

const read = async () => {
  try {
    const _filename = fileURLToPath(import.meta.url);
    const fileToRead = getResolvedPath(_filename, 'files', 'fileToRead.txt');
    const content = await fs.readFile(fileToRead, 'utf8');
    console.log(content);
  } catch(err) {
    throwErrorMessage('File "fileToRead.txt" does not exist.');
  }
};

await read();
