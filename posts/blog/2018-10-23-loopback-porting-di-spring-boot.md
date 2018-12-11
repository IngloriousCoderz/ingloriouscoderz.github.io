---
title: Loopback 4 è un porting di Spring Boot
description: IBM ha rovinato un bellissimo prodotto, è ora di cercare altrove.
author: IceOnFire
---

Se c'è una cosa buona che il [faticoso ecosistema JavaScript](https://medium.com/@ericclemmons/javascript-fatigue-48d4011b6fc4) ha portato nelle nostre vite è un ritorno alla [programmazione funzionale](https://codeburst.io/functional-programming-in-javascript-e57e7e28c0e5). Dopo anni e anni a scervellarsi su oggetti, classi e design pattern, Facebook con i suoi [React](https://reactjs.org/) e [Redux](https://redux.js.org/) ci ha convinti a fare marcia indietro e riconsiderare le funzioni pure, l'immutabilità e la composizione a scapito dell'ereditarietà, delle annotation e della dependency injection. A un tratto il codice diventa potente, performante, leggibile e testabile come non lo è mai stato, e la programmazione orientata agli oggetti (o meglio, alle classi) pare solo un brutto ricordo.

Questo almeno per quanto riguarda il front end. E sul back end? Personalmente per progetti un po' più complessi la mia scelta è ricaduta su [Loopback 3](https://loopback.io/), framework di [Strongloop](https://strongloop.com/) (poi acquisita da [IBM](https://www.ibm.com/)) che, essendo fortemente basato su [Express](https://expressjs.com/), riesce a rendere la creazione di un server Node immediata e la sua personalizzazione perlomeno fattibile. Basta definire un modello in un linguaggio che sostanzialmente è un'estensione di [JSON Schema](https://json-schema.org/) e si ha automaticamente un servizio REST che fa tutte le operazioni CRUD sul database. Se poi si vogliono definire funzioni custom si possono creare degli hook a vari livelli dell'architettura, oppure dei middleware in stile Express.

Non vedevo l'ora, quindi, di mettere le mani sulla [versione 4 di Loopback](http://v4.loopback.io/), uscita ufficialmente il [10 ottobre 2018](https://strongloop.com/strongblog/loopback-4-ga). Mi aspettavo più potenza, una migliore documentazione, magari il supporto nativo a GraphQL. Ma soprattutto che rimanesse semplice ed elegante com'era. E invece proprio quest'ultimo punto è stato uno stravoglimento totale, per me incomprensibile. Loopback 4 fa uso di [TypeScript](https://www.typescriptlang.org/) (e vabbè, se proprio non potete fare a meno della tipizzazione statica), dei decoratori (e vabbè, basta non abusarne), delle classi (taaaante classi) e ha addirittura un suo sistema di dependency injection!

Da una parte sembra il miglior amico di [Angular](https://angular.io/), framework che non riesco proprio a digerire, dall'altra sembra un porting di [Spring Boot](http://spring.io/projects/spring-boot). Pare come se i Javisti si fossero riversati nel salotto JavaScript e avessero detto: "Non mi piace qui, dobbiamo riarredare".

Un esempio? Questo è il codice necessario a definire una relazione uno-a-molti in Loopback 3:

```json
{
  "name": "TodoList",
  "base": "PersistedModel",
  "relations": {
    "todos": {
      "type": "hasMany",
      "model": "Todo",
      "foreignKey": "todoListId"
    }
  }
}
```

Ecco lo stesso tipo di relazione definito in Loopback 4:

```js
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {TodoList, Todo} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TodoRepository} from './todo.repository';

export class TodoListRepository extends DefaultCrudRepository<
  TodoList,
  typeof TodoList.prototype.id
> {
  public readonly todos: HasManyRepositoryFactory<
    Todo,
    typeof TodoList.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter(TodoRepository)
    protected todoRepositoryGetter: Getter<TodoRepository>,
  ) {
    super(TodoList, dataSource);
    this.todos = this._createHasManyRepositoryFactoryFor(
      'todos',
      todoRepositoryGetter,
    );
  }
}
```

L'esempio è preso dal [tutorial ufficiale](https://loopback.io/doc/en/lb4/todo-list-tutorial-repository.html), che al momento in cui scrivo è anche errato (ho dovuto aggiustare guardando il [sorgente degli esempi](https://github.com/strongloop/loopback-next/blob/master/examples/todo-list/src/repositories/todo-list.repository.ts)).

Inoltre per creare un unico endpoint REST è necessario:

1. Creare una classe di modello
2. Creare una classe datasource
3. Creare una classe repository
4. Creare una classe controller

La classe modello descrive le proprietà del modello tramite attributi di istanza e decoratori, mentre prima bastava un po' di JSON.

La classe datasource serve solo a iniettare la configurazione JSON simile a quella che c'era in Loopback 3.

La classe repository serve solo a iniettare la classe datasource.

La classe controller espone tutti i metodi CRUD di base, oportunamente decorati, risultando in circa 130 righe di codice quando in Loopback 3 ne servivano 0.

Parafrasando Bender, mi viene voglia di creare un Loopback tutto mio, con blackjack e squillo di lusso. Anzi, senza blackjack e neanche le squillo, ma almeno più funzionale.

```
# IceOnFire
```
