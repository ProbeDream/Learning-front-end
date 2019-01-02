//把Code写到#code和style标签里面!
function writeCode(prefix, code, fn) {
  let domCode = document.querySelector("#code");
  domCode.innerHTML = prefix || "";
  let n = 0;
  let id = setInterval(() => {
    n += 1;
    //每次加一个字符! 当然也可以加上 result[n-1] 因为n是在不断变化的!
    domCode.innerHTML = Prism.highlight(
      prefix + code.substring(0, n),
      Prism.languages.css
    );
    styleTag.innerHTML = prefix + code.substring(0, n);
    domCode.scrollTop = domCode.scrollHeight;
    if (n >= code.length) {
      window.clearInterval(id);
      fn.call(); //当代码完成之后就会Call!
    }
  }, 50);
}

function writeMarkDown(MarkDown, fn) {
  let domPaper = document.querySelector("#paper>.content");
  let n = 0;
  let id = setInterval(() => {
    n += 1;
    (domPaper.innerHTML = MarkDown.substring(0, n)),
      (domPaper.scrollTop = domPaper.scrollHeight);
    if (n >= MarkDown.length) {
      window.clearInterval(id);
      fn.call();
    }
  }, 35);
}

var result = `/*
*面试官你好,我是ProbeDream
*我将以动画的形式来介绍自己
*只用文字的介绍太单调了
*所以我想使用代码来介绍自己
*首先先准备一些样式
*/

*{
    transition:all 1s;
}
html{
    background:rgb(222,222,222);
    font-size:16px;
    font-family: 楷体;
}
#code{
    border:1px solid red;
    padding:16px;
}

/*我需要一点代码高亮!*/

.token.selector{ color: #690; }
.token.property{ color: #905; }

/*加点3D效果!*/
#code{transform:rotate(360deg);}

/*该好好介绍一下我自己了!*/
/*我需要一张白纸*/
#code{position:fixed;left:0;width:50%;height:100%;}

#paper{
  position:fixed;right:0;width:50%;height:100%;
  background:black;display:flex;justify-content:center;
  align-items:center;padding:7px;
  }
#paper > .content{background:white;height:100%;width:100%;}
`;
var result2 = `
#paper{
   }

  /*接下来把 MarkDown 变成 HTML! 推荐 Marked.js*/ 
  
  /*接下来给HTML加样式!*/

  /*这就是我的Resume!*/   

  `;

var markDown = `
内容待补充!

`;

writeCode("", result, () => {
  createPaper(() => {
    writeCode(result, result2, () => {
      writeMarkDown(markDown, () => {});
    });
  });
});
/*  其中的writeCode 其实只是只定了一个闹钟  然后writeCode返回 执行fn2() 闹钟时间到了 开始写第一句代码!*/

function createPaper(fn) {
  var paper = document.createElement("div");
  paper.id = "paper";
  var content = document.createElement("pre");
  content.className = "content";
  paper.appendChild(content);
  document.body.appendChild(paper);
  fn.call();
}
