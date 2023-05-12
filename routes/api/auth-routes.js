const express = require('express');
const authControllers = require('../../controllers/auth-controllers');
const { authenticate } = require('../../middlewares');
const { validateBody } = require('../../utils');
const { schemas } = require('../../models/user');

const router = express.Router();

//signup
router.post('/register', validateBody(schemas.userRegisterSchema), authControllers.register);

//signin
router.post('/login', validateBody(schemas.userLoginSchema), authControllers.login);

router.get('/current', authenticate, authControllers.getCurrent);

router.post('/logout', authenticate, authControllers.logout);

router.patch('/', authenticate, validateBody(schemas.userSubscriptionUpdateSchema), authControllers.updateSubscription);

module.exports = router;
