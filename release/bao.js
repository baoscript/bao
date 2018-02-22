(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"));
	else if(typeof define === 'function' && define.amd)
		define(["jQuery"], factory);
	else if(typeof exports === 'object')
		exports["Bao"] = factory(require("jQuery"));
	else
		root["Bao"] = factory(root["jQuery"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = __webpack_require__(1);

/**
 * Eval an expression with context.
 * @param {object} context 
 * @param {string} expr 
 */
var evalWithContext = function evalWithContext(context, expr) {
  return new Function("with(this){return " + expr + "}").call(context);
};

var Variable = function () {
  /**
   * Create a variable with name.
   * @param {string} name 
   */
  function Variable(name) {
    _classCallCheck(this, Variable);

    this.name_ = name;
    this.val_ = null;
    this.updateDomElements_();
  }

  /**
   * Set the value of variable. It takes either a literal or
   * an expression object, e.g. {'expr': 'a+b'}.
   * @param {string|object} val 
   * @param {Context} context 
   */


  _createClass(Variable, [{
    key: "setVal",
    value: function setVal(val, context) {
      // We only eval expression here.
      if ((typeof val === "undefined" ? "undefined" : _typeof(val)) === 'object' && val['expr']) {
        this.val_ = evalWithContext(context.getVarContext(), val['expr']);
      } else {
        this.val_ = val;
      }
      this.updateDomElements_();
    }

    /**
     * Get the value of variable.
     */

  }, {
    key: "getVal",
    value: function getVal() {
      return this.val_;
    }

    /** 
     * Update the value of corresponding DOM element with this variable.
     * @private
     */

  }, {
    key: "updateDomElements_",
    value: function updateDomElements_() {
      var el = $('[data-bao-target="' + this.name_ + '"]');
      el.val(this.val_);
    }

    /**
     * Update the value with corresponding DOM element.
     */

  }, {
    key: "sync",
    value: function sync() {
      var el = $('[data-bao-target="' + this.name_ + '"]');
      try {
        // Try to parse types, otherwise treat as a string literal.
        this.val_ = eval(el.val());
      } catch (e) {
        this.val_ = el.val();
      }
    }
  }]);

  return Variable;
}();

var Context = function () {
  function Context() {
    _classCallCheck(this, Context);

    this.vars_ = new Map();
    this.steps_ = new Map();
  }

  /**
   * Get the step. Create one if it doesn't exist.
   * @param {string} name 
   */


  _createClass(Context, [{
    key: "getStep",
    value: function getStep(name) {
      if (!this.steps_.has(name)) {
        this.steps_.set(name, new BaoStep(this, name));
      }
      return this.steps_.get(name);
    }

    /**
     * Set the step with JSON data.
     * @param {string} name 
     * @param {object} stepJson 
     */

  }, {
    key: "setStep",
    value: function setStep(name, stepJson) {
      this.getStep(name).parseJsonData(stepJson);
    }

    /**
     * Declare a variable if it doesn't exist.
     * @param {string} name 
     */

  }, {
    key: "maybeDeclareVar",
    value: function maybeDeclareVar(name) {
      if (!this.hasVar(name)) {
        this.vars_.set(name, new Variable(name));
      }
    }

    /**
     * Get variable
     * @param {string} name 
     * @return {Variable}
     */

  }, {
    key: "getVar",
    value: function getVar(name) {
      return this.vars_.get(name);
    }

    /**
     * Set value of the variable. Declare one if it doesn't exist.
     * @param {string} name 
     * @param {string|object} val 
     */

  }, {
    key: "setVar",
    value: function setVar(name, val) {
      this.maybeDeclareVar(name);
      this.vars_.get(name).setVal(val, this);
    }

    /**
     * Tell if a variable has been declared.
     * @param {string} name 
     */

  }, {
    key: "hasVar",
    value: function hasVar(name) {
      return this.vars_.has(name);
    }

    /** Return a js object with mapping of variable name to value. */

  }, {
    key: "getVarContext",
    value: function getVarContext() {
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

    /** Update all variables with DOM elements. */

  }, {
    key: "sync",
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

var BaoStep = function () {
  function BaoStep(context) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    _classCallCheck(this, BaoStep);

    // Context
    this.context_ = context;

    // Step name
    this.name_ = name;

    // console.log
    this.print_ = undefined;

    // Init while entering, another step.
    this.init_ = null;

    // Next steps.
    this.nextSteps_ = new Map();

    this.condition_ = null;
    this.then_ = null;
    this.else_ = null;

    // Goto
    this.goto_ = null;

    // Setters of this step
    this.set_ = new Map();
  }

  /**
   * Register click handler for next steps.
   * @param {string} action 
   * @param {BaoStep} next 
   */


  _createClass(BaoStep, [{
    key: "registerButton",
    value: function registerButton(action, next) {
      $('[data-bao-action="' + action + '"]').prop('disabled', false);
      $('[data-bao-action="' + action + '"]').click([this.context_, next], function (e) {
        var context = e.data[0];
        context.sync();
        var next = e.data[1];
        next.run();
      });
    }

    /** Get step name. */

  }, {
    key: "getName",
    value: function getName() {
      return this.name_;
    }

    /**
     * Initialize step with JSON data.
     * @param {object} data 
     */

  }, {
    key: "parseJsonData",
    value: function parseJsonData(data) {
      if (data) {
        // Set step name.
        this.name_ = data['name'];
        // Set init step
        if (data['init']) {
          // Anonymous step
          this.init_ = new BaoStep(this.context_);
          this.init_.parseJsonData(data['init']);
        }
        // print, literal only
        if (data['print'] !== undefined) {
          this.print_ = data['print'];
        }
        if (data['decl']) {
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = data['decl'][Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var varName = _step3.value;

              // Vars decl
              this.context_.maybeDeclareVar(varName);
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        }
        // Set setlist
        for (var _varName in data['set']) {
          this.set_.set(_varName, data['set'][_varName]);
        }

        // At most one of next, goto and case.

        // Set goto
        if (data['goto']) {
          // goto must be a string
          this.goto_ = this.context_.getStep(data['goto']);
        }
        // Next, register buttons
        if (data['next']) {
          for (var action in data['next']) {
            var next = new BaoStep(this.context_);
            next.parseJsonData(data['next'][action]);
            this.nextSteps_.set(action, next);
          }
        }

        // if clause.
        if (data['if']) {
          this.condition_ = data['if']['condition'];
          this.then_ = new BaoStep(this.context_);
          this.then_.parseJsonData(data['if']['then']);
          if (data['if']['else']) {
            this.else_ = new BaoStep(this.context_);
            this.else_.parseJsonData(data['if']['else']);
          }
        }
      }
    }

    /** 
     * Run the setter step.
     * @private
     */

  }, {
    key: "setVars_",
    value: function setVars_() {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.set_[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _step4$value = _slicedToArray(_step4.value, 2),
              name = _step4$value[0],
              val = _step4$value[1];

          this.context_.setVar(name, val);
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }

    /** Run the step. */

  }, {
    key: "run",
    value: function run() {
      // Remove all registered click handlers first.
      $('[data-bao-action]').off('click').prop('disabled', true);

      if (this.name_) {
        console.log('Current step: ' + this.name_);
      }

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

      // Register click handler.
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.nextSteps_[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _step5$value = _slicedToArray(_step5.value, 2),
              action = _step5$value[0],
              next = _step5$value[1];

          this.registerButton(action, next);
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      if (this.condition_) {
        if (evalWithContext(this.context_.getVarContext(), this.condition_)) {
          return this.then_.run();
        }
        if (this.else_) {
          return this.else_.run();
        }
      }

      return this.goto_ && this.goto_.run();
    }
  }]);

  return BaoStep;
}();

var Bao = function () {
  function Bao() {
    _classCallCheck(this, Bao);

    this.context_ = new Context();
  }

  /** Initialize bao with JSON data. */


  _createClass(Bao, [{
    key: "parseString",
    value: function parseString(json) {
      var data = JSON.parse(json);
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = data[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var stepJson = _step6.value;

          this.context_.setStep(stepJson['name'], stepJson);
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }
    }

    /** Start bao flow. */

  }, {
    key: "run",
    value: function run() {
      var current = this.context_.getStep('#begin');
      current.run();
    }
  }]);

  return Bao;
}();

module.exports = Bao;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=bao.js.map