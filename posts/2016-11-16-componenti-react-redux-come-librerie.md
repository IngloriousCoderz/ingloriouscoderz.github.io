---
layout: post
title: Componenti react/redux come librerie
---
L'ecosistema creato da Facebook sta tirando fuori un gioiellino dopo l'altro: dopo [react](https://facebook.github.io/react/) e [redux](http://redux.js.org/) di recente è anche uscito [create-react-app](https://github.com/facebookincubator/create-react-app), che permette di arrivare da zero ad app funzionante in un unico comando.

Ma che succede se vogliamo pubblicare un componente React da usare come libreria per altri progetti? E se lo stato del componente fosse così complesso da richiedere un contenitore di stati come Redux? Queste sono le domande che mi sono dovuto porre quando ho creato [`react-property-grid`](https://github.com/IngloriousCoderz/react-property-grid).

Affrontiamo le domande una per volta.

Si può usare create-react-app per pubblicare librerie invece che app? Nì. Al momento in cui scrivo, `create-react-app` è pensato per le app e [non intende gestire la creazione di librerie nel breve tempo](https://github.com/facebookincubator/create-react-app/issues/423#issuecomment-250752431).

Tuttavia la comodità di `create-react-app` rende difficile rinunciarci e fortunatamente gli script che include sono molto ben fatti e documentati, perciò quello che consiglio è di:

1. creare il progetto con `create-react-app`
2. "espellerlo" con `npm run eject`
3. modificare il `webpack.config.prod.dll` in modo che produca una libreria

Purtroppo il processo di `eject`, essendo irreversibile, ci impedisce di rimanere facilmente al passo con versioni future dei `react-scripts`, ma in assenza di soluzioni migliori al momento il gioco vale la candela.

Il terzo punto consiste nel produrre un file simile a quello che si trova [qui](https://github.com/IngloriousCoderz/react-property-grid/blob/master/config/webpack.config.prod.js), in particolare:

- `output` specifica un nome di file ben preciso e un nome per la libreria

```js
output: {
  path: paths.appBuild,
  filename: 'index.js',
  library: 'react-property-grid',
  libraryTarget: 'umd'
}
```

- `externals` dichiara tutte le dipendenze che non vogliamo includere nel bundle, ma vogliamo richiamarle come peer dependencies:

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

- come fatto per la parte JavaScript, anche un eventuale CSS acquista un nome preciso; la parte HTML invece viene spenta:

```js
plugins: [
  // new HtmlWebpackPlugin({...}),
  ...,
  new ExtractTextPlugin('index.css')
]
```

- a questo punto senza altre modifiche il progetto viene compilato come un `index.js` e un `index.css` nella directory `build`. Se invece vogliamo modificare la directory di destinazione, possiamo farlo in `paths.js`:

```js
module.exports = {
  appBuild: resolveApp('dist'),//resolveApp('build'),
  ...
};
```

- infine modifichiamo il nostro `package.json` in modo che si comporti come una libreria:

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

Lo script `prepublish` fa un build appena prima di pubblicare il progetto su npm, pertanto fa in modo che non dobbiamo tenerci nel repository la directory `dist`. Possiamo quindi aggiungere questa directory nel `.gitignore` (ma stiamo attenti a non metterla nel `.npmignore`, altrimenti NPM si terrà solo i sorgenti e non la libreria vera e propria).

E questa era la parte facile.

La parte difficile è stabilire dove tenere lo stato del componente: dato che uno dei punti cardine di redux è la [singola sorgente di verità](http://redux.js.org/docs/introduction/ThreePrinciples.html#single-source-of-truth), verrebbe da tentare di esporre nella libreria un riduttore da agganciare allo store dell'app che la ospita. Tuttavia, oltre che essere un'operazione molto macchinosa, non porta alcun vero vantaggio. Anzi, Lo stato di `react-property-grid` interessa solo a `react-property-grid`, e l'app è solo interessata al suo output finale.

La soluzione è una violazione al principio di unica sorgente di verità: la root del componente di libreria avrà il suo store personale. Questo comportamento è descritto anche nel sito di redux come [Isolating Redux Sub-Apps](http://redux.js.org/docs/recipes/IsolatingSubapps.html): in circostanze molto specifiche (come la nostra) è concesso di disporre di più di uno store.

Il trucco consiste nell'istanziare lo store nel costruttore del componente, in modo che ce ne sia solo uno per ogni istanza del componente. Aggiungo un pezzo:

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

Come si può notare lo stato viene inizializzato nel costruttore grazie a un apposito actionCreator e viene aggiornato a ogni nuova proprietà (ovviamente si possono limitare gli aggiornamenti con il solito metodo `shouldComponentUpdate(nextProps)`). Per comunicare con l'esterno si può aggiungere allo store un listener che chiama una funzione onChange definita altrove.

Infine un'altra cosa che non viene citata nell'articolo è il caso in cui la parent app abbia anch'essa uno store: in questo caso per evitare conflitti suggerisco di aggiungere [`react-redux-custom-store`](https://github.com/emmenko/react-redux-custom-store), che permette di associare un nome univoco a ogni store del sistema.

Se si usa [`redux-devtools-extension`](https://github.com/zalmoxisus/redux-devtools-extension) bisogna tenere presente che ora gli store sono due, e si possono selezionare dal menù a tendina in alto a destra con la dicitura "Autoselect instances", che purtroppo al momento mostra due istanze con lo stesso nome anziché usare il nome custom che abbiamo definito:

![store multipli in redux-devtools-extension](/images/store-instances.png)

Speriamo che un giorno Facebook cerchi di rendere la vita più semplice non solo agli sviluppatori di app ma anche ai produttori di librerie. Nel frattempo non possiamo far altro che apprezzare l'enorme sforzo che già stanno facendo e magari contribuire, documentando best practice o creare noi stessi una `create-react-lib`!

```
# IceOnFire
```
