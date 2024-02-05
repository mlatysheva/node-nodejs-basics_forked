import { Worker } from 'node:worker_threads';
import { getResolvedPath } from '../utils/getResolvedPath.js';
import os from 'node:os';
import { fileURLToPath } from 'url';
import { CONSOLE_COLORS } from '../constants/consoleColors.js';

const performCalculations = async () => {
  const _filename = fileURLToPath(import.meta.url);
  const workerFile = getResolvedPath(_filename, 'worker.js');
  const cpuCores = os.cpus().length;
  
  console.log(CONSOLE_COLORS.green, `Running with ${cpuCores} CPU cores...`);

  let promisifiedWorkers = [];
  
  for (let core = 0; core < cpuCores; core++) {
    const promisifiedWorker = new Promise((resolve, reject) => {
      const worker = new Worker(workerFile, { 
        workerData: { 
          n: 10 + core 
        }
      });
      worker.on('message', msg => {
        resolve(msg)});
      worker.on('error', err => reject(err));
    })
    promisifiedWorkers.push(promisifiedWorker);
  }

  const settledWorkers = await Promise.allSettled(promisifiedWorkers);

  const formattedResultsFromWorkers = settledWorkers.map(({ status, value }) => ({
    status: status === 'fulfilled' ? 'resolved' : 'error',
    data: status === 'fulfilled' ? value : null
  }));
  
  console.dir(formattedResultsFromWorkers);
};

await performCalculations();
