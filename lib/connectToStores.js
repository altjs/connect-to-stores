'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

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
    return target[key] = value;
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

    var StoreConnection = (0, _createReactClass2['default'])({
      getInitialState: function getInitialState() {
        return Spec.getPropsFromStores(this.props, this.context);
      },

      componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState(Spec.getPropsFromStores(nextProps, this.context));
      },

      componentDidMount: function componentDidMount() {
        var _this = this;

        var stores = Spec.getStores(this.props, this.context);
        this.storeListeners = stores.map(function (store) {
          return store.listen(_this.onChange);
        });
        if (Spec.componentDidConnect) {
          Spec.componentDidConnect(this.props, this.context);
        }
      },

      componentWillUnmount: function componentWillUnmount() {
        this.storeListeners.forEach(function (unlisten) {
          return unlisten();
        });
      },

      onChange: function onChange() {
        this.setState(Spec.getPropsFromStores(this.props, this.context));
      },

      render: function render() {
        return _react2['default'].createElement(Component, assign({}, this.props, this.state));
      }
    });

    return StoreConnection;
  })();
}

exports['default'] = connectToStores;
module.exports = exports['default'];