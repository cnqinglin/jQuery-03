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
let n
初始化()

let timer = setInterval(() => {
    makeLeave(getImage(n)) //makeLeave的返回值是undefined
        .one('transitionend', (e) => { //transitionend就是指动画结束以后马上添加其它函数,`xxx(${n})`采用ES6的插值法，n多少那么这一部分就是多少
            makeEnter($(e.currentTarget)) //给当前元素添加enter状态
        })
    makeCurrent(getImage(n + 1))
    n += 1
}, 2000)
document.addEventListener('visibilitychange', function (e) {
    if (document.hidden) {
        wimdow.clearInterval(timer)
    } else {
         timer = setInterval(() => {
            makeLeave(getImage(n)) //makeLeave的返回值是undefined
                .one('transitionend', (e) => { //transitionend就是指动画结束以后马上添加其它函数,`xxx(${n})`采用ES6的插值法，n多少那么这一部分就是多少
                    makeEnter($(e.currentTarget)) //给当前元素添加enter状态
                })
            makeCurrent(getImage(n + 1))
            n += 1
        }, 2000)
    }
})



//下面的代码都是封装之后的函数，可以不用看
function getImage(n) {
    return $(`.images > img:nth-child(${x(n)})`)
}

function x(n) {
    if (n > 3) {
        n = n % 3
        if (n === 0) {
            n = 3
            //n = 1,2,3
        }
    }
    return n
}

//初始化就是让n=1,让第一个变成current，其他的变成enter
function 初始化() {
    n = 1
    //初始化三个图片
    $(`.images > img:nth-child(${n}`).addClass('current')
        .siblings().addClass('enter')
}

function makeCurrent($node) {
    return $node.removeClass("enter leave").addClass("current")
}

function makeEnter($node) {
    return $node.removeClass("current leave").addClass("enter")
}

function makeLeave($node) {
    $node.removeClass("enter current").addClass("leave")
    return $node //防止返回 undefined,操作一番，传入什么就传出什么
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