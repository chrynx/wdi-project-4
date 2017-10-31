const router = require('express').Router();
const auth  = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');
const users = require('../controllers/users');
const requests = require('../controllers/requests');
const messages = require('../controllers/messages');

// ===================================================================
// ===================================================================
router.route('/users')
  .get(secureRoute, users.index);

router.route('/users/:id')
  .get(secureRoute, users.show)
  .put(users.update);

// ====================================================================
router.route('/messages')
  .get(messages.all)
  .post(messages.create);

router.route('/messages/:messageId')
  .delete(messages.destroy);
// ====================================================================
router.route('/register')
  .post(auth.register);

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
