# Node.js basics operations

## A simple node.js app demonstrating basic node.js operations:
- create, copy, rename and delete a file
- list the content of a directory
- read the content of a file and log it to the console
- parse environment variables
- parse command line arguments
- calculate hash for a given file
- read, write and transform data with Readable Stream, Writeable Stream and Transform Stream APIs
- compress and decompress files with gzip
- distribute heavy calculation task among worker processes
- spawn a child process, pass arguments to it and exchange input/output data between the parent and child processes

## Stack used:
- Node.js
- Stream API
- gzip
- worker_threads
- child_process

![Running commands in cli](screenshots/screenshot_cli.png)

## Installation
1. `git clone https://github.com/mlatysheva/node-nodejs-basics.git` to clone the repository to your local machine
2. `cd` into the cloned repository
3. run commands listed in `package.json` to execute the above operations by `npm run [command name]`

### File system (src/fs)

The following functions are implemented in dedicated files:
- `create.js` - implements a function that creates a new file `fresh.txt` with the content `I am fresh and young` inside of the `files` folder (if the file already exists an `Error` with the message `FS operation failed` is thrown)
- `copy.js` - implements a function that copies the folder `files` with all its content into the folder `files_copy` at the same level (if the `files` folder doesn't exist or the `files_copy` has already been created, an `Error` with the message `FS operation failed` is thrown)
- `rename.js` - implements a function that renames the file `wrongFilename.txt` into `properFilename` with the extension `.md` (if there's no `wrongFilename.txt` file or the `properFilename.md` file already exists, an `Error` with the message `FS operation failed` is thrown)
- `delete.js` - implements a function that deletes the file `fileToRemove.txt` (if there's no `fileToRemove.txt` file, an `Error` with the message `FS operation failed` is thrown)
- `list.js` - implements a function that prints the entire array of the filenames from the `files` folder into the console (if the `files` folder doesn't exist, an `Error` with the message `FS operation failed` is thrown)
- `read.js` - implements a function that prints the content of the `fileToRead.txt` file into the console (if there's no  `fileToRead.txt` file, an `Error` with the message `FS operation failed` is thrown)

### Command line interface(src/cli)

The following functions are implemented in dedicated files:

- `env.js` - implements a function that parses the environment variables with prefix `RSS_` and prints them to the console in the format `RSS_name1=value1; RSS_name2=value2`
- `args.js` - implements a function that parses the command line arguments (given in format `--propName value --prop2Name value2`, without validating the arguments) and prints them to the console in the format `propName is value, prop2Name is value2`

### Modules(src/modules)

The file is refactored into ECMAScript format and renamed to `esm.mjs`:

- `cjsToEsm.cjs` - rewritten to it's equivalent in ECMAScript notation (and renamed into `esm.mjs`)

### Hash (src/hash)

The following functions are implemented:

- `calcHash.js` - implements a function that calculates the SHA256 hash for the file `fileToCalculateHashFor.txt` and logs it into console as `hex`

### Streams (src/streams)

The following functions are implemented:

- `read.js` - implements a function that reads the content of the file `fileToRead.txt` using Readable Stream and prints its content into `process.stdout`
- `write.js` - implements a function that writes the `process.stdin` data into the file `fileToWrite.txt` using Writable Stream
- `transform.js` - implements a function that reads the data from `process.stdin`, reverses the text using Transform Stream and then writes it into `process.stdout`

### Zlib (src/zip)

The following functions are implemented:

- `compress.js` - implements a function that compresses the file `fileToCompress.txt` to `archive.gz` using `zlib` and Streams API
- `decompress.js` - implements a function that decompresses `archive.gz` back to the `fileToCompress.txt` with the same content as before compression using `zlib` and Streams API

### Worker Threads (src/wt)

The following functions are implemented:

- `worker.js` - the provided function is extended to work with the data received from the main thread and implements a function that sends the result of the computation to the main thread
- `main.js` - implements a function that creates the number of the worker threads (equal to the number of the host machine logical CPU cores) from the file `worker.js` and can send data to those threads and receive the result of the computation from them. An incremental number starting from `10` is sent to each `worker`. For example: on the host machine with **4** cores **4** workers are created and **10** is sent to the first `worker`, **11** to the second `worker`, **12** to the third `worker`, **13** to the fourth `worker`. After all workers finish their operations, the function logs an array of the results into the console. The results are an array of objects with 2 properties:
    - `status` - `'resolved'` - if the value was successfully received from the  `worker` or `'error'` - if there is an error in the `worker`
    - `data` - the value from the `worker` in case of success or `null` in case of an error in the worker  

The results in the array are logged in the same order in which the workers were created

### Child Processes (src/cp)

The following functions are implemented: 

- `cp.js` - implements a function `spawnChildProcess` that receives an array of arguments `args` and creates a child process from the file `script.js`, passing these `args` to it. This function creates an IPC-channel between `stdin` and `stdout` of the master process and the child process:
    - child process `stdin` receives the input from the master process `stdin`
    - child process `stdout` sends the data to the master process `stdout`

