const routes = require('express').Router();
exports.routes = routes;
const jotgles = require('../controllers/jotgles')


router.post('/jotgles', jotgles.createJotgle);
router.get('/jotgles', jotgles.getJotgles);
router.get('/jotgles/:id',jotgles.getAJotgle);
router.delete('/jotgles/:id', jotgles.deleteJotgle);
router.patch('/jotgles/:id', jotgles.updateJotgle);

module.exports = router;
