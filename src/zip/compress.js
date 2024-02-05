import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'node:zlib';
import { throwErrorMessage } from '../utils/throwErrorMessage.js';
import { getResolvedPath } from '../utils/getResolvedPath.js';
import { pipeline } from 'stream/promises';
import { fileURLToPath } from 'node:url';
import { CONSOLE_COLORS } from '../constants/consoleColors.js';

const compress = async () => {
  try { 
    const _filename = fileURLToPath(import.meta.url);
    const fileToCompress = getResolvedPath(_filename, 'files', 'fileToCompress.txt');
    const compressedFile = getResolvedPath(_filename, 'files', 'archive.gz');
    const gzip = createGzip();
    const source = createReadStream(fileToCompress);
    const destination = createWriteStream(compressedFile);

    await pipeline(source, gzip, destination);
    console.log(CONSOLE_COLORS.green, `File "fileToCompress.txt" was successfully compressed to "archive.gz"`);

  } catch(err) {
    throwErrorMessage(err);
  }
};

await compress();
