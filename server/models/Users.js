const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    githubId: {type: String, sparse: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: function() {
        return !this.githubId;  // 只有非 GitHub 用户才需要密码
    }}
});

module.exports = mongoose.model('Users', UserSchema);