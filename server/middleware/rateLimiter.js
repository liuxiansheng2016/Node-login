const rateLimit = require('express-rate-limit');

exports.globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15分钟
    max: 100, // 限制每个IP 100个请求
    message: {
        error: '请求太频繁，请稍后再试'
    },
    standardHeaders: true, // 返回速率限制信息到 `RateLimit-*` 头
    legacyHeaders: false, // 禁用 `X-RateLimit-*` 头
});

exports.authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1小时
    max: 20, // 限制每个IP 5次尝试
    message: {
        error: '登录尝试次数过多，请稍后再试'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

exports.apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1分钟
    max: 30, // 每分钟30个请求
    message: {
        error: 'API请求太频繁，请稍后再试'
    },
    standardHeaders: true,
    legacyHeaders: false,
});