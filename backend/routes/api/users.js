const express = require('express') //This file will hold the resources for the route paths beginning with /api/users.
const router = express.Router();
// helper functions
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
// Phase 5 | validating signup requests
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// /api/users
// Sign up
router.post(
  '/',
  // P5 | added validateSignup to connect
  validateSignup,
  async (req, res) => {
    // P5 | wrapping up BE | added fN, lN
    const { email, password, username, firstName, lastName } = req.body;
    const user = await User.signup({ email, username, password, firstName, lastName });

    await setTokenCookie(res, user);

    return res.json({
      user: user
    });
  }
);

module.exports = router;
