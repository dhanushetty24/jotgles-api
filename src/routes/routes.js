const routes = require('express').Router();
const jotgles = require('../controllers/jotgles')


routes.post('/jotgles', jotgles.createJotgle);
routes.get('/jotgles', jotgles.getJotgles);
routes.get('/jotgles/:id',jotgles.getAJotgle);
routes.patch('/jotgles/:id', jotgles.updateJotgle);
routes.delete('/jotgles/:id', jotgles.deleteJotgle);

exports.routes = routes;
