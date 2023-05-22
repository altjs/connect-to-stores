'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

// @todo Where to get these from?
var isFunction = function isFunction(x) {
  return typeof x === 'function';
};
var eachObject = function eachObject(f, o) {
  o.forEach(function (from) {
    Object.keys(Object(from)).forEach(function (key) {
      f(key, from[key]);
    });
  });
};
var assign = function assign(target) {
  for (var _len = arguments.length, source = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    source[_key - 1] = arguments[_key];
  }

  eachObject(function (key, value) {
    target[key] = value;
  }, source);
  return target;
};

function connectToStores(Spec) {
  var Component = arguments[1] === undefined ? Spec : arguments[1];
  return (function () {
    // Check for required static methods.
    if (!isFunction(Spec.getStores)) {
      throw new Error('connectToStores() expects the wrapped component to have a static getStores() method');
    }
    if (!isFunction(Spec.getPropsFromStores)) {
      throw new Error('connectToStores() expects the wrapped component to have a static getPropsFromStores() method');
    }

    var StoreConnection = (function (_React$Component) {
      function StoreConnection(props, context) {
        _classCallCheck(this, StoreConnection);

        _get(Object.getPrototypeOf(StoreConnection.prototype), 'constructor', this).call(this, props);
        this.state = Spec.getPropsFromStores(props, context);
        this.onChange = this.onChange.bind(this);
      }

      _inherits(StoreConnection, _React$Component);

      _createClass(StoreConnection, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
          this.setState(Spec.getPropsFromStores(nextProps, this.context));
        }
      }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
          var _this = this;

          var stores = Spec.getStores(this.props, this.context);
          this.storeListeners = stores.map(function (store) {
            return store.listen(_this.onChange);
          });
          if (Spec.componentDidConnect) {
            Spec.componentDidConnect(this.props, this.context);
          }
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.storeListeners.forEach(function (unlisten) {
            return unlisten();
          });
        }
      }, {
        key: 'onChange',
        value: function onChange() {
          this.setState(Spec.getPropsFromStores(this.props, this.context));
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2['default'].createElement(Component, assign({}, this.props, this.state));
        }
      }]);

      return StoreConnection;
    })(_react2['default'].Component);

    return StoreConnection;
  })();
}

exports['default'] = connectToStores;
module.exports = exports['default'];