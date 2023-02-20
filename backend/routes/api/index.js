const router = require('express').Router();

const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
// });
// Phase 3 | Test User Auth Middlewares |
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       }
//     });
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });

// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );
// Importing requireAuth from utils
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );
// End phase 3. commented out for now.
module.exports = router;
