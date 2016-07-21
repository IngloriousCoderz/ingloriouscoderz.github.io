---
layout: post
title: Resistere alla tentazione del procedurale in Redux
---
Proveniendo da un contesto procedurale e orientato agli oggetti, un approccio
funzionale e dichiarativo come quello di [redux](http://redux.js.org/) richiede un salto mentale non indifferente. Realizzare applicazioni è molto semplice, almeno finché non si devono gestire un'infinità di effetti collaterali e chiamate asincrone che si innescano a catena. È lì che l'approccio più intrigante risulta quello procedurale. Tuttavia dobbiamo essere coraggiosi e cercare l'approccio più semplice ed elegante, non quello più comodo.

Esempio pratico: *Master-Detail*.

Supponiamo di avere dei componenti griglia che sanno mostrare dati recuperati da remoto con una query. Questa query è dinamica, può cambiare a seconda di variabili che le arrivano dall'esterno.

Supponiamo ora di dover mostrare una prima griglia che non dipende da alcuna variabile. Questa griglia deve poi auto-selezionarsi la prima riga, e questo comporta il caricamento di una seconda griglia i cui dati dipendono dalla riga selezionata (dalle variabili da essa prodotte, per la precisione). Il procedimento può andare avanti con un'ulteriore selezione automatica della prima riga nella seconda griglia e conseguente caricamento di una terza, e così via. La selezione di una riga può ovviamente essere effettuata anche da parte dell'utente, che innescherà un nuovo effetto a catena sulla griglia corrente e su tutte quelle dipendenti.

La prima soluzione che sono riuscito a ottenere è trasferendo tutto il potere alle saghe di [redux-saga](http://yelouafi.github.io/redux-saga/) (ma i thunk di [redux-thunk](https://github.com/gaearon/redux-thunk) avrebbero sortito lo stesso effetto).

Appena lo store è creato possiamo dispatchare una action di inizializzazione per la prima griglia, quella che non dipende da nessuna variabile:

```js
store.dispatch(initGrid('FirstGrid'))
```

La saga che accoglierà la action di inizializzazione sarà pressappoco questa:

```js
function* initGrid(action) {
  const { payload: { id, variables } } = action
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

La nuova query viene calcolata al volo (ho omesso i dettagli per chiarezza) e viene usata per recuperare i nuovi dati da passare alla griglia chiamando direttamente un'altra saga chiamata `fetchData`. Una volta ottenuti i dati viene aggiornata la griglia corrente e viene selezionata la prima riga, e la selezione è il dispatch di una action a un'altra saga:

```js
function* selectRow(action) {
  const { payload: { id, selectedRow } } = action
  const updatedVariables = computeNewVariables(id, selectedRow)

  yield put(updateSelectedRow(id, selectedRow))
  yield grids.map(grid => {
    if (grid.dependsOn(updatedVariables)) {
      return fork(initGrid, {
        payload: { id, variables: updatedVariables }
      })
    }
  })
}
```

Questo approccio funziona, e pare anche abbastanza pulito. Le saghe in questa implementazione possono essere viste come degli agenti esterni (forse qualcosa di simile agli [attori](http://jamesknelson.com/join-the-dark-side-of-the-flux-responding-to-actions-with-actors/)?) oppure, in modo più pittoresco, come aerei che volano a bassa quota sull'applicazione sganciando action per aggiornare lo store.

Ci sono però alcuni code smell più o meno evidenti:
1. I riduttori non hanno logica, vengono interpellati solo per popolarsi con dati recuperati o calcolati dalle saghe
2. Nelle saghe invece è nascosta tanta, tanta logica procedurale, compresa la scelta di quali griglie devono essere aggiornate o addirittura quale griglia inizializzare per prima, e scriverci sopra degli unit test non è così banale (sicuramente più semplice che farlo con i thunk, per cui se la strada scelta è questa almeno scegliete il male minore)
3. C'è una dipendenza ciclica fra le due saghe, perché quando inizializzo una griglia devo selezionare la prima riga e quando seleziono la prima riga devo inizializzare le griglie dipendenti
4. Nella saga di `selectRow` viene chiamata la saga `initGrid` sfruttando una finta action: questo perché le saghe per contratto devono accettare una action se vogliono essere usate in un [takeEvery](http://yelouafi.github.io/redux-saga/docs/advanced/Concurrency.html)

Il tutto nasce dal presupposto che le griglie debbano essere piuttosto stupide, e sappiano visualizzare i dati recuperati altrove (dalle saghe) piuttosto che effettuare loro stesse le query. Ma riguardando più volte al microscopio i [video tutorial](https://egghead.io/courses/getting-started-with-redux) di Dan Abramov, in particolare il [secondo](https://egghead.io/courses/building-react-applications-with-idiomatic-redux), nonché le discussioni su Github relative a [come strutturare un'applicazione Redux](https://github.com/reactjs/redux/issues/1171) e a [come modificare lo stato di riduttori interdipendenti](https://github.com/reactjs/redux/issues/749), mi sono convinto che un'altra soluzione sia possibile, e anche più efficace.

La soluzione in parole povere è la seguente:

La query calcolata è parte integrante dello stato delle griglie (ma forse potrebbe anche essere implementata come un [selettore memoizzato](https://github.com/reactjs/reselect)):

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

Le griglie, esattamente come nei video tutorial, sono suddivise in [componenti presentazionali e componenti contenitori](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.jqqae1xb5), e i contenitori sono in grado di chiamare la saga `fetchData` per conto loro nei metodi `componentDidMount` e `componentDidUpdate`:

```js
class GridContainer extends Component {
  fetchData() {
    const {id, canFetchData, requestData} = this.props

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
    const { id, canFetchData, requestData, ...rest} = this.props
    return <Grid id={id} {...rest}/>
  }
}

connect(mapStateToProps, {requestData, selectRow})(GridContainer)
```

Come si può notare, nel metodo `componentDidUpdate` la chiamata a `fetchData` deve essere fatta solo se la query è cambiata rispetto a prima. Questo significa che bisogna prestare particolare attenzione nel riduttore a non fornire una copia della query ma la query stessa se il dispatch di una action non l'ha cambiata. A questo scopo potrebbe essere molto utile una libreria come [Immutable](https://facebook.github.io/immutable-js/).

Inoltre nel metodo `fetchData` viene passata una proprietà chiamata `canFetchData`: questa non è altro che un selettore che verifica che la query corrente abbia tutte le informazioni necessarie per essere eseguita (cioè non dipenda da alcuna variabile o le variabili da cui dipende ci siano tutte). Questo approccio, che mi piace chiamare *ragionare a compartimenti stagni*, è semplicemente la base di una programmazione modulare.

Il pezzo difficile è nel `rootReducer`: quando viene selezionata una riga, questo deve calcolare le nuove variabili, aggiornarle nella porzione di stato dedicata, e poi usare le variabili per aggiornare la query alle griglie (*TUTTE* le variabili e *TUTTE* le griglie, è questo che lo rende più dichiarativo e fail-safe). Perché implementare questa logica proprio nella root? Perché è l'[Information Expert](https://en.wikipedia.org/wiki/GRASP_(object-oriented_design)#Information_expert) della situazione:

```js
const rootReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case '@@INIT':
      return {
        ...state,
        viewers: viewers(state.grids, computeNewQuery(state.variables))
      }
    case SELECT_ROW:
      const newVars = computeNewVariables(payload.id, payload.row)
      let newState = {
        ...state,
        grids: grids(state.grids, action),
        variables: variables(state.variables, updateVariables(newVars))
      }
      return {
        ...newState,
        grids: grids(newState.grids, updateQuery(newState.variables))
      }
    default:
      return state
  }
}
```

Alcune cose da notare qui:
1. Stiamo usando la action di inizializzazione di Redux per cominciare a "svegliare" le griglie; forse non è molto ortodosso, avremmo potuto dispatchare una nostra action come fatto per le saghe
2. La selezione della riga consiste nella chiamata consecutiva ai reducer sottostanti. Questo è l'unico aspetto un po' procedurale, perché non possiamo fare tutto in un colpo solo ma dobbiamo aspettare prima che lo stato abbia tutte le variabili in posizione per poterle usare sulle griglie
3. I riduttori vengono chiamati con delle sotto-action dedicate, `updateVariables` e `updateQuery`, che non compariranno mai nel log di [Redux-DevTools](https://github.com/gaearon/redux-devtools). Quello che prima mi sembrava una bestemmia ora mi sembra la cosa più naturale del mondo dato che in fondo è la stessa cosa che scriverei se dovessi chiamare una [façade](https://it.wikipedia.org/wiki/Fa%C3%A7ade_pattern) che chiama a sua volta dei sotto-componenti. L'unica cosa da non fare assolutamente è rendere due reducer interdipendenti, ma un reducer padre può e deve manipolare lo stato dei reducer figli.

A questo punto possiamo completamente fare a meno della saga `initGrid`: l'inizializzazione parte dalle stesse griglie, che si aggiorneranno automaticamente nel momento in cui la query dovesse cambiare. Abbiamo spostato la logica degli effetti collaterali dentro un componente React e la logica applicativa dentro ai riduttori. Il middleware delle saghe deve solo rimanere in ascolto di richieste di `fetchData` e di `selectRow`.

Per dubbi, domande, obiezioni o sdegno non esitate a contattarmi. Un giorno magari implementerò anche un meccanismo di commenti, nel frattempo insultatemi in privato :)

```
# IceOnFire
```
