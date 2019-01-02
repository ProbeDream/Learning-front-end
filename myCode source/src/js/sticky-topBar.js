!function() {
  var model = {
    init() {
      var APP_ID = "TsDnap9SEXjSvGSowP7gXXJC-gzGzoHsz";
      var APP_KEY = "rGye31p12mM3wFpNRn9RADu9";
      AV.init({ appId: APP_ID, appKey: APP_KEY });
    },
    fetch: function() {
      var query = new AV.Query("X");
      return query.find(); // Promise 对象
    },
    // 创建数据
    save: function(name) {
      var Message = AV.Object.extend("X");
      var message = new Message();
      return message.save({
        // Promise 对象
        name: name
      });
    }
  };

  var view = View("#topNavbar");
  var controller = {
    view: null,
    init: function(view) {
      this.view = view;
      this.bindEvents();
      window.addEventListener("scroll", x => {
        if (window.scrollY > 0) {
          this.active.call(this);
        } else {
          this.deactive.call(this);
        }
      });
    },
    bindEvents: function() {
      var view = this.view;
    },
    active: function() {
      this.view.classList.add("sticky");
    },
    deactive: function() {
      this.view.classList.remove("sticky");
    }
  };

  controller.init(view);
}.call();
