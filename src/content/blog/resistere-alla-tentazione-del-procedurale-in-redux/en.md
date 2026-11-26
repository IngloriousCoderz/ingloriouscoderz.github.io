---
title: Resisting the Procedural Temptation in Redux
description: Unlearning isn't easy, but it can — and must — be done.
author: Matteo Antony Mistretta
date: 2016-07-21
topic: react
original: it
---

Coming from a procedural and object-oriented background, a functional and declarative approach like [redux](http://redux.js.org/)'s requires quite a mental leap. Building applications is very easy, at least until you have to deal with countless side effects and asynchronous calls that trigger each other in a chain. That's where the procedural approach becomes the most tempting one. But we must be brave and look for the simplest, most elegant approach, not the most comfortable one.

A practical example: _Master-Detail_.

Suppose we have grid components that can display data fetched remotely with a query. This query is dynamic: it can change depending on variables coming from the outside.

Now suppose we have to show a first grid that doesn't depend on any variable. This grid must then auto-select its first row, which triggers the loading of a second grid whose data depends on the selected row (on the variables it produces, to be precise). The process can go on with another automatic selection of the first row of the second grid and the consequent loading of a third one, and so on. Of course, a row can also be selected by the user, which triggers a new chain reaction on the current grid and on all of its dependents.

The first solution I managed to come up with was giving all the power to the sagas of [redux-saga](http://yelouafi.github.io/redux-saga/) (but the thunks of [redux-thunk](https://github.com/gaearon/redux-thunk) would have done the same).

As soon as the store is created we can dispatch an initialization action for the first grid, the one that doesn't depend on any variable:

```js
store.dispatch(initGrid('FirstGrid'))
```

The saga handling the initialization action would look more or less like this:

```js
function* initGrid(action) {
  const {
    payload: { id, variables },
  } = action
  const query = computeNewQuery(id, variables)

  try {
    const data = yield call(fetchData, id, query)
    yield put(receiveData(id, data))
    yield put(selectRow(id, 0))
  } catch ({ message }) {
    yield put(receiveError(id, message))
  }
}
```

The new query is computed on the fly (I left out the details for clarity) and used to fetch the new data for the grid by directly calling another saga named `fetchData`. Once the data arrives, the current grid is updated and its first row is selected, and the selection is an action dispatched to yet another saga:

```js
function* selectRow(action) {
  const {
    payload: { id, selectedRow },
  } = action
  const newVars = computeNewVariables(id, selectedRow)

  yield put(updateSelectedRow(id, selectedRow))
  yield grids.map(grid => {
    if (grid.dependsOn(updatedVariables)) {
      return fork(initGrid, {
        payload: { id, variables: newVars },
      })
    }
  })
}
```

This approach works, and it even looks quite clean. Sagas in this implementation can be seen as external agents (maybe something similar to [actors](http://jamesknelson.com/join-the-dark-side-of-the-flux-responding-to-actions-with-actors/)?) or, more picturesquely, as planes flying low over the application and dropping actions to update the store.

There are, however, some more or less obvious code smells:

1. Reducers have no logic: they are only asked to fill themselves with data fetched or computed by the sagas
2. Sagas, on the other hand, hide lots and lots of procedural logic, including the choice of which grids must be updated or even which grid should be initialized first, and unit testing them is not that trivial (surely easier than with thunks, so if this is the road you choose, at least choose the lesser evil)
3. There is a cyclic dependency between the two sagas, because when I initialize a grid I have to select its first row, and when I select the first row I have to initialize the dependent grids
4. The `selectRow` saga calls the `initGrid` saga with a fake action: that's because, by contract, sagas must accept an action if they want to be used in a [takeEvery](http://yelouafi.github.io/redux-saga/docs/advanced/Concurrency.html)

It all stems from the assumption that grids should be rather dumb, displaying data fetched elsewhere (by the sagas) instead of running the queries themselves. But after watching Dan Abramov's [video tutorials](https://egghead.io/courses/getting-started-with-redux) under the microscope over and over, especially the [second series](https://egghead.io/courses/building-react-applications-with-idiomatic-redux), as well as the GitHub discussions on [how to structure a Redux application](https://github.com/reactjs/redux/issues/1171) and [how to change the state of interdependent reducers](https://github.com/reactjs/redux/issues/749), I became convinced that another solution is possible, and a more effective one too.

In a nutshell, the solution is the following.

The computed query is an integral part of the grids' state (although it could also be implemented as a [memoized selector](https://github.com/reactjs/reselect)):

```js
function query = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case UPDATE_LIVE_QUERY:
      return computeNewQuery(payload)
    default:
      return state
  }
}
```

Just like in the video tutorials, grids are split into [presentational and container components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.jqqae1xb5), and containers can call the `fetchData` saga on their own in their `componentDidMount` and `componentDidUpdate` methods:

```js
class GridContainer extends Component {
  fetchData() {
    const { id, canFetchData, requestData } = this.props

    if (canFetchData) {
      requestData(id)
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    if (this.props.liveQuery !== prevProps.liveQuery) {
      this.fetchData()
    }
  }

  render() {
    const { id, canFetchData, requestData, ...rest } = this.props
    return <Grid id={id} {...rest} />
  }
}

connect(
  mapStateToProps,
  { requestData, selectRow },
)(GridContainer)
```

As you can see, in `componentDidUpdate` the call to `fetchData` must happen only if the query has changed. This means the reducer must be careful not to return a copy of the query, but the query itself, whenever a dispatched action didn't change it. A library like [Immutable](https://facebook.github.io/immutable-js/) could be very helpful here.

Also, `fetchData` receives a property called `canFetchData`: this is nothing more than a selector that checks whether the current query has all the information it needs to run (that is, it doesn't depend on any variable, or all the variables it depends on are there). This approach, which I like to call _watertight-compartment reasoning_, is simply the foundation of modular programming.

The hard part is in the `rootReducer`: when a row is selected, it has to compute the new variables, update them in their slice of state, and then use them to update the query of the grids (_ALL_ the variables and _ALL_ the grids: that's what makes it more declarative and fail-safe). Why implement this logic in the root? Because it's the [Information Expert](<https://en.wikipedia.org/wiki/GRASP_(object-oriented_design#Information_expert)>) of the situation:

```js
const rootReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case '@@INIT':
      return {
        ...state,
        viewers: viewers(state.grids, computeNewQuery(state.variables)),
      }
    case SELECT_ROW:
      const newVars = computeNewVariables(payload.id, payload.row)
      let newState = {
        ...state,
        grids: grids(state.grids, action),
        variables: variables(state.variables, updateVariables(newVars)),
      }
      return {
        ...newState,
        grids: grids(newState.grids, updateQuery(newState.variables)),
      }
    default:
      return state
  }
}
```

A few things to notice here:

1. We are using Redux's initialization action to start "waking up" the grids; maybe not very orthodox, we could have dispatched our own action as we did with the sagas
2. Selecting a row means calling the underlying reducers one after the other. This is the only slightly procedural bit, because we can't do everything in one go: we have to wait for the state to have all the variables in place before using them on the grids
3. Reducers are called with dedicated sub-actions, `updateVariables` and `updateQuery`, which will never show up in the [Redux-DevTools](https://github.com/gaearon/redux-devtools) log. What once looked like blasphemy to me now seems the most natural thing in the world, since it's basically what I would write if I had to call a [façade](https://en.wikipedia.org/wiki/Facade_pattern) that in turn calls some sub-components. The one thing you must never do is make two reducers depend on each other, but a parent reducer can and should manipulate the state of its child reducers.

At this point we can get rid of the `initGrid` saga entirely: initialization starts from the grids themselves, which update automatically whenever their query changes. We moved the side-effect logic into a React component and the application logic into the reducers. The saga middleware only has to listen for `fetchData` requests.

For doubts, questions, objections or outrage, don't hesitate to contact me. Maybe one day I'll even implement comments; in the meantime, insult me in private :)

_— IceOnFire_
