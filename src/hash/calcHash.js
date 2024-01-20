import { createHash } from 'crypto';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { getResolvedPath } from '../utils/getResolvedPath.js';
import { CONSOLE_COLORS } from '../constants/consoleColors.js';

const calculateHash = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const fileToHash = getResolvedPath(__filename, 'files', 'fileToCalculateHashFor.txt');
    const content = await readFile(fileToHash);
    const hash = createHash('sha256').update(content).digest('hex');
    console.log(CONSOLE_COLORS.green, `The hash for the file "fileToCalculateHashFor.txt" is ${hash}`);
  } catch(err) {
    console.error(err);
  }  
}

await calculateHash();
