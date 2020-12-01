'use strict'

module.exports = (app, options) => {

    const basepath = '/users';

    app.get(basepath + '/logout', (request, response, next) => {
        request.logout();
        response.redirect('/');
    });

    // determine if user is logged in... if so, show home page...
    // if not, redirect back to the login page
    app.get(basepath + '/index', (request, response, next) => {
        if (!request.userContext) {
            return response.render('login');
        } else {
            return response.redirect('/');
        }
    });
}