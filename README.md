# connectToStores (for alt)

'Higher Order Component' for alt flux that controls the props of a wrapped
component via stores.

**Alt** is an Isomorphic flux implementation.

Check out the [API Reference](http://alt.js.org/docs/) for full in-depth alt docs. For a high-level walk-through on flux, take a look at the [Getting Started](http://alt.js.org/guide/) guide.

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/goatslacker/alt?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![NPM version](https://badge.fury.io/js/alt.svg)](http://badge.fury.io/js/alt)
[![Build Status](https://secure.travis-ci.org/goatslacker/alt.svg?branch=master)](http://travis-ci.org/goatslacker/alt)
[![Coverage Status](https://img.shields.io/coveralls/goatslacker/alt.svg?style=flat)](https://coveralls.io/r/goatslacker/alt)
[![Dependency Status](https://david-dm.org/goatslacker/alt.svg)](https://david-dm.org/goatslacker/alt)
[![Download Count](https://img.shields.io/npm/dm/alt.svg?style=flat)](https://www.npmjs.com/package/alt)
[![JS.ORG](https://img.shields.io/badge/js.org-alt-ffb400.svg?style=flat-square)](http://js.org)

## How to use

Expects the Component to have two static methods:
 - getStores(): Should return an array of stores.
 - getPropsFromStores(props): Should return the props from the stores.

**Using old React.createClass() style:**

```js
const MyComponent = React.createClass({
  statics: {
    getStores(props) {
      return [myStore]
    },
    getPropsFromStores(props) {
      return myStore.getState()
    }
  },
  render() {
    // Use this.props like normal ...
  }
})
MyComponent = connectToStores(MyComponent)
```

**Using ES6 Class:**

```js
class MyComponent extends React.Component {
  static getStores(props) {
    return [myStore]
  }
  static getPropsFromStores(props) {
    return myStore.getState()
  }
  render() {
    // Use this.props like normal ...
  }
}
MyComponent = connectToStores(MyComponent)
```

**Using ES7 Decorators (proposal, stage 0):**

```js
@connectToStores
class MyComponent extends React.Component {
  static getStores(props) {
    return [myStore]
  }
  static getPropsFromStores(props) {
    return myStore.getState()
  }
  render() {
    // Use this.props like normal ...
  }
}
```

A great explanation of the merits of higher order components can be found at
http://bit.ly/1abPkrP

## Use as a component wrapper

[Hot-to here]

## License

[![MIT](https://img.shields.io/npm/l/alt.svg?style=flat)](http://josh.mit-license.org)
