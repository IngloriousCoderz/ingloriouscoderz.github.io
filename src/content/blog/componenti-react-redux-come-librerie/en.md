---
title: React/Redux Components as Libraries
description: A few tricks to build a library with Redux, breaking the Single Source of Truth.
author: Matteo Antony Mistretta
date: 2016-11-16
topic: react
original: it
---

The ecosystem created by Facebook keeps releasing one gem after another: after [react](https://facebook.github.io/react/) and [redux](http://redux.js.org/), [create-react-app](https://github.com/facebookincubator/create-react-app) came out recently, taking you from zero to a working app with a single command. But what if we want to publish a React component to be used as a library in other projects? And what if the component's state is so complex that it calls for a state container like Redux? These are the questions I had to ask myself when I created [`react-property-grid`](https://github.com/IngloriousCoderz/react-property-grid).

Let's tackle them one at a time.

Can create-react-app be used to publish libraries instead of apps? Sort of. At the time of writing, `create-react-app` is meant for apps and [has no plans to handle libraries anytime soon](https://github.com/facebookincubator/create-react-app/issues/423#issuecomment-250752431).

However, `create-react-app` is so convenient that it's hard to give up, and luckily the scripts it includes are very well made and documented, so what I suggest is to:

1. create the project with `create-react-app`
2. "eject" it with `npm run eject`
3. modify `webpack.config.prod.dll` so that it produces a library

Unfortunately, being irreversible, `eject` prevents us from easily keeping up with future versions of `react-scripts`, but without better options for now the game is worth the candle.

The third step means producing a file similar to the one you can find [here](https://github.com/IngloriousCoderz/react-property-grid/blob/master/config/webpack.config.prod.js), in particular:

- `output` specifies an exact file name and a name for the library

```js
output: {
  path: paths.appBuild,
  filename: 'index.js',
  library: 'react-property-grid',
  libraryTarget: 'umd'
}
```

- `externals` declares all the dependencies we don't want to include in the bundle, but want to require as peer dependencies:

```js
externals: {
  'json-schema-deref-local': 'json-schema-deref-local',
  'jsonpath': 'jsonpath',
  'react': 'react',
  'react-dom': 'react-dom',
  'react-redux': 'react-redux',
  'react-sortable-hoc': 'react-sortable-hoc',
  'react-throttle': 'react-throttle',
  'redux': 'redux',
  'tv4': 'tv4',
  'uuid': 'uuid'
}
```

- just like the JavaScript part, any CSS gets an exact name too; the HTML part, on the other hand, is switched off:

```js
plugins: [
  // new HtmlWebpackPlugin({...}),
  ...,
  new ExtractTextPlugin('index.css')
]
```

- at this point, with no further changes, the project compiles to an `index.js` and an `index.css` in the `build` directory. If we want to change the destination directory, we can do it in `paths.js`:

```js
module.exports = {
  appBuild: resolveApp('dist'),//resolveApp('build'),
  ...
};
```

- finally, we change our `package.json` so that it behaves like a library:

```js
{
  "name": "react-property-grid",
  "version": "0.1.0",
  "main": "dist/index.js",
  "scripts": {
    "prepublish": "npm run build",
    ...
  },
  ...
}
```

The `prepublish` script runs a build right before publishing the project to npm, so we don't have to keep the `dist` directory in the repository. We can therefore add it to `.gitignore` (but be careful not to put it in `.npmignore`, or npm will only keep the sources and not the actual library).

And that was the easy part.

The hard part is deciding where to keep the component's state: since one of the cornerstones of redux is the [single source of truth](http://redux.js.org/docs/introduction/ThreePrinciples.html#single-source-of-truth), you'd be tempted to expose a reducer from the library, to be plugged into the host app's store. However, besides being very cumbersome, it brings no real benefit. Quite the opposite: the state of `react-property-grid` only matters to `react-property-grid`, and the app only cares about its final output.

The solution is a violation of the single source of truth principle: the root of the library component will have its own store. This behavior is also described on the redux website as [Isolating Redux Sub-Apps](http://redux.js.org/docs/recipes/IsolatingSubapps.html): in very specific circumstances (like ours) it's fine to have more than one store.

The trick is to instantiate the store in the component's constructor, so that there's exactly one per component instance. Let me add a piece:

```js
class SubApp extends Component {
  constructor(props) {
    super(props)
    this.store = createStore(reducer)

    this.store.subscribe(() => {
      const state = this.store.getState()
      props.onChange(state.data)
    })

    this.store.dispatch(init(props.data))
  }

  componentWillUpdate(nextProps) {
    this.store.dispatch(init(nextProps.data))
  }

  render() {
    return (
      <Provider store={this.store}>
        <App />
      </Provider>
    )
  }
}
```

As you can see, the state is initialized in the constructor through a dedicated action creator and updated on every new prop (of course you can limit updates with the usual `shouldComponentUpdate(nextProps)`). To communicate with the outside world, you can add a listener to the store that calls an `onChange` function defined elsewhere.

One last thing the article doesn't mention is the case where the parent app has a store too: to avoid conflicts, I suggest adding [`react-redux-custom-store`](https://github.com/emmenko/react-redux-custom-store), which lets you associate a unique name with each store in the system.

If you use [`redux-devtools-extension`](https://github.com/zalmoxisus/redux-devtools-extension), keep in mind that there are now two stores, which you can pick from the "Autoselect instances" dropdown in the top right corner. Unfortunately, at the moment it shows two instances with the same name instead of the custom name we defined:

![multiple stores in redux-devtools-extension](/images/blog/componenti-react-redux-come-librerie/store-instances.png)

Let's hope that one day Facebook will try to make life easier not only for app developers but also for library authors. In the meantime, all we can do is appreciate the huge effort they are already making, and maybe contribute by documenting best practices — or by creating a `create-react-lib` ourselves!

_— IceOnFire_
