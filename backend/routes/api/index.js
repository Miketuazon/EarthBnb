// backend/routes/api/index.js
// nesting an api folder in your routes folder.
const router = require('express').Router();

// Make sure to test this setup by creating the following test route in the api router:

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
});


module.exports = router;
