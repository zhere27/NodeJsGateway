const loading = require('lodash');
const config = require('./config.json');
const defaultConfig = config.development;
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];
const finalConfig = loading.merge(defaultConfig, environmentConfig);
global.gConfig = finalConfig;
console.log('Configuration file loaded.');
//console.log(JSON.stringify(global.gConfig, undefined, global.gConfig.json_indentation));