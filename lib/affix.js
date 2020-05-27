module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 100);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages-my/affix/src/affix.vue?vue&type=template&id=34aca576&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        _vm.tag,
        _vm._b(
          {
            ref: "point",
            tag: "component",
            class: _vm.classes,
            style: _vm.styles
          },
          "component",
          _vm.tagAttrs,
          false
        ),
        [_vm._t("default")],
        2
      ),
      _c("div", {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.slot,
            expression: "slot"
          }
        ],
        style: _vm.slotStyle
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages-my/affix/src/affix.vue?vue&type=template&id=34aca576&

// EXTERNAL MODULE: external "element-ui/lib/utils/dom"
var dom_ = __webpack_require__(2);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages-my/affix/src/affix.vue?vue&type=script&lang=js&
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//


var prefixCls = 'el-affix';

function getScroll(target, top) {
  var prop = top ? 'pageYOffset' : 'pageXOffset';
  var method = top ? 'scrollTop' : 'scrollLeft';

  var ret = target[prop];

  if (typeof ret !== 'number') {
    ret = target[method];
  }

  return ret;
}

function getOffset(element, target) {
  var rect = element.getBoundingClientRect();

  var scrollTop = getScroll(target, true);
  var scrollLeft = getScroll(target);

  var docEl = target.document ? target.document.body : target;
  var clientTop = docEl.clientTop || 0;
  var clientLeft = docEl.clientLeft || 0;

  return {
    top: rect.top + scrollTop - clientTop,
    left: rect.left + scrollLeft - clientLeft
  };
}

/* harmony default export */ var affixvue_type_script_lang_js_ = ({
  name: 'ElAffix',
  props: {
    offsetTop: {
      type: Number,
      default: 0
    },
    offsetBottom: {
      type: Number
    },
    useCapture: {
      type: Boolean,
      default: false
    },
    target: {},
    tag: {
      type: String,
      default: 'div'
    },
    tagAttrs: {}
  },
  data: function data() {
    return {
      affix: false,
      styles: {},
      slot: false,
      slotStyle: {}
    };
  },

  computed: {
    offsetType: function offsetType() {
      var type = 'top';
      if (this.offsetBottom >= 0) {
        type = 'bottom';
      }

      return type;
    },
    classes: function classes() {
      var _ref;

      return [(_ref = {}, _ref['' + prefixCls] = this.affix, _ref)];
    }
  },
  watch: {
    target: function target(_target, oldTarget) {
      var _this = this;

      if (_target) {
        Object(dom_["on"])(_target, 'scroll', this.handleScroll, this.useCapture);
        Object(dom_["on"])(_target, 'resize', this.handleScroll, this.useCapture);
        this.$nextTick(function () {
          _this.handleScroll();
        });
      }
      if (oldTarget) {
        Object(dom_["off"])(oldTarget, 'scroll', this.handleScroll, this.useCapture);
        Object(dom_["off"])(oldTarget, 'resize', this.handleScroll, this.useCapture);
      }
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    var target = this.target;
    if (target) {
      Object(dom_["on"])(target, 'scroll', this.handleScroll, this.useCapture);
      Object(dom_["on"])(target, 'resize', this.handleScroll, this.useCapture);
      this.$nextTick(function () {
        _this2.handleScroll();
      });
    }
  },
  beforeDestroy: function beforeDestroy() {
    var target = this.target;
    if (target) {
      Object(dom_["off"])(target, 'scroll', this.handleScroll, this.useCapture);
      Object(dom_["off"])(target, 'resize', this.handleScroll, this.useCapture);
    }
  },

  methods: {
    update: function update() {
      if (this.affix) {
        var target = this.target || window;
        var elOffset = getOffset(this.$el, target);
        this.slotStyle = {
          width: this.$refs.point.clientWidth + 'px',
          height: this.$refs.point.clientHeight + 'px'
        };
        this.styles = _extends({}, this.styles, {
          left: elOffset.left + 'px',
          width: this.$el.offsetWidth + 'px'
        });
      }
    },
    handleScroll: function handleScroll() {
      var target = this.target || window;
      var affix = this.affix;
      var scrollTop = getScroll(target, true);
      var elOffset = getOffset(this.$el, target);
      var windowHeight = window.innerHeight;
      var elHeight = this.$el.getElementsByTagName('div')[0].offsetHeight;

      // Fixed Top
      if (elOffset.top - this.offsetTop < scrollTop && this.offsetType === 'top' && !affix) {
        this.affix = true;
        this.slotStyle = {
          width: this.$refs.point.clientWidth + 'px',
          height: this.$refs.point.clientHeight + 'px'
        };
        this.slot = true;
        this.styles = {
          top: this.offsetTop + 'px',
          left: elOffset.left + 'px',
          width: this.$el.offsetWidth + 'px'
        };

        this.$emit('change', true);
      } else if (elOffset.top - this.offsetTop > scrollTop && this.offsetType === 'top' && affix) {
        this.slot = false;
        this.slotStyle = {};
        this.affix = false;
        this.styles = null;

        this.$emit('change', false);
      }

      // Fixed Bottom
      if (elOffset.top + this.offsetBottom + elHeight > scrollTop + windowHeight && this.offsetType === 'bottom' && !affix) {
        this.affix = true;
        this.styles = {
          bottom: this.offsetBottom + 'px',
          left: elOffset.left + 'px',
          width: this.$el.offsetWidth + 'px'
        };

        this.$emit('change', true);
      } else if (elOffset.top + this.offsetBottom + elHeight < scrollTop + windowHeight && this.offsetType === 'bottom' && affix) {
        this.affix = false;
        this.styles = null;

        this.$emit('change', false);
      }
    }
  }
});
// CONCATENATED MODULE: ./packages-my/affix/src/affix.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_affixvue_type_script_lang_js_ = (affixvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages-my/affix/src/affix.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_affixvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages-my/affix/src/affix.vue"
/* harmony default export */ var affix = (component.exports);
// CONCATENATED MODULE: ./packages-my/affix/index.js


/* istanbul ignore next */
affix.install = function (Vue) {
  Vue.component(affix.name, affix);
};

/* harmony default export */ var packages_my_affix = __webpack_exports__["default"] = (affix);

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/utils/dom");

/***/ })

/******/ });