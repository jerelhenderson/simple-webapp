'use strict'

const server = require('./server/server');
const config = require('./config/');
const repository = require('./repository/todoitems_repository.js');

const { EventEmitter } = require('events');
const mediator = new EventEmitter();

// EventEmitter wraps the connect function in an event to pass to boot.error to detect errors and boot.ready to start app if no issues occur at startup
mediator.on('boot.ready', (dbConfig) => {
    let rep;

    repository.connect(dbConfig).then(repo => {
        console.log('Repository connected. Starting server now...');
        repoVar = repo;

        return server.start({
            port: config.serverSettings.port,
            repo: repo,
            okta: config.oktaSettings
        })
    })
    .then(app => {
        console.log(`Server started successfully. Running on port:${config.serverSettings.port}.`);
        app.on('close', () => {
            rep.disconnect();
        });
    });
});

// boot.error prevents the app from starting if any errors pop up
mediator.on('db.error', (error) => {
    console.log(error);
});

// boot.ready informs the app the repository is ready to start
mediator.emit('boot.ready', config.dbSettings);