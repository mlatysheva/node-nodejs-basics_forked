import path, { dirname } from 'node:path';

export const getResolvedPath = (_filename, ...paths) => {
  const _dirname = dirname(_filename);
  console.log(_dirname);
  const resolvedPath = path.join(_dirname, ...paths);
  return resolvedPath;
}