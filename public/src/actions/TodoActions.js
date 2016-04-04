var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    TodoConstants = require('../constants/TodoConstants.js'),
    Api = require('../services/Api');

var TodoActions = {
    all: function() {
        Api
            .get('/')
            .then(function(res) {
                let todos = {};
                for (let i = 0; i < res.result.length; i++) {
                    var todoObj = res.result[i];
                    var id = todoObj._id;
                    var text = todoObj.text;
                    var complete = todoObj.complete;
                    var created = todoObj.created;
                    var modified = todoObj.modified;
                    todos[id] = {
                        id: id,
                        text: text,
                        complete: complete,
                        created: created,
                        modified: modified
                    }
                }
                AppDispatcher.dispatch({
                    actionType: TodoConstants.TODO_ALL,
                    todos: todos
                });
            }).catch(function() {
                AppDispatcher.dispatch({
                    actionType: TodoConstants.TODO_ERROR,
                    error: 'There was a problem occurred from server'
                });
            });
    },

    create: function(text) {
        Api
            .post('/create', {text: text})
            .then(function(res) {
                var objReturned = res.result;
                AppDispatcher.dispatch({
                    actionType: TodoConstants.TODO_CREATE,
                    todo: objReturned
                });
            }).catch(function() {
                AppDispatcher.dispatch({
                    actionType: TodoConstants.TODO_ERROR,
                    error: 'There was a problem occurred from server'
                });
            });
    },

    update: function(id, data) {
        Api
            .post('/update', data)
            .then(function(res) {
                AppDispatcher.dispatch({
                    actionType: TodoConstants.TODO_UPDATE,
                    todo: data
                });
            }).catch(function() {
                AppDispatcher.dispatch({
                    actionType: TodoConstants.TODO_ERROR,
                    error: 'There was a problem occurred from server'
                });
            });
    },

    archive: function() {
        Api
            .get('/archive')
            .then(function(res) {
                AppDispatcher.dispatch({
                    actionType: TodoConstants.TODO_ARCHIVE
                });
            }).catch(function() {
                AppDispatcher.dispatch({
                    actionType: TodoConstants.TODO_ERROR,
                    error: 'There was a problem occurred from server'
                });
            });
    },

    destroy: function(id) {
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_DESTROY,
            id: id
        });
    }
};

module.exports = TodoActions;
