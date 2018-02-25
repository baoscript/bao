(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"));
	else if(typeof define === 'function' && define.amd)
		define(["jQuery"], factory);
	else if(typeof exports === 'object')
		exports["Bao"] = factory(require("jQuery"));
	else
		root["Bao"] = factory(root["jQuery"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = __webpack_require__(0);
var Variable = __webpack_require__(6);

var Context = function () {
  /**
   * Create Bao context.
   * @param {function} baoStepFactory factory function to create BaoStep.
   */
  function Context(baoStepFactory) {
    _classCallCheck(this, Context);

    this.baoStepFactory_ = baoStepFactory;
    this.vars_ = new Map();
    this.steps_ = new Map();
  }

  /** @return {function} BaoStep factory. */


  _createClass(Context, [{
    key: 'getBaoStepFactory',
    value: function getBaoStepFactory() {
      return this.baoStepFactory_;
    }

    /**
     * Get step by name.
     * @param {string} name 
     */

  }, {
    key: 'getStep',
    value: function getStep(name) {
      return this.steps_.get(name);
    }

    /**
     * Set the step with JSON data.
     * @param {string} name 
     * @param {BaoStep} baoStep 
     */

  }, {
    key: 'setStep',
    value: function setStep(name, baoStep) {
      this.steps_.set(name, baoStep);
    }

    /**
     * Declare a variable if it doesn't exist.
     * @param {string} name 
     * @param {string} type
     */

  }, {
    key: 'maybeDeclareVar',
    value: function maybeDeclareVar(name, type) {
      if (!this.hasVar(name)) {
        this.vars_.set(name, Variable.createVariable(name, type));
      }
    }

    /**
     * Get variable by name.
     * @param {string} name 
     * @return {Variable}
     */

  }, {
    key: 'getVar',
    value: function getVar(name) {
      return this.vars_.get(name);
    }

    /**
     * Set value of the variable. Declare one if it doesn't exist with the type of val.
     * It takes either a literal or an expression object, e.g. {'expr': 'a+b'}.
     * @param {string} name 
     * @param {string|object} val 
     */

  }, {
    key: 'setVar',
    value: function setVar(name, val) {
      // We only eval expr here.
      if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && val['expr']) {
        this.setVar(name, this.eval(val['expr']));
      } else {
        // Deduce the type.
        this.maybeDeclareVar(name, typeof val === 'undefined' ? 'undefined' : _typeof(val));
        this.vars_.get(name).setVal(val);
      }
    }

    /**
     * Tell if a variable has been declared.
     * @param {string} name 
     */

  }, {
    key: 'hasVar',
    value: function hasVar(name) {
      return this.vars_.has(name);
    }

    /**
     * Return a js object with mapping of variable name to value.
     * @private
     */

  }, {
    key: 'getVarContext_',
    value: function getVarContext_() {
      var varContext = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.vars_[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
              name = _step$value[0],
              val = _step$value[1];

          varContext[name] = val.getVal();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return varContext;
    }
    /**
     * Eval an expression in this context.
     * @param {string} expr 
     */

  }, {
    key: 'eval',
    value: function _eval(expr) {
      return new Function('with(this){return ' + expr + '}').call(this.getVarContext_());
    }
  }, {
    key: 'sync',


    /** Update all variables with DOM elements. */
    value: function sync() {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.vars_[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = _slicedToArray(_step2.value, 2),
              name = _step2$value[0],
              val = _step2$value[1];

          val.sync();
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }]);

  return Context;
}();

module.exports = Context;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = __webpack_require__(0);
var Context = __webpack_require__(1);

/** A base class for a step abstraction in bao. */

var BaoStep = function () {
  function BaoStep(context) {
    _classCallCheck(this, BaoStep);

    // Type of the step. One of BaoStep, IfStep, GotoStep, ActionStep and SwitchStep.
    this.type_ = 'BaoStep';
    // Context
    this.context_ = context;
    // Step name
    this.name_ = undefined;
    // console.log
    this.print_ = undefined;
    // Init while entering, another step.
    this.init_ = undefined;
    // Setters of this step
    this.set_ = new Map();
    // BaoStep factory.
    this.baoStepFactory_ = context.getBaoStepFactory();
  }

  /** Get step type. */


  _createClass(BaoStep, [{
    key: 'getType',
    value: function getType() {
      return this.type_;
    }

    /** Get step name. */

  }, {
    key: 'getName',
    value: function getName() {
      return this.name_;
    }

    /**
     * Initialize step with JSON data.
     * @param {object} data 
     */

  }, {
    key: 'parseJsonData',
    value: function parseJsonData(data) {
      if (data) {
        // Set step name.
        this.name_ = data['name'];
        // Set init step.
        if (data['init']) {
          // Anonymous step.
          this.init_ = this.baoStepFactory_(this.context_, data['init']);
        }
        // print, literal only.
        if (data['print'] !== undefined) {
          this.print_ = data['print'];
        }
        if (data['decl']) {
          for (var varName in data['decl']) {
            // Vars decl.
            this.context_.maybeDeclareVar(varName, data['decl'][varName]);
          }
        }
        // Set setlist.
        if (data['set']) for (var _varName in data['set']) {
          this.set_.set(_varName, data['set'][_varName]);
        }
      }
    }

    /** 
     * Run the setter step.
     * @private
     */

  }, {
    key: 'setVars_',
    value: function setVars_() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.set_[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
              name = _step$value[0],
              val = _step$value[1];

          this.context_.setVar(name, val);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    /** Run the step. */

  }, {
    key: 'run',
    value: function run() {
      // Remove all registered click handlers first.
      $('[data-bao-action]').off('click').prop('disabled', true);
      console.log('Current step: ' + this.name_ + ' (' + this.getType() + ')');
      // Run init
      if (this.init_) {
        this.init_.run();
      }
      if (this.set_) {
        this.setVars_();
      }
      if (this.print_ != undefined) {
        console.log(this.print_);
      }
      return null;
    }
  }]);

  return BaoStep;
}();

module.exports = BaoStep;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = __webpack_require__(0);

var Variable = function () {
  /**
   * Create a variable with name and type.
   * Do not use this contructor directly. Instead use the factory function
   * createVariable() in variable.js.
   * @param {string} name 
   * @param {string} type one of number, string and boolean.
   */
  function Variable(name, type) {
    _classCallCheck(this, Variable);

    this.name_ = name;
    this.val_ = undefined;
    this.type_ = type;
    this.updateDomElements_();
  }

  /**
   * Set the value of this variable.
   * @param {anything} val
   */


  _createClass(Variable, [{
    key: 'setVal',
    value: function setVal(val) {
      if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) !== this.type_) {
        throw 'Invalid ' + this.type_ + ' ' + val;
      }
      this.val_ = val;
      this.updateDomElements_();
    }

    /**
     * Get the value of variable.
     */

  }, {
    key: 'getVal',
    value: function getVal() {
      return this.val_;
    }

    /** 
     * Update the value of the linked DOM element with this variable.
     * @private
     */

  }, {
    key: 'updateDomElements_',
    value: function updateDomElements_() {
      $('[data-bao-target="' + this.name_ + '"]').val(this.val_);
    }

    /**
     * Update the value with the linked DOM element.
     */

  }, {
    key: 'sync',
    value: function sync() {
      var val = $('[data-bao-target="' + this.name_ + '"]').val();
      this.val_ = this.parseString(val);
    }

    /**
     * Converts string to the type.
     * A base method to be implemented by subclasses.
     * @param {string} str 
     */

  }, {
    key: 'parseString',
    value: function parseString(str) {
      throw 'This method is not implemented';
    }
  }]);

  return Variable;
}();

module.exports = Variable;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = __webpack_require__(0);
var BaoStep = __webpack_require__(5);
var Context = __webpack_require__(1);

var Bao = function () {
  function Bao() {
    _classCallCheck(this, Bao);

    this.context_ = new Context(BaoStep.createBaoStep);
  }

  /** Initialize bao with JSON data. */


  _createClass(Bao, [{
    key: 'parseString',
    value: function parseString(json) {
      var data = JSON.parse(json);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var stepJson = _step.value;

          this.context_.setStep(stepJson['name'], BaoStep.createBaoStep(this.context_, stepJson));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return this;
    }

    /** Start bao flow. */

  }, {
    key: 'run',
    value: function run() {
      var current = this.context_.getStep('#begin');
      current.run();
    }
  }]);

  return Bao;
}();

// Only exports bao runner.


module.exports = {
  runBao: function runBao(json) {
    new Bao().parseString(json).run();
  }
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var Context = __webpack_require__(1);
var BaseStep = __webpack_require__(2);
var IfStep = __webpack_require__(10);
var SwitchStep = __webpack_require__(11);
var GotoStep = __webpack_require__(12);
var ActionStep = __webpack_require__(13);

/**
 * A factory method to create bao steps with appropriate subclasses.
 * @param {Context} context
 * @param {object} data
 * @return {BaoStep}
 */
function createBaoStep(context, data) {
  if (data['if']) {
    var ifStep = new IfStep(context);
    ifStep.parseJsonData(data);
    return ifStep;
  }
  if (data['goto']) {
    var gotoStep = new GotoStep(context);
    gotoStep.parseJsonData(data);
    return gotoStep;
  }
  if (data['next']) {
    var actionStep = new ActionStep(context);
    actionStep.parseJsonData(data);
    return actionStep;
  }
  if (data['switch']) {
    var switchStep = new SwitchStep(context);
    switchStep.parseJsonData(data);
    return switchStep;
  }
  var step = new BaseStep(context);
  step.parseJsonData(data);
  return step;
}

module.exports = {
  // Export factory.
  createBaoStep: createBaoStep
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var Variable = __webpack_require__(3);
var NumberVariable = __webpack_require__(7);
var StringVariable = __webpack_require__(8);
var BooleanVariable = __webpack_require__(9);
/**
 * A factory to create a variable with name and type.
 * @param {string} name 
 * @param {string} type one of number, string and boolean.
 * @return {Variable}
 */
function createVariable(name, type) {
  switch (type) {
    case 'number':
      return new NumberVariable(name);
    case 'string':
      return new StringVariable(name);
    case 'boolean':
      return new BoolVariable(name);
    default:
      throw 'Unsupported type ' + type;
  }
}

module.exports = {
  createVariable: createVariable
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Variable = __webpack_require__(3);

var NumberVariable = function (_Variable) {
  _inherits(NumberVariable, _Variable);

  /**
   * Create a number variable.
   * @param {string} name 
   */
  function NumberVariable(name) {
    _classCallCheck(this, NumberVariable);

    return _possibleConstructorReturn(this, (NumberVariable.__proto__ || Object.getPrototypeOf(NumberVariable)).call(this, name, 'number'));
  }

  /**
   * Convert string to number.
   * @param {string} str e.g. '43.250', '250', 43e250', '0b1101', '0x1f',
   *                          'NaN', 'Infinity'
   * @override
   */


  _createClass(NumberVariable, [{
    key: 'parseString',
    value: function parseString(str) {
      if (str === 'NaN') {
        return NaN;
      }
      val = Number(str);
      // Unable to parse.
      if (isNaN(val)) {
        throw 'Invalid number ' + str;
      }
      return val;
    }
  }]);

  return NumberVariable;
}(Variable);

module.exports = NumberVariable;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Variable = __webpack_require__(3);

var StringVariable = function (_Variable) {
  _inherits(StringVariable, _Variable);

  /**
   * Create a string variable.
   * @param {string} name 
   */
  function StringVariable(name) {
    _classCallCheck(this, StringVariable);

    return _possibleConstructorReturn(this, (StringVariable.__proto__ || Object.getPrototypeOf(StringVariable)).call(this, name, 'string'));
  }

  /**
   * @param {string} str
   * @override
   */


  _createClass(StringVariable, [{
    key: 'parseString',
    value: function parseString(str) {
      return str;
    }
  }]);

  return StringVariable;
}(Variable);

module.exports = StringVariable;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Variable = __webpack_require__(3);

var BooleanVariable = function (_Variable) {
  _inherits(BooleanVariable, _Variable);

  /**
   * Create a boolean variable.
   * @param {string} name 
   */
  function BooleanVariable(name) {
    _classCallCheck(this, BooleanVariable);

    return _possibleConstructorReturn(this, (BooleanVariable.__proto__ || Object.getPrototypeOf(BooleanVariable)).call(this, name, 'boolean'));
  }

  /**
   * Convert '0', '1', 'true', 'false' to boolean.
   * @param {string} str
   * @override
   */


  _createClass(BooleanVariable, [{
    key: 'parseString',
    value: function parseString(str) {
      switch (str) {
        case '1':
        case 'true':
          return true;
        case '0':
        case 'false':
          return false;
        default:
          throw 'A boolean value must be either true or false (' + str + ')';
      }
    }
  }]);

  return BooleanVariable;
}(Variable);

module.exports = BooleanVariable;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var $ = __webpack_require__(0);
var Context = __webpack_require__(1);
var BaoStep = __webpack_require__(2);

/** A step that contains if clause. */

var IfStep = function (_BaoStep) {
  _inherits(IfStep, _BaoStep);

  function IfStep(context) {
    _classCallCheck(this, IfStep);

    var _this = _possibleConstructorReturn(this, (IfStep.__proto__ || Object.getPrototypeOf(IfStep)).call(this, context));

    _this.type_ = 'IfStep';
    _this.condition_ = undefined;
    _this.thenStep_ = undefined;
    _this.elseStep_ = undefined;
    return _this;
  }

  /**
   * Parse an IfStep.
   * @param {object} data 
   * @override
   */


  _createClass(IfStep, [{
    key: 'parseJsonData',
    value: function parseJsonData(data) {
      _get(IfStep.prototype.__proto__ || Object.getPrototypeOf(IfStep.prototype), 'parseJsonData', this).call(this, data);
      if (!data['if'] || !data['if']['condition'] || !data['if']['then']) {
        throw 'Invalid if step';
      }
      this.condition_ = data['if']['condition'];
      this.thenStep_ = this.baoStepFactory_(this.context_, data['if']['then']);
      // Optional else clause.
      if (data['if']['else']) {
        this.elseStep_ = this.baoStepFactory_(this.context_, data['if']['else']);
      }
    }

    /**
     * If step implementation.
     * @override
     */

  }, {
    key: 'run',
    value: function run() {
      _get(IfStep.prototype.__proto__ || Object.getPrototypeOf(IfStep.prototype), 'run', this).call(this);
      if (!this.condition_ || !this.thenStep_) {
        throw 'Invalid if step';
      }
      if (this.context_.eval(this.condition_)) {
        return this.thenStep_.run();
      }
      if (this.elseStep_) {
        return this.elseStep_.run();
      }
      return null;
    }
  }]);

  return IfStep;
}(BaoStep);

module.exports = IfStep;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var $ = __webpack_require__(0);
var Context = __webpack_require__(1);
var BaoStep = __webpack_require__(2);

/** A step that contains switch clause. */

var SwitchStep = function (_BaoStep) {
  _inherits(SwitchStep, _BaoStep);

  function SwitchStep(context) {
    _classCallCheck(this, SwitchStep);

    var _this = _possibleConstructorReturn(this, (SwitchStep.__proto__ || Object.getPrototypeOf(SwitchStep)).call(this, context));

    _this.type_ = 'SwitchStep';
    _this.expr_ = undefined;
    _this.cases_ = new Map();
    _this.defaultStep_ = undefined;
    return _this;
  }

  /**
   * Parse a SwitchStep.
   * @param {object} data 
   * @override
   */


  _createClass(SwitchStep, [{
    key: 'parseJsonData',
    value: function parseJsonData(data) {
      _get(SwitchStep.prototype.__proto__ || Object.getPrototypeOf(SwitchStep.prototype), 'parseJsonData', this).call(this, data);
      if (!data['switch'] || !data['switch']['expr'] || !data['switch']['cases']) {
        throw 'Invalid switch step';
      }
      this.expr_ = data['switch']['expr'];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data['switch']['cases'][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
              val = _step$value[0],
              clause = _step$value[1];

          this.cases_.set(val, this.baoStepFactory_(this.context_, clause));
        }

        // Optional default clause.
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (data['switch']['default']) {
        this.defaultStep_ = this.baoStepFactory_(this.context_, data['switch']['default']);
      }
    }

    /**
     * Switch step implementation.
     * @override
     */

  }, {
    key: 'run',
    value: function run() {
      _get(SwitchStep.prototype.__proto__ || Object.getPrototypeOf(SwitchStep.prototype), 'run', this).call(this);
      if (!this.expr_ || !this.cases_) {
        throw 'Invalid switch step';
      }
      var exprVal = this.context_.eval(this.expr_);
      var clause = this.cases_.get(exprVal);
      if (clause) {
        return clause.run();
      }
      if (this.defaultStep_) {
        return this.defaultStep_.run();
      }
      return null;
    }
  }]);

  return SwitchStep;
}(BaoStep);

module.exports = SwitchStep;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var $ = __webpack_require__(0);
var Context = __webpack_require__(1);
var BaoStep = __webpack_require__(2);

/** A step that contains goto clause. */

var GotoStep = function (_BaoStep) {
  _inherits(GotoStep, _BaoStep);

  function GotoStep(context) {
    _classCallCheck(this, GotoStep);

    var _this = _possibleConstructorReturn(this, (GotoStep.__proto__ || Object.getPrototypeOf(GotoStep)).call(this, context));

    _this.type_ = 'GotoStep';
    // The **name** of goto step.
    _this.goto_ = undefined;
    return _this;
  }

  /**
   * Parse an GotoStep。
   * @param {object} data 
   * @override
   */


  _createClass(GotoStep, [{
    key: 'parseJsonData',
    value: function parseJsonData(data) {
      _get(GotoStep.prototype.__proto__ || Object.getPrototypeOf(GotoStep.prototype), 'parseJsonData', this).call(this, data);
      if (!data['goto']) {
        throw 'Invalid goto step';
      }
      this.goto_ = data['goto'];
    }

    /**
     * Goto step implementation.
     * @override
     */

  }, {
    key: 'run',
    value: function run() {
      _get(GotoStep.prototype.__proto__ || Object.getPrototypeOf(GotoStep.prototype), 'run', this).call(this);
      if (!this.goto_ || !this.context_.getStep(this.goto_)) {
        throw 'Invalid goto step';
      }
      return this.context_.getStep(this.goto_).run();
    }
  }]);

  return GotoStep;
}(BaoStep);

module.exports = GotoStep;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var $ = __webpack_require__(0);
var Context = __webpack_require__(1);
var BaoStep = __webpack_require__(2);

/** A step that waits on UI click actions. */

var ActionStep = function (_BaoStep) {
  _inherits(ActionStep, _BaoStep);

  function ActionStep(context) {
    _classCallCheck(this, ActionStep);

    var _this = _possibleConstructorReturn(this, (ActionStep.__proto__ || Object.getPrototypeOf(ActionStep)).call(this, context));

    _this.type_ = 'ActionStep';
    // Next steps.
    _this.nextSteps_ = new Map();
    return _this;
  }

  /**
   * Parse an ActionStep。
   * @param {object} data 
   * @override
   */


  _createClass(ActionStep, [{
    key: 'parseJsonData',
    value: function parseJsonData(data) {
      _get(ActionStep.prototype.__proto__ || Object.getPrototypeOf(ActionStep.prototype), 'parseJsonData', this).call(this, data);
      if (!data['next']) {
        throw 'Invalid action step';
      }
      if (data['next']) {
        for (var action in data['next']) {
          // Create an anonymous step.
          var next = this.baoStepFactory_(this.context_, data['next'][action]);
          this.nextSteps_.set(action, next);
        }
      }
    }

    /**
     * Action step implementation.
     * @override
     */

  }, {
    key: 'run',
    value: function run() {
      _get(ActionStep.prototype.__proto__ || Object.getPrototypeOf(ActionStep.prototype), 'run', this).call(this);
      // Register click handler.
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.nextSteps_[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
              action = _step$value[0],
              next = _step$value[1];

          this.registerButton_(action, next);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return null;
    }

    /**
     * Register click handler for next steps.
     * @param {string} action 
     * @param {BaoStep} next 
     * @private
     */

  }, {
    key: 'registerButton_',
    value: function registerButton_(action, next) {
      $('[data-bao-action="' + action + '"]').prop('disabled', false).click([this.context_, next], function (e) {
        var context = e.data[0];
        context.sync();
        var next = e.data[1];
        next.run();
      });
    }
  }]);

  return ActionStep;
}(BaoStep);

module.exports = ActionStep;

/***/ })
/******/ ]);
});
//# sourceMappingURL=bao.js.map