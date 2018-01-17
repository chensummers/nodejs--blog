$(document).ready(function () {
    //评论提交
    $('#com-btn').click(()=>{
        let val = $('#com-input').val()
        if(val){
            $.post('/is_login',(data)=>{
                if(data.is_login ==true){
                    //
                    let date = new Date();
                    let time = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()+ ' ' + date.getHours() + ':'+ date.getMinutes();
                    let data = {
                        val:val,
                        com_time:time,
                    }
                    $.post('/is_comment',data,(data)=>{
                        if(data.code ===1){
                            alert(data.message)
                            // $('#com-input').val('')
                            window.location.reload()
                        }else{
                            alert('评论失败，请稍后重试')
                        }
                    })
                }else{
                   alert('先登录才可以评论哦')
                }
            })
        }else{
            alert('内容不能为空')
        }
    })
    //评论登录
    $('#com-login').click(function(){
        $.post('/is_login',(data)=>{
            if(data.is_login ==true){
                alert('您已经登录了，请不要重复登录')
            }else{
                window.location.href='/login'
            }
        })

    })
})