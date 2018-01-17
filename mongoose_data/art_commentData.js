var mongoose = require('mongoose');    //引用mongoose模块
var commentdb = mongoose.createConnection('localhost','comment'); //创建一个数据库连接

commentdb.on('error',console.error.bind(console,'连接错误:'));
commentdb.once('open',function(){
    console.log('文章评论数据库打开成功')
});

var commentSchema = new mongoose.Schema({
    articleID:Object,
    from_uid:Object,
    to_uid:Object,
    content:String,
    com_time:String,
});

var commentModel = commentdb.model('comment_list',commentSchema);


module.exports = commentModel