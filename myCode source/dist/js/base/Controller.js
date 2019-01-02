"use strict";

window.Controller = function (options) {
  var _init = options.init;

  var Object = {
    view: null,
    model: null,
    init: function init(view, model) {
      this.view = view;
      this.model = model;
      this.model.init();
      _init.call(this, view, model);
      this.bindEvents.call(this);
    }
  };
  for (var key in options) {
    if (key !== "init") {
      Object[key] = options[key];
    }
  }
  return Object;
};