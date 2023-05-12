const express = require('express');
const contactsControllers = require('../../controllers/contacts-controllers');
const { schemas } = require('../../models/contact');
const { isValidId, authenticate } = require('../../middlewares');
const { validateBody } = require('../../utils');

const router = express.Router();

// router.use(authenticate); можем так записать, если все роуты в данном контроллере приватные

router.get('/', authenticate, contactsControllers.getAllContacts);

router.get('/:id', authenticate, isValidId, contactsControllers.getContactById);

router.post('/', authenticate, validateBody(schemas.contactAddSchema), contactsControllers.addContact);

router.put('/:id', authenticate, isValidId, validateBody(schemas.contactAddSchema), contactsControllers.updateContactById);

router.patch('/:id/favorite', authenticate, isValidId, validateBody(schemas.contactUpdateFavoriteSchema), contactsControllers.updateContactFavorite);

router.delete('/:id', authenticate, isValidId, contactsControllers.deleteContactById);

module.exports = router;
