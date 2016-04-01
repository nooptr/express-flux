var Todo = require('./todo.model');

exports.getAll = function(req, res) {
    Todo.find({}, function(err, todos) {
        res.send(todos)
    });
};

exports.create = function(req, res) {
    var todo = new Todo();
    var text = req.body.text;
    if (text !== '') {
        todo.text = text;
        todo.save(function(err, result) {
            if (!err) res.send(result);
        });
    }
};

exports.update = function(req, res) {

};

exports.archive = function(req, res) {

};

exports.destroy = function(req, res) {

};