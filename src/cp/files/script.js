const args = process.argv.slice(2);

console.log(`Total number of arguments is ${args.length}`);
console.log(`Arguments: ${JSON.stringify(args)}`);
process.stdout.write(`Enter text into console. To exit type "CLOSE":\n`);

const echoInput = (chunk) => {
  const chunkStringified = chunk.toString();
  if (chunkStringified.includes('CLOSE')) {
    process.exit(0);
  };

  process.stdout.write(`Received from master process: ${chunk.toString()}\n`);
  process.stdout.write(`Enter text into console. To exit type "CLOSE":\n`);

};

process.stdin.on('data', echoInput);
