module.exports = function(app) {
    app.use('/api/todo', require('../api/todo'));

    // For Cross Origin
    app.route('/*')
        .get(function(req, res) {
            res.contentType('json');
            res.header('Access-Control-Allow-Origin', '*' );
        });
};