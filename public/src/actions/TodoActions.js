var AppDispatcher = require('../dispatcher/AppDispatcher'),
    TodoConstants = require('../constants/TodoConstants');

var TodoActions = {
    create: function(text) {
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_CREATE,
            text: text
        });
    },

    update: function(todo) {
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_UPDATE,
            todo: todo
        });
    },

    archive: function() {
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_ARCHIVE
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
