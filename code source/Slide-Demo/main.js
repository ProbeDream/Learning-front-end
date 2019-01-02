init();
let n = 1;
let timer= setInterval(() => {
  //如果n为4的话 那么就将n/3的余数赋值给n 如果n=6的话 那么就将3赋值给n
  makeLeave($(getImage(n)))
  .one("transitionend", e => {
  makeEnter($(e.currentTarget));
  });
  makeCurrent($(getImage(n+1)));
  n += 1;
}, 3000);

function x(n) {
  if (n > 3) {
    n = n % 3;
    if (n === 0) {
      n = 3;
    }
  }
  return n;
}

function init() {
  let n = 1;
  $(`.images > img:nth-child(${n})`)
    .addClass("current")
    .siblings()
    .addClass("enter");
}

function makeCurrent($node) {
  $node.removeClass("enter leave").addClass("current");
  return $node;
}
function makeLeave($node) {
  $node.removeClass("enter current").addClass("leave");
  return $node;
}

function makeEnter($node) {
  $node.removeClass("current leave").addClass("enter");
  return $node;
}

function getImage(n){
 return  $(`.images > img:nth-child(${x(n)})`)
}

document.addEventListener('visibilitychange',function(){
  if(document.hidden){
    window.clearInterval(timer)
  }else{
    timer= setInterval(() => {
      //如果n为4的话 那么就将n/3的余数赋值给n 如果n=6的话 那么就将3赋值给n
      makeLeave($(getImage(n)))
      .one("transitionend", e => {
      makeEnter($(e.currentTarget));
      });
      makeCurrent($(getImage(n+1)));
      n += 1;
    }, 3000);
  }
})