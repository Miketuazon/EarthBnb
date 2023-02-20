//This file will hold the resources for the route paths beginning with /api/session
const express = require('express')
const router = express.Router();
// User Login API Route phase 4
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

// User Log in API Route
router.post(
    '/',
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

module.exports = router;
