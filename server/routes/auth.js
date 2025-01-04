const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const router = express.Router();
const passport = require('passport');
const axios = require('axios');
require('../config/passport');
const { authLimiter, apiLimiter } = require('../middleware/rateLimiter');

router.post('/auth/register', authLimiter, async(req, res) => {
    console.log("register called");
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Users({ username, password: hashedPassword });
    await newUser.save();
    res.json({ success: true });
});

router.post('/auth/login', authLimiter, async(req, res) => {
    console.log("login called");

    const { username, password } = req.body;
    const user = await Users.findOne({ username })
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("login success");
        res.json({ success: true, token });
    } else {
        res.status(401).json({ success: false, message: '用户名或密码错误' });
    }
});

router.post('/auth/verify-token', apiLimiter, (req, res) => {
    const { token } = req.body;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.json({ success: false, message: 'Token is invalid' });
        }
        return res.json({ success: true, message: 'Token is valid' });
    });
});

router.get('/users', async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch data' });
    }
});



// GitHub 登录路由
router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.redirect(`http://localhost:3000/auth/github/callback?token=${token}`);
    }
);


module.exports = router;