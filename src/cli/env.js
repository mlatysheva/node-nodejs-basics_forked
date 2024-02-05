import { env } from 'node:process';

const parseEnv = () => {
  Object.keys(env).forEach((item) => {
    if (item.startsWith('RSS_')) {
      console.log(`${item}=${env[item]}`);
    }
  });
};

parseEnv();
