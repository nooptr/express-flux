var $ = require("jquery");
var promise = require('es6-promise');
var apiURL = 'http://express-flux-api.apdev.local:8081/api/todo';

var TodoService = {
    all: function() {
        var Promise = promise.Promise;
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: apiURL,
                method: "GET",
                success: resolve,
                error: reject
            });
        });
    },

    create: function(text) {
        var Promise = promise.Promise;
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: apiURL + "/create",
                data: JSON.stringify(text),
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                success: resolve,
                error: reject
            });
        });
    },

    update: function(id) {

    },

    archive: function() {

    },

    destroy: function(id) {

    }
};

module.exports = TodoService;