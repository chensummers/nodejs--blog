var UserModel = require('../mongoose_data/userData');
var CommentModel = require('../mongoose_data/art_commentData');
var async = require('async');

function arrEach(data) {
    let arrfn=[]
    data.forEach((item,index)=>{
        let fn;
        if(index ===0){
            fn = function(next){
                let sendData=[]
                UserModel.findById(item.from_uid,(err,data)=>{
                    let arrdata= {
                        name: data.name,
                        content: item.content,
                        time: item.com_time,
                        head_img: data.head_img,
                    }

                    sendData.push(arrdata)
                    next(null,sendData)
                })
            }
        }else{
            fn = function(nextdata,next){
                UserModel.findById(item.from_uid,(err,data)=>{
                   if(err)throw err
                   let arrdata={
                        name:data.name,
                        content:item.content,
                        time: item.com_time,
                        head_img: data.head_img,
                    }
                    nextdata.push(arrdata)
                    next(null,nextdata)
                })
            }
        }
        arrfn.push(fn)
    })
    return arrfn
}



module.exports = {
    show_comment:function (article_id,callback) {

        CommentModel.find({articleID:article_id.toString()},(err,data)=>{
            async.waterfall(arrEach(data),(err,result)=>{
                if(err) throw err
                callback(result)
            })
        })
    }
}