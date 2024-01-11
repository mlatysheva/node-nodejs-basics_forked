import * as fs from 'fs/promises';
import { getResolvedPath } from '../utils/getResolvedPath.js';
import { throwErrorMessage } from '../utils/throwErrorMessage.js';
import { fileURLToPath } from 'node:url';
import { CONSOLE_COLORS } from '../constants/consoleColors.js';

const create = async () => {
  try {
    const _filename = fileURLToPath(import.meta.url);
    const resolvedPath = getResolvedPath(_filename, 'files', 'fresh.txt');
    await fs.writeFile(resolvedPath, 'I am fresh and young', { flag: 'wx+' });
    console.log(CONSOLE_COLORS.green, `The file "fresh.txt" has been successfully written.`);
  } catch(err) {
    throwErrorMessage('The file "fresh.txt" already exists.');
  }
};

await create();