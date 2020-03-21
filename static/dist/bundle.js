(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Dummy = /*#__PURE__*/function () {
  function Dummy() {
    _classCallCheck(this, Dummy);
  }

  _createClass(Dummy, [{
    key: "init",
    value: function init() {
      console.log("Loaded!");
    }
  }]);

  return Dummy;
}();

exports.default = Dummy;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Navigation class
 */
var NavigationController = /*#__PURE__*/function () {
  /**
   *
   * @param options
   */
  function NavigationController(options) {
    _classCallCheck(this, NavigationController);

    /**
     *
     * @type {{navigationSlideUp: string, navigation: string, activeClass: string, navigationScrolled: string, navigationFixed: string}}
     * @private
     */
    var _defaults = {
      //
      activeClass: "is-active",
      //NAVIGATION
      navigation: ".js-navigation-wrapper",
      //CSS state classes
      navigationScrolled: "has-scrolled",
      navigationFixed: "is-fixed",
      navigationSlideUp: "slide-up"
    }; //navigation controller config

    /**
     *
     * @type {boolean}
     */

    this.scrolling = false;
    /**
     *
     * @type {number}
     */

    this.scrollNavigationOffset = 20; //main navigation scroll offset

    /**
     *
     * @type {number}
     */

    this.previousTop = 0;
    /**
     *
     * @type {number}
     */

    this.currentTop = 0;
    /**
     *
     * @type {number}
     */

    this.scrollDelta = 0;
    /**
     *
     * @type {number}
     */

    this.scrollOffset = 0;
    /**
     *
     * @type {{} & {navigationSlideUp: string, navigation: string, activeClass: string, navigationScrolled: string, navigationHidden: string, navigationSlideDown: string, navigationFixed: string, } & Object}
     */

    this.defaults = Object.assign({}, _defaults, options);
  } //region getters

  /**
   *
   * @returns {Element}
   */


  _createClass(NavigationController, [{
    key: "init",
    //endregion
    //region methods

    /**
     *
     */
    value: function init() {
      console.log("Navigation init()");

      if (this.navigation) {
        this.navigationController();
      }
    } //NAVIGATION

    /**
     *
     */

  }, {
    key: "navigationController",
    value: function navigationController() {
      var _this = this;

      document.addEventListener("scroll", function () {
        if (!_this.scrolling) {
          _this.scrolling = true;

          if (!window.requestAnimationFrame) {
            setTimeout(_this.checkScroll(), 250);
          } else {
            requestAnimationFrame(function () {
              return _this.checkScroll();
            });
          }
        }
      });
    }
    /**
     *
     */

  }, {
    key: "checkScroll",
    value: function checkScroll() {
      /**
       *
       * @type {number}
       */
      var currentTop = window.pageYOffset | document.body.scrollTop;
      this.activateNavigation(currentTop);
      this.previousTop = currentTop;
      this.scrolling = false;
    }
    /**
     *
     * @param currentTop
     */

  }, {
    key: "activateNavigation",
    value: function activateNavigation(currentTop) {
      if (currentTop > this.scrollNavigationOffset) {
        this.navigation.classList.add(this.defaults.navigationScrolled);
      } else {
        this.navigation.classList.remove(this.defaults.navigationScrolled);
      }
      /**
       *
       * @type {number}
       */


      var navOffsetTop = window.innerHeight / 4;

      if (this.previousTop >= currentTop) {
        //SCROLLING UP
        if (currentTop < navOffsetTop) {
          //secondary nav is not fixed
          this.navigation.classList.remove(this.defaults.navigationSlideUp);
        } else if (this.previousTop - currentTop > this.scrollDelta) {
          //secondary nav is fixed
          this.navigation.classList.remove(this.defaults.navigationSlideUp);
        }
      } else {
        //SCROLLING DOWN
        if (currentTop > navOffsetTop + this.scrollOffset) {
          //hide primary nav
          this.navigation.classList.add(this.defaults.navigationSlideUp);
        } else if (currentTop > navOffsetTop) {
          //once the secondary nav is fixed, do not hide primary nav if you haven't scrolled more than scrollOffset
          this.navigation.classList.remove(this.defaults.navigationSlideUp);
        }
      }
    } //endregion

  }, {
    key: "navigation",
    get: function get() {
      return document.querySelector(this.defaults.navigation);
    }
  }]);

  return NavigationController;
}();

exports.default = NavigationController;

},{}],3:[function(require,module,exports){
"use strict";

var _NavigationController = _interopRequireDefault(require("./components/NavigationController"));

var _Dummy = _interopRequireDefault(require("./components/Dummy"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ready(callbackFunc) {
  if (document.readyState !== "loading") {
    /**
     * Document is already ready, call the callback directly
     */
    callbackFunc();
  } else if (document.addEventListener) {
    /**
     * All modern browsers to register DOMContentLoaded
     */
    document.addEventListener("DOMContentLoaded", callbackFunc);
  } else {
    /**
     * Old IE browsers
     */
    document.attachEvent("onreadystatechange", function () {
      if (document.readyState === "complete") {
        callbackFunc();
      }
    });
  }
}
/**
 * Document ready callback
 */


ready(function () {
  var dummy = new _Dummy.default();
  dummy.init();
  var navigation = new _NavigationController.default();
  navigation.init();
});

},{"./components/Dummy":1,"./components/NavigationController":2}]},{},[3]);

//# sourceMappingURL=bundle.js.map
