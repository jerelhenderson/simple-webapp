// Import configuration settings from config file
const { dbSettings, serverSettings, oktaSettings } = require('./conflig');

module.exports = Object.assign( {}, { dbSettings, serverSettings, oktaSettings });