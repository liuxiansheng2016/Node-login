const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const path = require('path');
const passport = require('passport');
const session = require('express-session');

require('dotenv').config({
    path: process.env.NODE_ENV === 'production' ?
        '.env.production' : '.env.development'
});


const app = express();
const port = process.env.PORT || 6100;

//使用中间件
app.use(bodyParser.json());
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24小时
    }
}));
app.use(passport.initialize());
app.use(passport.session());

//连接DB
require('./config/db');

//路由
app.use('/api', authRoutes);

// 提供静态文件
app.use(express.static(path.join(__dirname, '../build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});


const server = app.listen(port, () => {
    console.log(`server running ar http://localhost:${port}`);
})

process.on('SIGTERM', () => {
    console.log(`SIGTERM signal received: closing HTTP server`);
    server.close(() => {
        console.log('HTTP server closed');
    })
});

process.on('SIGINT', () => {
    console.log(`SIGINT signal received: closing HTTP server`);
    server.close(() => {
        console.log('HTTP server closed');
    })
})