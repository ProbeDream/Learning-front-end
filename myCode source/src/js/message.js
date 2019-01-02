!function() {
  //数据模型 model  通过操作Message表的Model对象!
  var model = Model({ resourceName: "Message" });

  //视图View
  var view = View("section.message");

  var controller = Controller({
    messageList: null,
    myForm: null,
    init: function(view, model) {
      this.messageList = view.querySelector("#messageList");
      this.myForm = view.querySelector("#postMessageForm");
      this.loadMessages();
    },
    loadMessages: function() {
      //获取对象 根据对应的对象ID进行获取操作!
      this.model.fetch().then(
        Messages => {
          let array = Messages.map(item => item.attributes);
          array.forEach(item => {
            /**
        创建一个li元素 并且里面的内容就是 item项里面的内容! 
        最后将li标签插入到ol对应的ID MessageList中!
        **/
            let li = document.createElement("li");
            li.innerText = `${item.name}:${item.content}`;
            this.messageList.appendChild(li);
          });
          // 成功获得实例todo就是id为的Todo对象实例
        },
        function(error) {
          // 异常处理
          alert("提交失败!");
          //打印错误堆栈信息!
          console.log(error);
        }
      );
    },
    bindEvents: function() {
      console.log(this.myForm);
      this.myForm.addEventListener("submit", e => {
        e.preventDefault();
        this.saveMessage();
      });
    },
    saveMessage: function() {
      let myForm = this.myForm;
      let name = myForm.querySelector("input[name=name]").value;
      let content = myForm.querySelector("input[name=content]").value;
      this.model.save({ name: name, content: content }).then(object => {
        //如果说用户在Input输入框中存入成功了的话 就对其进行局部刷新
        //window.location.reload(); 对当前窗口进行重新载入!
        //如果需要做到无刷新添加的话 就需要用到动态内容插入 直接将标签插入到页面当中!
        let li = document.createElement("li");
        li.innerText = `${object.attributes.name}:${object.attributes.content}`;
        let messageList = document.querySelector("#messageList");
        messageList.appendChild(li);
        //内容清空 也就是表单内容为空字符串!
        myForm.querySelector("input[name=content]").value = "";
      });
    }
  });
  controller.init(view, model);
}.call();
