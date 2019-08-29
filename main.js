//最后优化代码-实现无缝轮播，每一个页面之间可随意切换，页面不看情况下不轮播
let $buttons = $('#buttonWrapper > button')
let $slides = $('#slides')
let $images = $slides.children('img')
let current = 0



makeFakeSlides()
$slides.css({transform: 'translateX(-259px)'})
bindEvents()
$('#next').on('click',function(){
    goToSlide(current+1)
})
$('#previous').on('click',function(){
    goToSlide(current-1)
})
var timerId = setInterval(function(){
    goToSlide(current + 1)
},2000)
$('.container').on('mouseenter',function(){
    window.clearInterval(timerId)
}).on('mouseleave',function(){
    timerId = setInterval(function(){
        goToSlide(current + 1)
    },2000)
})

function bindEvents() {
    //事件委托
    $('#buttonWrapper').on('click', 'button', function (e) {
        let $button = $(e.currentTarget)
        let index = $button.index() //知道这个按钮是第几个
        goToSlide(index)
    })
}

//重要—— 做到直接到达某一个slide的效果
function goToSlide(index) {
    if(index > $buttons.length - 1){
        index = 0
    }else if(index < 0){
        index = $buttons.length - 1
    }
    //如果是从最后一个到第一张
    if (current === $buttons.length - 1 && index === 0) {
        console.log('here')
        $slides.css({
                transform: `translateX(${-($buttons.length + 1)*259}px)`
            })
            .one('transitionend', function () {
                $slides.hide()
                    .offset() //返回对象,后面加对象，先隐藏再显示时要用到这个
                $slides.css({
                        transform: `translateX(${-(index+1)*259}px)`
                    })
                    .show()
            })
    } else if (current === 0 && index === $buttons.length - 1) {
        console.log(2)
        //从第一张回到最后一张
        $slides.css({
                transform: `translateX(0px)`
            })
            .one('transitionend', function () {
                $slides.hide()
                    .offset() //返回对象,后面加对象
                $slides.css({
                        transform: `translateX(${-(index+1)*259}px)`
                    })
                    .show()
            })
    } else {
        console.log(3)
        $slides.css({
            transform: `translateX(${-(index+1)*259 }px)`
        })
    }
    current = index
}

function makeFakeSlides() {
    //复制第一个
    let $firstCopy = $images.eq(0).clone(true) //参数true就是子元素也要克隆；$images.eq表示所有图片
    let $lastCopy = $images.eq($images.length - 1).clone(true)
    $slides.append($firstCopy) //第一个复制到最后
    $slides.prepend($lastCopy) //把最后一个复制到第一个
}