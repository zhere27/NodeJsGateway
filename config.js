const loading = require('lodash');

// module variables
const config = require('./config.json');
const defaultConfig = config.development;
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];
const finalConfig = loading.merge(defaultConfig, environmentConfig);

global.gConfig = finalConfig;
console.log(`global.gConfig: ${JSON.stringify(global.gConfig, undefined, global.gConfig.json_indentation)}`);
//console.log(JSON.stringify(global.gConfig, undefined, global.gConfig.json_indentation));