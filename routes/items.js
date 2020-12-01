'use strict'

module.exports = (app, options) => {

    // Return list of items using getAllIncompleteToDoItems() (returns the result as a promise), THEN capture result in the callback function and render content using`home.pug`
    app.get(basepath, ensureAuthenticated, (request, response) => {
        repo.getAllIncompleteToDoItems().then(items => {
            response.render('home', {
                user: request.userContext.userinfo,
                items: items
            })
        })
        .catch(err => {
            response.render('error');
        });
    });

    app.get(basepath + '/create', ensureAuthenticated, (request, response) => {
        response.render('create');

        app.post(basepath + '/items/create', ensureAuthenticated, (request, response) => {
            repo.createToDoItem(request.body.title, request.body.description).then(data => {
                response.redirect('/');
            })
            .catch(err => {
                response.render('error');
            });
        })
    })

    app.post(basepath, '/items/complete', ensureAuthenticated, (request, response) => {
        repo.markAsComplete(request.body.id).then(data => {
            response.redirect('/');
        })
        .catch(err => {
            response.render('error');
        });
    });

    // ensureAuthenticated() passed as route handler upon each function call and is evaluated before the GET or POST method requests are handled
    function ensureAuthenticated(request, response, next) {
        if (!request.userContext) {
            return response.status(401).redirect('../users/index');
        }
    }
}