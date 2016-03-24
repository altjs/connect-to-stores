import React from 'react'

// @todo Where to get these from?
const isFunction = x => typeof x === 'function'
const eachObject = (f, o) => {
  o.forEach((from) => {
    Object.keys(Object(from)).forEach((key) => {
      f(key, from[key])
    })
  })
}
const assign = (target, ...source) => {
  eachObject((key, value) => {
    target[key] = value
  }, source)
  return target
}

function connectToStores(Spec, Component = Spec) {
  // Check for required static methods.
  if (!isFunction(Spec.getStores)) {
    throw new Error('connectToStores() expects the wrapped component to have a static getStores() method')
  }
  if (!isFunction(Spec.getPropsFromStores)) {
    throw new Error('connectToStores() expects the wrapped component to have a static getPropsFromStores() method')
  }

  const StoreConnection = React.createClass({

    getInitialState() {
      return Spec.getPropsFromStores(this.props, this.context)
    },

    componentWillReceiveProps(nextProps) {
      this.setState(Spec.getPropsFromStores(nextProps, this.context))
    },

    componentDidMount() {
      const stores = Spec.getStores(this.props, this.context)
      this.storeListeners = stores.map((store) => {
        return store.listen(this.onChange)
      })
      if (Spec.componentDidConnect) {
        Spec.componentDidConnect(this.props, this.context)
      }
    },

    componentWillUnmount() {
      this.storeListeners.forEach(unlisten => unlisten())
    },

    onChange() {
      this.setState(Spec.getPropsFromStores(this.props, this.context))
    },

    render() {
      return React.createElement(
        Component,
        assign({}, this.props, this.state)
      )
    }
  })

  // copy static methods of component
  Object.getOwnPropertyNames(Spec).forEach(function (prop) {
    if (prop === 'getPropsFromStores' || prop === 'getStores') return
    if (typeof Spec[prop] === 'function' && !StoreConnection[prop]) {
      StoreConnection[prop] = Spec[prop]
    }
  })

  return StoreConnection
}

export default connectToStores
