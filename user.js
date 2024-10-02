const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    res.send('Hello World  User');
});

router.get('/about', (req, res) =>{
    res.send('About Us');
})

module.exports = router;
