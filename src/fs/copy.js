import * as fs from 'fs/promises';
import { doesExist } from "../utils/doesExist.js";
import { getResolvedPath } from '../utils/getResolvedPath.js';
import { throwErrorMessage } from '../utils/throwErrorMessage.js';
import { fileURLToPath } from 'node:url';
import { CONSOLE_COLORS } from '../constants/consoleColors.js';

const copy = async () => {
  try {
    const _filename = fileURLToPath(import.meta.url);
    console.log('_filename is ', _filename);
    const filesFolderPath = getResolvedPath(_filename, 'files');
    const filesCopyFolderPath = getResolvedPath(_filename, 'files_copy');
    const filesFolderExists = await doesExist(filesFolderPath);
    const filesCopyFolderExists = await doesExist(filesCopyFolderPath);
    if (filesFolderExists && !filesCopyFolderExists) {
      await fs.cp(filesFolderPath, filesCopyFolderPath, { recursive: true });
      console.log(CONSOLE_COLORS.green, 'Folder "files" has been successfully copied to folder "files_copy"');
    } else if (!filesFolderExists) {
      throwErrorMessage('Folder "files" does not exist');
    } else if (filesCopyFolderExists) {
      throwErrorMessage('Folder "files_copy" already exists');
    }
  } catch(err) {
    console.error(err);
  }
};

await copy();
