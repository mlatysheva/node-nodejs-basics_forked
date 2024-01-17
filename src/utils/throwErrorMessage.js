import { CONSOLE_COLORS } from '../constants/consoleColors.js';
export const throwErrorMessage = (message) => {
  if (!message) {
    throw new Error('FS operation failed');
  } else {
    console.error(CONSOLE_COLORS.red, message);
    throw new Error('FS operation failed');
  }
}
