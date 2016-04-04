var request = require('superagent');
var Promise = require('es6-promise').Promise;
var API_BASE_URL = "http://express-flux-api.apdev.local:8081/api/todo";

/**
 * Wrapper for calling a API
 */
var Api = {
    get: function (end_point) {
        return new Promise(function (resolve, reject) {
            request
                .get(API_BASE_URL + end_point)
                .end(function (err, res) {
                    if (res.status === 404) {
                        reject();
                    } else {
                        resolve(JSON.parse(res.text));
                    }
                });
        });
    },

    post: function(end_point, post_data) {
        return new Promise(function (resolve, reject) {
            request
                .post(API_BASE_URL + end_point)
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send(post_data)
                .end(function (err, res) {
                    if (res.status === 404) {
                        reject();
                    } else {
                        resolve(JSON.parse(res.text));
                    }
                });
        });
    },

    delete: function(end_point, post_data) {
        return new Promise(function (resolve, reject) {
            request
                .del(API_BASE_URL + end_point)
                .end(function (err, res) {
                    if (res.status === 404) {
                        reject();
                    } else {
                        resolve(JSON.parse(res.text));
                    }
                });
        });
    }
};

module.exports = Api;