var express = require('express'),
    router = express.Router(),
    controller = require('./todo.controller');

router.get('/', controller.getAll);
router.post('/create', controller.create);
router.post('/update', controller.update);
router.get('/archive', controller.archive);
router.delete('/destroy', controller.destroy);

module.exports = router;