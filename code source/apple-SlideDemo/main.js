let $buttons = $("#buttonWrapper > button");
let $slides = $("#slides");
let $images = $slides.children("img");
let current = 0;

//Code execution sequence 代码执行流程
makeFakeSlide();
$slides.css({
  transform: "translateX(-941px)"
});
bindEvents();

//自动轮播
let timer = setInterval(function() {
  goToSlide(current + 1);
}, 2000);

//鼠标移入轮播图区域 就停止轮播! 鼠标移出的话 就继续轮播!
$(".container")
  .on("mouseenter", function() {
    window.clearInterval(timer);
  })
  .on("mouseleave", function() {
    timer = setInterval(function() {
      goToSlide(current + 1);
    }, 2000);
  });

//往下翻页
$(next).on("click", function() {
  goToSlide(current + 1);
});

//往上翻页
$(previous).on("click", function() {
  goToSlide(current - 1);
});

//绑定事件!
function bindEvents() {
  $("#buttonWrapper").on("click", "button", function(e) {
    let $button = $(e.currentTarget);
    let index = $button.index();
    goToSlide(index);
  });
}

//做两张假的页面!
function makeFakeSlide() {
  let $firstCopy = $images.eq(0).clone(true);
  let $lastCopy = $images.eq($images.length - 1).clone(true);

  $slides.append($firstCopy); //追加
  $slides.prepend($lastCopy); //追加到最前面
}

//翻页函数
function goToSlide(index) {
  //如果页面数量超界
  if (index > $buttons.length - 1) {
    index = 0;
  } else if (index < 0) {
    index = $buttons.length - 1;
  }
  if (current === $buttons.length - 1 && index === 0) {
    //最后一张到第一张
    $slides
      .css({ transform: `translateX(${-($buttons.length + 1) * 941}px)` })
      //给定一个假的页面  产生无缝效果!
      .one("transitionend", function() {
        $slides.hide().offset(); //先隐藏
        $slides
          .css({ transform: `translateX(${-(index + 1) * 941}px)` })
          .show(); //显示出来
        /**
         * 在隐藏和显示的过程中 浏览器会对其合并 会认为操作是隐藏并且把
         * 隐藏不封给删除掉
         * 而加了offset就会对其CSS进行重新计算 就会打断浏览器的合并过程!
         */
      });
  } else if (current === 0 && index === $buttons.length - 1) {
    //第一张到最后一张
    $slides
      .css({ transform: "translateX(0px)" })
      //给定一个假的页面  产生无缝效果!
      .one("transitionend", function() {
        $slides.hide().offset(); //先隐藏
        $slides
          .css({ transform: `translateX(${-(index + 1) * 941}px)` })
          .show(); //显示出来
        /**
         * 在隐藏和显示的过程中 浏览器会对其合并 会认为操作是隐藏并且把
         * 隐藏不封给删除掉
         * 而加了offset就会对其CSS进行重新计算 就会打断浏览器的合并过程!
         */
      });
  } else {
    $slides.css({ transform: `translateX(${-(index + 1) * 941}px)` });
  }
  current = index;
}
