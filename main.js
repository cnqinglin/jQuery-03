/*具体思维实现

//第一轮：同时给第一二图片添加动画
setTimeout(function(){
    $('.images>img:nth-child(1)').css({
        transform:'translate(-100%)'
    })
    $('.images>img:nth-child(2)').css({
        transform:'translate(-100%)'
    })
    $('.images>img:nth-child(1)').one('transitionend',function(e){  //one只执行一次
        $(e.currentTarget).addClass('right').css({transform:'none'})
    })
},3000)
setTimeout(function(){
    $('.images>img:nth-child(2)').css({
        transform:'translate(-200%)'
    })
    $('.images>img:nth-child(3)').css({
        transform:'translate(-100%)'
    })
    $('.images>img:nth-child(2)').one('transitionend',function(e){
        $(e.currentTarget).addClass('right').css({transform:'none'})
    })
},6000)
//第二轮
setTimeout(function(){
    $('.images>img:nth-child(3)').css({
        transform:'translate(-200%)'
    })
    $('.images>img:nth-child(1)').css({
        transform:'translate(-100%)'
    })
    $('.images>img:nth-child(3)').one('transitionend',function(e){
        $(e.currentTarget).addClass('right').css({transform:'none'})
    })
},9000)
setTimeout(function(){
    $('.images>img:nth-child(1)').css({
        transform:'translate(-200%)'
    })
    $('.images>img:nth-child(2)').css({
        transform:'translate(-100%)'
    })
    $('.images>img:nth-child(1)').one('transitionend',function(e){  //one只执行一次
        $(e.currentTarget).addClass('right').css({transform:'none'})
    })
},12000)
*/


//抽象思维实现
$('.images > img:nth-child(1)').addClass('current')
$('.images > img:nth-child(2)').addClass('enter')
$('.images > img:nth-child(3)').addClass('enter')
var n = 1
setInterval(() => {
    $(`.images > img:nth-child(${x(n)})`).removeClass('current').addClass('leave').one('transitionend',(e)=>{  //transitionend就是指动画结束以后马上添加其它函数,`xxx(${n})`采用ES6的插值法，n多少那么这一部分就是多少
        $(e.currentTarget).removeClass('leave').addClass('enter')
    })
    $(`.images > img:nth-child(${x(n+1)})`).removeClass('enter').addClass('current')
    n += 1
},3000)

function x(n){
    if(n>3){
        n = n%3
        if(n===0){
            n = 3
            //n = 1,2,3
        }   
    }
    return n
}


//找规律
/*
setTimeout(()=>{
    $('.images > img:nth-child(2)').removeClass('current').addClass('leave').one('transitionend',(e)=>{  //transitionend就是指动画结束以后马上添加其它函数
        $(e.currentTarget).removeClass('leave').addClass('enter')
    })
    $('.images > img:nth-child(3)').removeClass('enter').addClass('current')
},6000)

setTimeout(()=>{
    $('.images > img:nth-child(3)').removeClass('current').addClass('leave').one('transitionend',(e)=>{  //transitionend就是指动画结束以后马上添加其它函数
        $(e.currentTarget).removeClass('leave').addClass('enter')
    })
    $('.images > img:nth-child(1)').removeClass('enter').addClass('current')
},9000)

setTimeout(()=>{
    $('.images > img:nth-child(1)').removeClass('current').addClass('leave').one('transitionend',(e)=>{  //transitionend就是指动画结束以后马上添加其它函数
        $(e.currentTarget).removeClass('leave').addClass('enter')
    })
    $('.images > img:nth-child(2)').removeClass('enter').addClass('current')
},12000)
*/
