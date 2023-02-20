//This file will hold the resources for the route paths beginning with /api/session
const express = require('express')
const router = express.Router();
// User Login API Route phase 4
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator'); // can check this documentation to make custom validators
const { handleValidationErrors } = require('../../utils/validation');

// Phase 5 | Validating Login Request Body
const validateLogin = [
    check('credential') // check fn's are mw fns. Taking in credential and pw in line 17
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors
  ];




// User Log in API Routee
router.post(
    '/',
    validateLogin, // P5 added in validateLogin
    async (req, res, next) => {
      const { credential, password } = req.body;
      // Does user exist?
      const user = await User.login({ credential, password });
      // If not
      if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = { credential: 'The provided credentials were invalid.' };
        return next(err);
      }

      await setTokenCookie(res, user);

      return res.json({
        user: user
      });
    }
  );
// User Log out in API Route
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token'); //remove cookie to logout
    return res.json({ message: 'success' });
  }
);

// Restore session user
router.get(
    '/',
    (req, res) => {
      const { user } = req;
      if (user) {
        return res.json({
          user: user.toSafeObject()
        });
      } else return res.json({ user: null });
    }
  );

module.exports = router;
