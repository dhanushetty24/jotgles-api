const routes = require('express').Router();
const jotgles = require('../controllers/jotgles');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { limiter } = require('../middlewares/rateLimiter');

//jotgles routes
routes.post('/jotgles', authMiddleware, limiter, jotgles.createJotgle);
routes.get('/jotgles', authMiddleware, limiter, jotgles.getJotgles);
routes.get('/jotgles/:id', authMiddleware, limiter, jotgles.getAJotgle);
routes.patch('/jotgles/:id', authMiddleware, limiter, jotgles.updateJotgle);
routes.delete('/jotgles/:id', authMiddleware, limiter, jotgles.deleteJotgle);

//health check route
routes.get('/health', (req, res) => {
  res.status(200).send({ message: 'Server is up and running' });
});

exports.routes = routes;
