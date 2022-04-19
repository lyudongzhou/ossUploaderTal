'use strict';

var _classCallCheck = require("@babel/runtime-corejs3/helpers/classCallCheck");

var _createClass = require("@babel/runtime-corejs3/helpers/createClass");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _Promise = require("@babel/runtime-corejs3/core-js-stable/promise");

var _setTimeout = require("@babel/runtime-corejs3/core-js-stable/set-timeout");

_Object$defineProperty(exports, '__esModule', {
  value: true
});
/*
 * @Author: lyudongzhou
 * @Date: 2022-04-18 11:16:39
 * @LastEditors: Lyudongzhou
 * @LastEditTime: 2022-04-18 19:04:31
 * @Description: 请填写简介
 */


var arrowFun = function arrowFun() {
  console.log("hi");
};

var Person = /*#__PURE__*/function () {
  function Person() {
    _classCallCheck(this, Person);

    this.name = "lyudongzhou";
  }

  _createClass(Person, [{
    key: "play",
    value: function play() {
      console.log("this.name".concat(this.name));
      arrowFun();
    }
  }, {
    key: "stand",
    value: function stand() {
      return new _Promise(function (resolve) {
        _setTimeout(resolve);
      });
    }
  }]);

  return Person;
}();

exports.Person = Person;
