const express = require('express') //This file will hold the resources for the route paths beginning with /api/users.
const router = express.Router();
// helper functions
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

// /api/users
// Sign up
router.post(
    '/',
    async (req, res) => {
      const { email, password, username } = req.body;
      const user = await User.signup({ email, username, password });

      await setTokenCookie(res, user);

      return res.json({
        user: user
      });
    }
 );


module.exports = router;
