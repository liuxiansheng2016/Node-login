const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 6100;

//使用中间件
app.use(bodyParser.json());
app.use(cors());

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


