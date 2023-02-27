const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require('../../utils/auth.js');
const spotsRouter = require('./spots');
<<<<<<< HEAD
const reviewsRouter = require('./reviews');
=======
const ReviewsRouter = require('./reviews');
>>>>>>> b9b9309a6570df53e4985c36aeed7e132d2072dd
// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

<<<<<<< HEAD
router.use('/reviews', reviewsRouter);
=======
router.use('/reviews', ReviewsRouter);
>>>>>>> b9b9309a6570df53e4985c36aeed7e132d2072dd

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
