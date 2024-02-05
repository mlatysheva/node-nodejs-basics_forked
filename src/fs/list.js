import * as fs from 'fs/promises';
import { doesExist } from '../utils/doesExist.js';
import { getResolvedPath } from '../utils/getResolvedPath.js';
import { throwErrorMessage } from '../utils/throwErrorMessage.js';
import { fileURLToPath } from 'node:url';
import { CONSOLE_COLORS } from '../constants/consoleColors.js';

const list = async () => {
  try {
    const _filename = fileURLToPath(import.meta.url);
    const folder = getResolvedPath(_filename, 'files');
    const filesFolderExists = await doesExist(folder);
    if (filesFolderExists) {
      (await fs.readdir(folder, { withFileTypes: true }))
        .forEach((file) => {
          console.log(CONSOLE_COLORS.green, file.name);
      });
    } else {
      throwErrorMessage('Folder "files" does not exist');
    }
  } catch(err) {
    console.error(err);
  }
};

await list();
