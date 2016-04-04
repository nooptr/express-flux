var React = require('react');
var ReactDOM = require('react-dom');
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;

var TodoInput = require('./TodoInput.react.js');
var Todo = require('./Todo.react.js');
var RemainingBox = require('./RemainingBox.react.js');
var TodoList = require('./TodoList.react.js');

var TodoStore = require('../stores/TodoStore.js');
var TodoActions = require('../actions/TodoActions.js');

function getTodoState() {
    return {
        savedTodoList: TodoStore.getAll()
    }
}

var Main = React.createClass({
    getInitialState: function () {
        return {
            savedTodoList: []
        };
    },

    componentWillMount: function() {
        TodoStore.addChangeListener(this._onChange);
    },

    componentDidMount: function() {
        TodoActions.all();
    },

    componentWillUnmount: function() {
        TodoStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(getTodoState());
    },

    handleOnArchive: function () {
        TodoActions.archive();
    },

    handleChange: function (id, todo) {
        TodoActions.update(id, {id: todo.id, text: todo.text, complete: todo.complete});
    },

    render: function() {
        return (
            <div>
                <RemainingBox
                    onArchive={ this.handleOnArchive }
                />
                <TodoInput />
                <TodoList
                    onChange={ this.handleChange } />
            </div>
        );
    }
});

module.exports = Main;