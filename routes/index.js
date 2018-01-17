var express = require('express');
var router = express.Router();
var fs = require('fs');
var async = require('async');
var UserModel = require('../mongoose_data/userData');
var ArticleModel = require('../mongoose_data/articleData');
var CommentModel = require('../mongoose_data/art_commentData');
var ShowCommentModel = require('../module/show_comment');

/* GET home page. */
router.get('/', (req, res, next)=>{ //home路由设置
    console.log(req.query)
    ArticleModel.find({}).sort({_id:-1}).exec((err,data)=>{
        if(err) throw err
        let head={
            name: req.session.user,
            img: req.session.head_img
        }
        res.render('index', {
            title: req.session.user,
            head:head,
            art_data:data,
        });
    })


});

//渲染登录页模块
router.get('/login',(req, res, next)=>{ //logo路由设置
    res.render('login');
});

//渲染文章模块
router.get('/article',(req, res, next)=>{ //logo路由设置

    let _id = req.query.id
    /**
     * async.waterfall([],fc(err,result))
     * 第一个参数是fc回调数组，第二个是最终回调（result）
     * 第一个回调fc(next)
     * 第二个回调fc(nextdata,next)
     * */
    async.waterfall([ //使用async避免异步回调黑洞
        (next)=>{
            ArticleModel.findById(req.query.id,(err,data)=> {
                if (err) throw err
                data.read_num++
                next(null,data)
            })
        },(nextdata,next)=> {
                ArticleModel.update({_id},{read_num:nextdata.read_num},(err,data)=>{
                    if(err) throw err
                    next(null,nextdata)
                })
         }
    ],(err,result)=>{
        if(err) throw err
        ArticleModel.find({}).sort({read_num:-1}).exec((err,data)=>{
            if(err) throw err
            let listArr = []
            for(let item of data){
                let list={
                    _id:item._id,
                    title:item.title,
                    read_num:item.read_num
                }
                listArr.push(list)
            }

            req.session.article_id = result._id
            ShowCommentModel.show_comment(req.session.article_id,(data)=>{
                let head={
                    name: req.session.user,
                    img: req.session.head_img
                }
                res.render('article',{
                    title: req.session.user,
                    data:result,
                    listArr:listArr,
                    head:head,
                    comment:data || []
                })
                // console.log(data,'data1')
            })

        })

    })

});

//获取article
router.post('/is_article',(req,res)=> { //is_register 验证注册
    let filter;
    if(req.body.type ==0){
        filter = {}
    }else{
        filter = {
            type : +req.body.type
        }
    }
    ArticleModel.find(filter).sort({_id:-1}).exec((err,data)=>{
       if(err) throw err
         res.send(data)
     })
})
//判断是否登录
router.post('/is_login',(req,res)=> {
    if(req.session.user){
        res.send({is_login:true})
    }else{
        res.send({is_login:false})
    }

})
//执行登录
router.post('/dologin', (req,res,next)=>{ //dologin 登录验证路由
    UserModel.find({name: req.body.name}, (err, data)=> {
        if (err) throw err
        if (data[0]) {
            //console.log('存在该用户')
            if (req.body.psw === data[0].psw) {
                req.session.user = data[0].name
                req.session.head_img = data[0].head_img
                res.send({code: 1})
                //写入log
                let date = new Date()
                login_time = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()+ ' ' + date.getHours() + ':'+ date.getMinutes() + ':'+ date.getSeconds()
                let login_info =req.body.name + ' login in the time  ' + login_time + '\n';
                fs.writeFile('../log/login.log',login_info,{flag:'a'},(err)=>{
                    if(err) throw err
                })
                console.log('密码正确')
            } else {
                console.log('密码错误')
                res.send({code: -1})
            }
        } else {
            console.log('没有该用户')
            res.send({code: -2})
        }
    })
});

    //执行注册
router.post('/do_register',(req,res)=> {
    UserModel.create(req.body, function (err, data) {
      if (err) throw err
      res.send({code:1})

      let regiser_info = 'userName: '+ req.body.name + ',head_img:'+ req.body.head_img + ', register in the time ' + req.body.create_time + '\n';
        regiser_info += 'this user`s psw is ' + req.body.psw + '\n' + '\n';
      fs.writeFile('../log/register.log',regiser_info,{flag:'a'},(err)=>{ //fs写入数据
          if(err) throw err
      })

    })
})

    //验证注册
router.post('/is_register',(req,res)=> { //is_register 验证注册
    let user = req.body.resgister_name
    UserModel.find({name: user}, (err, data)=> {
      if (err) throw err
      if(!data[0]){
          res.send({code:-1})
      }else{
          res.send({code:1})
          // console.log(data,'已注册')
      }
    })

})

  //文章评论
router.post('/is_comment',(req,res)=> {
    UserModel.find({name:req.session.user},(err,data)=>{
        if(err) throw err
        let comdata = {
            articleID:req.session.article_id,//评论时的文章id
            from_uid:data[0]._id, //评论时用户id
            to_uid:null, //回复时id(之后会涉及回复)
            content:req.body.val,
            com_time:req.body.com_time,
        }
        CommentModel.create(comdata,(err)=>{
            if(err) throw err
            res.send({
                code:1,
                message:'评论成功'
            })
        })
    })

})


module.exports = router;
