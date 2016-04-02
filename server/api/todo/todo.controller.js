var Todo = require('./todo.model');

// curl http://localhost:5000/api/todo/
exports.getAll = function(req, res) {
    Todo.find({}, function(err, todos) {
        res.send({status: "ok", result: todos});
    });
};

// curl http://localhost:5000/api/todo/create -X POST -H "Content-Type: application/json" -d '{"text": "abc"}'
exports.create = function(req, res) {
    var todo = new Todo();
    var text = req.body.text;
    if (text !== '') {
        todo.text = text;
        todo.save(function(err, result) {
            if (err) {
                res.send({status: "error", message: "error occur from system"});
            } else {
                res.send({status: "ok", result: result});
            }
        });
    }
};

// curl http://localhost:5000/api/todo/update -X POST -H "Content-Type: application/json" -d '{"_id": "56ff521f5edc574e072e6c46", "complete": 1, "text": "test"}'
exports.update = function(req, res) {
    var id = req.body._id;
    var text = req.body.text;
    var complete = req.body.complete;

    var whereStatement = {
        _id: id
    };

    var updateStatement = {
        $set: {
            text: text,
            complete: complete
        }
    };

    Todo.update(whereStatement, updateStatement, function(err) {
        if (err) {
            res.send({status: "error", message: "error occur from system"});
        } else {
            res.send({status: "ok"});
        }
    });
};

// curl http://localhost:5000/api/todo/archive
exports.archive = function(req, res) {
    var whereStatement = {
        complete: 1
    };

    Todo.remove(whereStatement, function(err) {
        if (err) {
            res.send({status: "error", message: "error occur from system"});
        } else {
            res.send({status: "ok"});
        }
    });
};

// curl http://localhost:5000/api/todo/destroy -X DELETE -H "Content-Type: application/json" -d '{"_id": "56ff521f5edc574e072e6c46"}'
exports.destroy = function(req, res) {
    var id = req.body._id;

    if (id) {
        Todo.findById(id, function(err, todo) {
            if (err) {
                res.send({status: "error", message: "error occur from system"});
            } else {
                if (todo) {
                    todo.remove();
                    res.send({status: "ok"});
                } else {
                    res.send({status: "error", message: "Could not find object id"});
                }
            }
        });
    } else {
        res.send({status: "error", message: "object id not valid"});
    }
};