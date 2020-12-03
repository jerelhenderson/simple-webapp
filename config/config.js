'use strict'

const serverSettings = {
    port: process.env.PORT || 3000
};

const dbSettings = {
    database: process.env.DB || 'todolist',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'your password',
    server: process.env.DB_SERVER || 'localhost'
};

const oktaSettings = {
    clientId: process.env.OKTA_CLIENTID || 'yourClientId',
    clientSecret: process.env.OKTA_CLIENTSECRET || 'yourClientSecret',
    url: process.env.OKTA_URL_BASE || 'yourOktaDomain',
    apiToken: process.env.OKTA_API_TOKEN || 'yourApiToken',
    appBaseUrl: process.env.OKTA_APP_BASE_URL || 'htttp://localhost:3000'
};

module.exports = Object.assign( {}, { dbSettings, serverSettings, oktaSettings });