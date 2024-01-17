import * as fs from 'fs/promises';

export const doesExist = async (path) => {
  try {
    await fs.access(path);
    return true;
  } catch (err) {
    return false;
  }  
}
