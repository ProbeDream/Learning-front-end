"use strict";

!function () {
  var model = {
    init: function init() {
      var APP_ID = "TsDnap9SEXjSvGSowP7gXXJC-gzGzoHsz";
      var APP_KEY = "rGye31p12mM3wFpNRn9RADu9";
      AV.init({ appId: APP_ID, appKey: APP_KEY });
    },

    fetch: function fetch() {
      var query = new AV.Query("X");
      return query.find(); // Promise 对象
    },
    // 创建数据
    save: function save(name) {
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
    init: function init(view) {
      var _this = this;

      this.view = view;
      this.bindEvents();
      window.addEventListener("scroll", function (x) {
        if (window.scrollY > 0) {
          _this.active.call(_this);
        } else {
          _this.deactive.call(_this);
        }
      });
    },
    bindEvents: function bindEvents() {
      var view = this.view;
    },
    active: function active() {
      this.view.classList.add("sticky");
    },
    deactive: function deactive() {
      this.view.classList.remove("sticky");
    }
  };

  controller.init(view);
}.call();