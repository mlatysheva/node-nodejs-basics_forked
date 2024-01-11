import { CONSOLE_COLORS } from '../constants/consoleColors.js';
export const throwErrorMessage = (message) => {
  console.error(CONSOLE_COLORS.red, message);
  throw new Error('FS operation failed');
}