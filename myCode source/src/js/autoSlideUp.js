!function() {
  //对一个特殊标签 添加一个offset(脱离)类
  let specialTags = document.querySelectorAll("[data-x]"); //通过指定的条件查询对应的标签元素!
  for (let index = 0; index < specialTags.length; index++) {
    specialTags[index].classList.add("offset"); //对一个特殊标签缇娜加一个Class
  }

  //之前的关于主体的高亮设置 为用户默认设置滚动! 1S之后调用该方法!
  findClosestAndRemoveOffset();
  window.addEventListener("scroll", function(x) {
    findClosestAndRemoveOffset();
  });

  //Healper
  //下拉高亮函数!
  function findClosestAndRemoveOffset() {
    //拿到指定的标签元素 进行遍历操作!
    let specialTags = document.querySelectorAll("[data-x]"); //通过指定的条件查询对应的标签元素!
    let minIndex = 0;
    //通过表达式 拿到的一组标签元素进行遍历操作!
    for (let index = 0; index < specialTags.length; index++) {
      //通过比对
      if (
        Math.abs(specialTags[index].offsetTop - window.scrollY) <
        Math.abs(specialTags[minIndex].offsetTop - window.scrollY)
      ) {
        minIndex = index;
      }
    }

    //默认的话 是向上偏移的30px 然后当滑动到对应的内容区域的话 取出对应的动画效果!
    specialTags[minIndex].classList.remove("offset");
    //minIndex就是离窗口顶部最近的元素!
    let id = specialTags[minIndex].id;
    let a = document.querySelector('a[href="#' + id + '"]');
    let li = a.parentNode;
    let brothersAndMe = li.parentNode.children;
    //先把li的兄弟样式去掉!
    for (let index = 0; index < brothersAndMe.length; index++) {
      brothersAndMe[index].classList.remove("highLight");
    }
    //对单前的li 进行样式的添加!
    li.classList.add("highLight");
  }

  //给定选择器 找到里面的所有的li
  let liTags = document.querySelectorAll("nav.menu > ul >li ");
  for (let i = 0; i < liTags.length; i++) {
    liTags[i].onmouseenter = function(details) {
      details.currentTarget.classList.add("active");
    };
    liTags[i].onmouseleave = function(details) {
      details.currentTarget.classList.remove("active");
    };
  }
}.call();
