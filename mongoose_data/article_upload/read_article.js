var fs = require('fs')

module.exports.readfs = function(callback){
    fs.readFile('./txt/node1-2.txt','utf-8',(err,data)=>{
        if(err) throw err
        callback(data) //通过回调函数将读取的数据返回
    })
}

