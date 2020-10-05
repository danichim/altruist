import getConfig from './index';

const config =  getConfig('.env');

console.log(config);
export = config;
