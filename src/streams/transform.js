import { Transform } from 'stream';
import { pipeline } from 'stream/promises';
import { throwErrorMessage } from '../utils/throwErrorMessage.js';

export const transform = async () => {
  try {
    process.stdout.write('Enter text or type "exit" to exit the program:\n');  

    const reversedStream = new Transform();

    reversedStream._transform = (chunk, _, callback) => {  
      const entry = chunk.toString();
      if (entry.trim() === 'exit') {
        process.exit();
      }
      const reversedChunk = entry.split('').reverse().join('') + '\n';
      callback(null, reversedChunk);
    }
    await pipeline(process.stdin, reversedStream, process.stdout);
  } catch(err) {
    throwErrorMessage(err);
  }
};

await transform();
