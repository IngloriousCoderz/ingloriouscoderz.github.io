---
title: Migliorare il codice con il currying
description: La programmazione funzionale sta tornando in auge, e ha i suoi buoni motivi.
author: Giosk
---

Oggi mi sono trovato davanti a un problema a prima vista molto semplice da realizzare, ma il cui risultato si è rivelato orribile e per niente ottimale.
Il problema si descrive molto facilmente in linguaggio naturale "calcolare la differenza tra due liste A e B".
Facile no? A prima vista sì, ma scendendo nel tecnico si è rivelato un po' più ostico del previsto, perché le mie due liste erano composte da oggetti, ognuno con più di un parametro e una chiave generata in modo randomico, quindi il problema andrebbe riformulato come "calcolare la differenza tra due liste di oggetti A e B basandosi su uno dei suoi parametri".

Parlando in JavaScript:

```js
let nodesA = [
  { a: '1', b: '1' },
  { a: '2', b: '2' },
  { a: '3', b: '3' },
  { a: '4', b: '4' },
  { a: '5', b: '5' },
]
let nodesB = [
  { a: '1', b: '6' },
  { a: '2', b: '7' },
  { a: '3', b: '8' },
  { a: '6', b: '9' },
  { a: '7', b: '10' },
  { a: '8', b: '11' },
]
```

Come fare dunque a ottenere come risultato nodesA / nodesB, basandosi sul parametro a?

Questa è la prima versione a cui ho pensato:

```js
let result = []
nodesB.forEach(nb => {
  let supportArr = []
  nodesA.forEach(na => {
    supportArr.push(na.a)
  })
  const notInNodesA = supportArr.indexOf(nb.a) === -1
  if (notInNodesA) {
    result.push(nb)
  }
})
```

È davvero brutta lo so, è quadratica quindi non ottimale ed è anche un po' scomoda da utilizzare, quindi ho dovuto per forza RIFATTORIZZARE.
Inizialmente mi sono messo in testa di usare il filter e la map, ma non riuscivo a incastrare le cose come volevo (ottenevo o troppi dati o quelli che non mi interessavano) e nella mia ricerca mi sono imbattuto nel concetto di [currying](https://en.wikipedia.org/wiki/Currying) visto all'università, ma mai utilizzato in pratica.
La definizione più semplice e immediata l'ho trovata su [StackOverflow](https://stackoverflow.com/questions/36314/what-is-currying) e poi con l'aiuto di un bel post trovato [qua](https://medium.com/@kbrainwave/currying-in-javascript-ce6da2d324fe) sono riuscito dopo un po' di tentativi ed errori a giungere a questo risultato.

Ho definito la funzione `nodeCompare` in questo modo:

```js
const nodeCompare = otherArray => {
  return current => {
    return (
      otherArray.filter(other => {
        return other.a === current.a
      }).length === 0
    )
  }
}
```

e poi l'ho utilizzata così:

```js
const difference = nodesB.filter(nodeCompare(nodesA))
```

Ho quindi applicato all'array `nodesB` un filtro che riceve come callback `nodeCompare`.
La funzione nodeCompare riceve come parametro l'array `nodesA` che restituisce a sua volta il risultato di un filtro applicato sul `nodesB`, e se il risultato è vuoto o pieno mi restituirà `true` o `false` permettendo al primo filter lanciato di decidere se il valore è di mio interesse oppure no.
Un salto di qualità notevole dopo la prima versione!

Spero con questo piccolo post di aver aiutato qualcuno o anche semplicemente spronato al REFACTORING, cosa che noi Inglorious Coders diciamo di fare sempre!

    # Giosk
