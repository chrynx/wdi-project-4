const router = require('express').Router();
const auth  = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');
const users = require('../controllers/users');
const requests = require('../controllers/requests');
const messages = require('../controllers/messages');
const imageUpload = require('../lib/imageUpload');


// ===================================================================
// ===================================================================
router.route('/users')
  .get(secureRoute, users.index);

router.route('/users/:id')
  .get(secureRoute, users.show)
  .put(secureRoute, imageUpload, users.update)
  .delete(secureRoute, users.delete);

// ====================================================================
router.route('/messages')
  .get(messages.all)
  .post(secureRoute, messages.create);

router.route('/messages/:messageId')
  .delete(messages.destroy);
// ====================================================================
router.route('/register')
  .post(imageUpload, auth.register);

router.route('/login')
  .post(auth.login);
router.route('/requests')
  .post(requests.request);
router.route('/requests/:id')
  .get(requests.get);
// ======================================================================
// EMAIL VALIDATION
// ======================================================================
router.get('/checkemail', users.checkEmail);
router.get('/checkusername', users.checkUsername);
// =======================================================================
router.all('/*', (req, res) => res.notFound());
// =======================================================================


module.exports = router;
