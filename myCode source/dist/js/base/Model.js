"use strict";

//将函数封装成一个 对象 并且暴露出一个需要传入的参数列表 便可以完成对应的操作!
window.Model = function (options) {
  var resourceName = options.resourceName;
  return {
    init: function init() {
      var APP_ID = "D30iDj3vhwJ1FyNftNNhNESs-gzGzoHsz";
      var APP_KEY = "DOscwT1elqm8H2krUb9F1RcJ";
      //AV对象初始化
      AV.init({ appId: APP_ID, appKey: APP_KEY });
    },
    fetch: function fetch() {
      var query = new AV.Query(resourceName);
      return query.find(); //Promise对象
    },
    //保存方法的话 是保存的一个对象 因为是做成一个通用模板!
    save: function save(Object) {
      var Instance = AV.Object.extend(resourceName);
      var instance = new Instance();
      //返回一个Promise对象!
      return instance.save(Object);
    }
  };
};