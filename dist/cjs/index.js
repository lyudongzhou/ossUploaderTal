'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _classCallCheck = require('@babel/runtime-corejs3/helpers/classCallCheck');
var _createClass = require('@babel/runtime-corejs3/helpers/createClass');
var _Promise = require('@babel/runtime-corejs3/core-js-stable/promise');
var _setTimeout = require('@babel/runtime-corejs3/core-js-stable/set-timeout');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _Promise__default = /*#__PURE__*/_interopDefaultLegacy(_Promise);
var _setTimeout__default = /*#__PURE__*/_interopDefaultLegacy(_setTimeout);

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var fails$5 = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$4 = fails$5;

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails$4(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var fails$3 = fails$5;

var functionBindNative = !fails$3(function () {
  // eslint-disable-next-line es-x/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

var NATIVE_BIND$1 = functionBindNative;

var FunctionPrototype$2 = Function.prototype;
var bind = FunctionPrototype$2.bind;
var call$3 = FunctionPrototype$2.call;
var uncurryThis$4 = NATIVE_BIND$1 && bind.bind(call$3, call$3);

var functionUncurryThis = NATIVE_BIND$1 ? function (fn) {
  return fn && uncurryThis$4(fn);
} : function (fn) {
  return fn && function () {
    return call$3.apply(fn, arguments);
  };
};

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global$g =
  // eslint-disable-next-line es-x/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

var global$f = global$g;

var TypeError$5 = global$f.TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$1 = function (it) {
  if (it == undefined) throw TypeError$5("Can't call method on " + it);
  return it;
};

var global$e = global$g;
var requireObjectCoercible = requireObjectCoercible$1;

var Object$2 = global$e.Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject$1 = function (argument) {
  return Object$2(requireObjectCoercible(argument));
};

var uncurryThis$3 = functionUncurryThis;
var toObject = toObject$1;

var hasOwnProperty = uncurryThis$3({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es-x/no-object-hasown -- safe
var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};

var DESCRIPTORS$4 = descriptors;
var hasOwn$1 = hasOwnProperty_1;

var FunctionPrototype$1 = Function.prototype;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS$4 && Object.getOwnPropertyDescriptor;

var EXISTS$1 = hasOwn$1(FunctionPrototype$1, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS$1 && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE$1 = EXISTS$1 && (!DESCRIPTORS$4 || (DESCRIPTORS$4 && getDescriptor(FunctionPrototype$1, 'name').configurable));

var functionName = {
  EXISTS: EXISTS$1,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE$1
};

var objectDefineProperty = {};

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
var isCallable$5 = function (argument) {
  return typeof argument == 'function';
};

var isCallable$4 = isCallable$5;

var isObject$4 = function (it) {
  return typeof it == 'object' ? it !== null : isCallable$4(it);
};

var global$d = global$g;
var isObject$3 = isObject$4;

var document = global$d.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject$3(document) && isObject$3(document.createElement);

var documentCreateElement = function (it) {
  return EXISTS ? document.createElement(it) : {};
};

var DESCRIPTORS$3 = descriptors;
var fails$2 = fails$5;
var createElement = documentCreateElement;

// Thanks to IE8 for its funny defineProperty
var ie8DomDefine = !DESCRIPTORS$3 && !fails$2(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var DESCRIPTORS$2 = descriptors;
var fails$1 = fails$5;

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
var v8PrototypeDefineBug = DESCRIPTORS$2 && fails$1(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});

var global$c = global$g;
var isObject$2 = isObject$4;

var String$2 = global$c.String;
var TypeError$4 = global$c.TypeError;

// `Assert: Type(argument) is Object`
var anObject$1 = function (argument) {
  if (isObject$2(argument)) return argument;
  throw TypeError$4(String$2(argument) + ' is not an object');
};

var NATIVE_BIND = functionBindNative;

var call$2 = Function.prototype.call;

var functionCall = NATIVE_BIND ? call$2.bind(call$2) : function () {
  return call$2.apply(call$2, arguments);
};

var global$b = global$g;
var isCallable$3 = isCallable$5;

var aFunction = function (argument) {
  return isCallable$3(argument) ? argument : undefined;
};

var getBuiltIn$2 = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global$b[namespace]) : global$b[namespace] && global$b[namespace][method];
};

var uncurryThis$2 = functionUncurryThis;

var objectIsPrototypeOf = uncurryThis$2({}.isPrototypeOf);

var getBuiltIn$1 = getBuiltIn$2;

var engineUserAgent = getBuiltIn$1('navigator', 'userAgent') || '';

var global$a = global$g;
var userAgent = engineUserAgent;

var process = global$a.process;
var Deno = global$a.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

var engineV8Version = version;

/* eslint-disable es-x/no-symbol -- required for testing */

var V8_VERSION = engineV8Version;
var fails = fails$5;

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- required for testing
var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

/* eslint-disable es-x/no-symbol -- required for testing */

var NATIVE_SYMBOL$1 = nativeSymbol;

var useSymbolAsUid = NATIVE_SYMBOL$1
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

var global$9 = global$g;
var getBuiltIn = getBuiltIn$2;
var isCallable$2 = isCallable$5;
var isPrototypeOf = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

var Object$1 = global$9.Object;

var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable$2($Symbol) && isPrototypeOf($Symbol.prototype, Object$1(it));
};

var global$8 = global$g;

var String$1 = global$8.String;

var tryToString$1 = function (argument) {
  try {
    return String$1(argument);
  } catch (error) {
    return 'Object';
  }
};

var global$7 = global$g;
var isCallable$1 = isCallable$5;
var tryToString = tryToString$1;

var TypeError$3 = global$7.TypeError;

// `Assert: IsCallable(argument) is true`
var aCallable$1 = function (argument) {
  if (isCallable$1(argument)) return argument;
  throw TypeError$3(tryToString(argument) + ' is not a function');
};

var aCallable = aCallable$1;

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
var getMethod$1 = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};

var global$6 = global$g;
var call$1 = functionCall;
var isCallable = isCallable$5;
var isObject$1 = isObject$4;

var TypeError$2 = global$6.TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject$1(val = call$1(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject$1(val = call$1(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject$1(val = call$1(fn, input))) return val;
  throw TypeError$2("Can't convert object to primitive value");
};

var shared$1 = {exports: {}};

var global$5 = global$g;

// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var defineProperty$1 = Object.defineProperty;

var setGlobal$1 = function (key, value) {
  try {
    defineProperty$1(global$5, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global$5[key] = value;
  } return value;
};

var global$4 = global$g;
var setGlobal = setGlobal$1;

var SHARED = '__core-js_shared__';
var store$1 = global$4[SHARED] || setGlobal(SHARED, {});

var sharedStore = store$1;

var store = sharedStore;

(shared$1.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.22.0',
  mode: 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.22.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

var uncurryThis$1 = functionUncurryThis;

var id = 0;
var postfix = Math.random();
var toString = uncurryThis$1(1.0.toString);

var uid$1 = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};

var global$3 = global$g;
var shared = shared$1.exports;
var hasOwn = hasOwnProperty_1;
var uid = uid$1;
var NATIVE_SYMBOL = nativeSymbol;
var USE_SYMBOL_AS_UID = useSymbolAsUid;

var WellKnownSymbolsStore = shared('wks');
var Symbol$1 = global$3.Symbol;
var symbolFor = Symbol$1 && Symbol$1['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

var wellKnownSymbol$1 = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};

var global$2 = global$g;
var call = functionCall;
var isObject = isObject$4;
var isSymbol$1 = isSymbol$2;
var getMethod = getMethod$1;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol = wellKnownSymbol$1;

var TypeError$1 = global$2.TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
var toPrimitive$1 = function (input, pref) {
  if (!isObject(input) || isSymbol$1(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol$1(result)) return result;
    throw TypeError$1("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

var toPrimitive = toPrimitive$1;
var isSymbol = isSymbol$2;

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
var toPropertyKey$1 = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};

var global$1 = global$g;
var DESCRIPTORS$1 = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var anObject = anObject$1;
var toPropertyKey = toPropertyKey$1;

var TypeError = global$1.TypeError;
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
objectDefineProperty.f = DESCRIPTORS$1 ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var DESCRIPTORS = descriptors;
var FUNCTION_NAME_EXISTS = functionName.EXISTS;
var uncurryThis = functionUncurryThis;
var defineProperty = objectDefineProperty.f;

var FunctionPrototype = Function.prototype;
var functionToString = uncurryThis(FunctionPrototype.toString);
var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
var regExpExec = uncurryThis(nameRE.exec);
var NAME = 'name';

// Function instances `.name` property
// https://tc39.es/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !FUNCTION_NAME_EXISTS) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return regExpExec(nameRE, functionToString(this))[1];
      } catch (error) {
        return '';
      }
    }
  });
}

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
    _classCallCheck__default["default"](this, Person);

    this.name = "lyudongzhou";
  }

  _createClass__default["default"](Person, [{
    key: "play",
    value: function play() {
      console.log("this.name".concat(this.name));
      arrowFun();
    }
  }, {
    key: "stand",
    value: function stand() {
      return new _Promise__default["default"](function (resolve) {
        _setTimeout__default["default"](resolve);
      });
    }
  }]);

  return Person;
}();

exports.Person = Person;
