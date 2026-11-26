---
title: Loopback 4 Is a Port of Spring Boot
description: IBM ruined a beautiful product. Time to look elsewhere.
author: Matteo Antony Mistretta
date: 2018-10-23
topic: backend
original: it
---

If there's one good thing the [exhausting JavaScript ecosystem](https://medium.com/@ericclemmons/javascript-fatigue-48d4011b6fc4) brought into our lives, it's a return to [functional programming](https://codeburst.io/functional-programming-in-javascript-e57e7e28c0e5). After years and years of racking our brains over objects, classes and design patterns, Facebook with its [React](https://reactjs.org/) and [Redux](https://redux.js.org/) convinced us to go back and reconsider pure functions, immutability and composition over inheritance, annotations and dependency injection. All of a sudden code becomes powerful, performant, readable and testable like never before, and object-oriented (or rather, class-oriented) programming looks like a bad memory.

That's the front end, at least. What about the back end? Personally, for slightly more complex projects my choice fell on [Loopback 3](https://loopback.io/), a framework by [Strongloop](https://strongloop.com/) (later acquired by [IBM](https://www.ibm.com/)) which, being heavily based on [Express](https://expressjs.com/), makes creating a Node server immediate and customizing it at least feasible. You just define a model in a language that is basically an extension of [JSON Schema](https://json-schema.org/) and you automatically get a REST service with all the CRUD operations on the database. If you want custom functions, you can create hooks at various levels of the architecture, or Express-style middlewares.

So I couldn't wait to get my hands on [Loopback version 4](http://v4.loopback.io/), officially released on [October 10th, 2018](https://strongloop.com/strongblog/loopback-4-ga). I expected more power, better documentation, maybe native GraphQL support. But above all, I expected it to stay as simple and elegant as it was. And that last point is exactly where everything was turned upside down, in a way I can't understand. Loopback 4 uses [TypeScript](https://www.typescriptlang.org/) (oh well, if you really can't live without static typing), decorators (oh well, just don't abuse them), classes (sooo many classes), and even has its own dependency injection system!

On one hand it looks like the best friend of [Angular](https://angular.io/), a framework I just can't digest; on the other, it looks like a port of [Spring Boot](http://spring.io/projects/spring-boot). It's as if Java developers had poured into the JavaScript living room and said: "I don't like it here, we need to refurnish".

An example? This is the code needed to define a one-to-many relation in Loopback 3:

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

Here is the same kind of relation defined in Loopback 4:

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

The example comes from the [official tutorial](https://loopback.io/doc/en/lb4/todo-list-tutorial-repository.html), which at the time of writing is also wrong (I had to fix it by looking at the [source of the examples](https://github.com/strongloop/loopback-next/blob/master/examples/todo-list/src/repositories/todo-list.repository.ts)).

Moreover, to create a single REST endpoint you need to:

1. Create a model class
2. Create a datasource class
3. Create a repository class
4. Create a controller class

The model class describes the model's properties through instance attributes and decorators, where a bit of JSON used to be enough.

The datasource class only exists to inject a JSON configuration similar to the one Loopback 3 had.

The repository class only exists to inject the datasource class.

The controller class exposes all the basic CRUD methods, properly decorated, resulting in about 130 lines of code where Loopback 3 needed 0.

To paraphrase Bender, it makes me want to build my own Loopback, with blackjack and hookers. In fact, forget the blackjack and the hookers — but at least make it more functional.

_— IceOnFire_
