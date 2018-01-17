var mongoose = require('mongoose');    //引用mongoose模块
var db = mongoose.createConnection('localhost','user'); //创建一个数据库连接

db.on('error',console.error.bind(console,'连接错误:'));
db.once('open',function(){
   console.log('数据库打开成功')
});

var UserSchema = new mongoose.Schema({
    name:String,
    psw:String,
    head_img:String,//随机头像
    create_time:String,
});

var UserModel = db.model('user',UserSchema);
// var date = new Date();
// var create_time = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()+ ' ' + date.getHours() + ':'+ date.getMinutes() + ':'+ date.getSeconds();
// var UserEntity = new UserModel({
//     name:'chenyou',
//     psw:'123',
//     create_time:create_time,
// });
//UserEntity.save()

module.exports = UserModel