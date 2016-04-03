var express = require('express'),
    router = express.Router(),
    controller = require('./todo.controller');

// For Cross Origin
router.all( '/*', function ( req, res, next ) {
    res.contentType( 'json' );
    res.header( 'Access-Control-Allow-Origin', '*' );
    next();
});
router.get('/', controller.getAll);
router.post('/create', controller.create);
router.post('/update', controller.update);
router.get('/archive', controller.archive);
router.delete('/destroy', controller.destroy);

module.exports = router;