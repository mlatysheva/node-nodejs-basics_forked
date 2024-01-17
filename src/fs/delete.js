import * as fs from 'fs/promises';
import { getResolvedPath } from '../utils/getResolvedPath.js';
import { throwErrorMessage } from '../utils/throwErrorMessage.js';
import { doesExist } from '../utils/doesExist.js';
import { fileURLToPath } from 'node:url';
import { CONSOLE_COLORS } from '../constants/consoleColors.js';

const remove = async () => {
  try {
    const _filename = fileURLToPath(import.meta.url);
    const fileToRemove = getResolvedPath(_filename, 'files', 'fileToRemove.txt')
    const fileToRemoveExists = await doesExist(fileToRemove);
    if (fileToRemoveExists) {
      await fs.rm(fileToRemove);
      console.log(CONSOLE_COLORS.green, `File "fileToRemove.txt" was successfully deleted.`);
    } else {
      throwErrorMessage('File "fileToRemove.txt" does not exist.');
    }
  } catch(err) {
    console.error(err);
  }
}

await remove();
