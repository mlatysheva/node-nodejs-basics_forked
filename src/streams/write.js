import { createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { getResolvedPath } from '../utils/getResolvedPath.js';

export const write = async () => {
  try {
    const _filename = fileURLToPath(import.meta.url);
    const fileToWrite = getResolvedPath(_filename, 'files', 'fileToWrite.txt');

    process.stdout.write('Enter text or type "exit" to quit:\n');

    const writeableStream = createWriteStream(fileToWrite);

    process.stdin.on('data', (input) => {
      const entry = input.toString();
      if (entry.trim() === 'exit') {
        process.exit();
      } else {
        writeableStream.write(entry);
      }
    });
  } catch(err) {
    console.error(err);
  }
};

await write();
