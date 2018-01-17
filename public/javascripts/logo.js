$(document).ready(function(){

    $('#login-btn').click(()=>{
        let name = $('#log-name').val(),
            psw  = $('#log-psw').val(),
            data = {
                name:name,
                psw:psw,
            };
        $.post('/dologin',data,(data)=> {
            if(data.code ==-2){
                alert('没有该用户，请先注册')
            }else if(data.code == -1){
                alert('密码错误')
            }else{
                alert('登录成功')
                // window.location.href='/'
                self.location = document.referrer
            }
        })

    })
    $('.register-btn').click(()=>{
        $('#reg-name').val('')
        $('#reg-psw').val('')
        $('.login-home').animate({
            left: '-200%',
        },500)
        $('.register').animate({
            right:0,
        },500)
    })
    $('#register-btn').click(()=>{
        let date,time,
            name = $('#reg-name').val(),
            psw  = $('#reg-psw').val(),
            post_data = {};
        if(!name){
            alert('please write the register of name!')
            return
        }
       $.post('/is_register',{resgister_name:name},(data)=>{
            if(data.code === 1){
                alert('该用户已存在')
                $('#reg-psw').val('')
                return;
            }else{
                if(!psw){
                    alert('请填写密码')
                    return
                }
                date = new Date();
                time = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()+ ' ' + date.getHours() + ':'+ date.getMinutes() + ':'+ date.getSeconds();
                post_data.create_time = time
                let head_img =  'user-images/'+ (~~(Math.random()*21)) + '.jpg'
                console.log(head_img,'head_img')
                post_data = {
                    name:name,
                    psw:psw,
                    head_img:head_img,
                    create_time:'',
                };
                $.post('/do_register',post_data,(data)=>{
                    if(data.code ===1){
                        alert('Register is success! Login!')
                        $('#log-name').val('')
                        $('#log-psw').val('')
                        $('.register').animate({
                            right:'-200%',
                        },200)
                        $('.login-home').animate({
                            left: 0,
                        },500)
                        // window.location.href='/'
                    }
                })
            }
       })

        // console.log(name,psw,creat_time)
    })
})