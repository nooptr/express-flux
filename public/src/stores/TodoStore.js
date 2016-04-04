var AppDispatcher = require('../dispatcher/AppDispatcher'),
    EventEmitter = require('events').EventEmitter,
    TodoConstants = require('../constants/TodoConstants'),
    assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _todos = {};

function setTodos(todos) {
    _todos = todos;
}

function createByIdAndText(id, text) {
    _todos[id] = {
        id: id,
        text: text,
        complete: false
    };
}

function create(text) {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    _todos[id] = {
        id: id,
        text: text,
        complete: false
    };
}

function update(id, updates) {
    _todos[id] = assign({}, _todos[id], updates);
}

function archive() {
    for (var key in _todos) {
        if (_todos[key].complete) {
            destroy(key);
        }
    }
}

function destroy(id) {
    delete _todos[id];
}

var TodoStore = assign({}, EventEmitter.prototype, {
    getAll: function() {
        return _todos;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action) {
    switch (action.actionType) {
        case TodoConstants.TODO_ALL:
            setTodos(action.todos);
            break;

        case TodoConstants.TODO_CREATE:
            var todo = action.todo;
            createByIdAndText(todo._id, todo.text);
            break;

        case TodoConstants.TODO_UPDATE:
            var id = action.todo.id;
            update(id, todo);
            break;

        case TodoConstants.TODO_ARCHIVE:
            archive();
            break;

        default:
            return true;
    }

    TodoStore.emitChange();

    return true;
});

module.exports = TodoStore;