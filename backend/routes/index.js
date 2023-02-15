// backend/routes/index.js
const express = require('express');
// express router
const router = express.Router();

// test route // commented out for now
// router.get('/hello/world', function(req, res) {
//   res.cookie('XSRF-TOKEN', req.csrfToken());
//   res.send('Hello World!');
// });

// GET /api/csrf/restore | allow any developer to re-set the CSRF token cookie XSRF-TOKEN
// Add a XSRF-TOKEN cookie
router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
      'XSRF-Token': csrfToken
    });
});



// export the router
module.exports = router;
