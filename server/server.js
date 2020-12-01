'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const ExpresOIDC = require("@okta/oidc-middleware").ExpressOIDC;
const session = require("express-session");

const items = require('../routes/items.js');
const users = require('../routes/users.js');

const start = (options) => {
    return new Promise((resolve, reject) => {
        process.on('unhandledRejection', (reason, p) => {
            console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
        });

        if (!options.port) {
            reject(new Error('No port specified'));
        }

        if (!options.repo) {
            reject(new Error('No repo'));
        }

        const app = express();

        app.set('views', path.join(__dirname, '../views'));
        // `body-parser` monitors the client, looking for data
        app.set('view engine', 'pug');
        app.use(bodyParser.urlencoded({ extended: false }));

        app.use((error, request, response, next) => {
            reject(new Error('Some error occurred' + error));
            response.status(500).send('Something went wrong');
        })

        const oidc = new ExpressOIDC({
            issuer: options.okta.url + '/oath2/default',
            client_id: options.okta.clientId,
            client_secret: options.okta.clientSecret,
            appBaseUrl: options.okta.appBaseUrl,
            scope: 'openid profile',
            routes: {
                login: {
                    path: '/users/login'
                },
                callback: {
                    path: 'authorization-code/callback',
                    defaultRedirect: '/'
                }
            }
        });

        app.use(
            session({
                secret: '{This will be a really long, random string}',
                resave: true,
                saveUnitialized: false
            })
        );

        app.use(oidc.router);

        items(app, options);
        users(app, null);

        // Start server
        const server = app.listen(options.port, () => {
        resolve(server);
    });
})
}