$(document).ready(function(){
    $('#home_login').click(function(){
        $.post('/is_login',(data)=>{
            if(data.is_login ==true){
                alert('您已经登录了，请不要重复登录')
            }else{
                window.location.href='/login'
            }
        })

    })

    //文章筛选
    $('.art-filter span').click((e)=>{
        $('.art-filter').find('span').removeClass('active')
        e.target.className='active'
        let type = e.target.dataset.type
        $.post('/is_article',{type:type},(data)=>{
            let html = '';
            for(let item of data){
                let tag='';
                switch(item.type){
                    case 1:
                        tag = `<span class="art-tag art-tag-h">Html</span>`
                        break;
                    case 2:
                        tag = `<span class="art-tag art-tag-c">CSS</span>`
                        break;
                    case 3:
                        tag = `<span class="art-tag art-tag-j">JS</span>`
                        break;
                    case 4:
                        tag = `<span class="art-tag art-tag-n">Node</span>`
                        break;
                }
              let tmp =`
                <div class="main-art">
                    <h2><a href='/article?id=${item._id}'>${item.title}</a></h2>
                    <p>`+ tag +`
                        <span class="art-time">${item.time}</span>
                        <span class="art-num">阅读数(${item.read_num})</span>
                    </p>
                </div>
              `
                html += tmp
              }
                $('.main-art-box').html(html)
        })
    })

    $('.header-nav span a').click((e)=>{
        $('.header-nav').find('span a').removeClass('head-active')
        console.log(e.target)
        e.target.className='head-active'
    })


})