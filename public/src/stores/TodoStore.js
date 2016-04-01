var AppDispatcher = require('../dispatcher/AppDispatcher'),
    EventEmitter = require('events').EventEmitter,
    TodoConstants = require('../constants/TodoConstants'),
    assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _todos = {};

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

function archive(todo) {
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
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action) {
    switch (action) {
        case TodoConstants.TODO_CREATE:
            var text = action.text.trim();
            if (text !== '') {
                create(text);

                TodoStore.emitChange();
            }
            break;
        case TodoConstants.TODO_UPDATE:
            var id = action.id;
            var todo = _todos[id];
            todo.complete = todo.comlete ? false : true;
            update(id, todo);

            TodoStore.emitChange();
            break;
        case TodoConstants.TODO_ARCHIVE:
            var todo = action.todo;
            archive(todo);

            TodoStore.emitChange();
            break;
        case TodoConstants.TODO_DESTROY:
            var id = action.id;
            destroy(id);

            TodoStore.emitChange();
            break;
    }
});

module.export = TodoStore;