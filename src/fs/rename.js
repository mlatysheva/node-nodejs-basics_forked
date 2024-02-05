import * as fs from 'fs/promises';
import { getResolvedPath } from '../utils/getResolvedPath.js';
import { doesExist } from '../utils/doesExist.js';
import { throwErrorMessage } from '../utils/throwErrorMessage.js';
import { fileURLToPath } from 'node:url';
import { CONSOLE_COLORS } from '../constants/consoleColors.js';

const rename = async () => {
  try {
    const _filename = fileURLToPath(import.meta.url);
    const wrongFile = getResolvedPath(_filename, 'files', 'wrongFilename.txt');
    const properFile = getResolvedPath(_filename, 'files', 'properFilename.md');
    const wrongFileExists = await doesExist(wrongFile);
    const properFileExists = await doesExist(properFile);
    if (wrongFileExists && !properFileExists) {
      await fs.rename(wrongFile, properFile);
      console.log(CONSOLE_COLORS.green, 'The file "wrongFilename.txt" was successfully renamed into "properFilename.md"');
    } else if (!wrongFileExists) {
      throwErrorMessage('The file "wrongFilename.txt" does not exist');
    } else if (properFileExists) {
      throwErrorMessage('The file "properFilename.md" already exists');
    }
  } catch(err) {
    console.error(err);
  }
};

await rename();
