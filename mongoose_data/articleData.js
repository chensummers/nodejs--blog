var mongoose = require('mongoose');    //引用mongoose模块
var articledb = mongoose.createConnection('localhost','article'); //创建一个数据库连接
// var articledb = mongoose.createConnection('mongodb://chenyou:123456@http://chy.bettersun.cn/:27017', 'article');
articledb.on('error',console.error.bind(console,'连接错误:'));
articledb.once('open',function(){
    console.log('文章数据库打开成功')
});

var articleSchema = new mongoose.Schema({
    title:String,
    time:String,
    type:Number,
    author:String,
    description:String,
    read_num:Number,
    content:String,
    images:String,
});

var articleModel = articledb.model('art_list',articleSchema);
module.exports = articleModel