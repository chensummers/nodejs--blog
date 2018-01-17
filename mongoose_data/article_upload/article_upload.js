var file_article = require('./read_article')
var articleModel = require('../articleData')

file_article.readfs((data)=>{
  var date = new Date()
  var time = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()+ ' ' + date.getHours() + ':'+ date.getMinutes() + ':'+ date.getSeconds()

  var articleData = {
      title:'Node.js Blog(一) 项目大纲目录',
      time:time,
      type:4,
      author:'summer',
      description:'Node.js 开发个人 Blog',
      read_num:0,
      content:data,
      images:'/images/morning.jpg',
  }
    articleModel.create(articleData,(err)=>{
        if(err) throw err
        console.log('文章上传成功')
    })
})

