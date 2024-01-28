import { spawn } from 'node:child_process';
import { getResolvedPath } from '../utils/getResolvedPath.js';
import { fileURLToPath } from 'node:url';

const spawnChildProcess = async (args) => {
  try {
    const _filename = fileURLToPath(import.meta.url);
    const scriptToExecute = getResolvedPath(_filename, 'files', 'script.js');
    const child = spawn('node', [scriptToExecute, ...args]);

    process.stdin.on('data',(msg) => {
      if (msg.toString().trim() === 'CLOSE'.toLowerCase()) {
        process.exit(0);
      };
      child.stdin.write(msg); 
    });
    
    child.stdout.on('data',(msg) => {
      process.stdout.write(msg);
    });

    child.stdout.on('close', (code) => {
      process.exit(code);
    });
  } catch(err) {
    console.error(err);
  }  
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['rss', 'node.js', 'basics']);
