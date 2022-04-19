import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/createClass";
import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";
import _setTimeout from "@babel/runtime-corejs3/core-js-stable/set-timeout";

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

export { Person };
