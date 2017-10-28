const router = require('express').Router();
const auth  = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');
const users = require('../controllers/users');

// ===================================================================
// ===================================================================
router.route('/users')
  .get(secureRoute, users.index);

router.route('/users/:id')
  .get(secureRoute, users.show)
  .put(users.update);
// ====================================================================
router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

// ======================================================================
// EMAIL VALIDATION
// ======================================================================
router.get('/checkemail', users.checkEmail);
router.get('/checkusername', users.checkUsername);
// =======================================================================
router.all('/*', (req, res) => res.notFound());
// =======================================================================


module.exports = router;
