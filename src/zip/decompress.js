import { createReadStream, createWriteStream } from 'fs';
import { createUnzip } from 'zlib';
import { throwErrorMessage } from '../utils/throwErrorMessage.js';
import { getResolvedPath } from '../utils/getResolvedPath.js';
import { pipeline } from 'stream/promises';
import { fileURLToPath } from 'url';
import { CONSOLE_COLORS } from '../constants/consoleColors.js';

const decompress = async () => {
  try {
    const _filename = fileURLToPath(import.meta.url);
    const fileToDecompress = getResolvedPath(_filename, 'files', 'archive.gz');
    const decompressedFile = getResolvedPath(_filename, 'files', 'fileToCompress.txt');
    const unzip = createUnzip();
    const source = createReadStream(fileToDecompress);
    const destination = createWriteStream(decompressedFile);

    await pipeline(source, unzip, destination); 
    console.log(CONSOLE_COLORS.green, `File "archive.gz" was successfully decompressed to "fileToCompress.txt"`);
    
  } catch (err) {
    throwErrorMessage(err);
  }
};

await decompress();
