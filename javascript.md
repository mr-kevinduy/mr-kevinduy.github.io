# Key and concept in javascript

## Functional programming, Object oriented programming, Imperative programming, Declarative programming.

## Javascript Data Types

The latest ECMAScript standard defines 7 datatypes:

```
- 6 Primitives Data:
  Boolean
  Null
  Undefined
  Number
  String
  Symbol (new in ECMAScript 6)

- 2 Complex Data
  Object
  Function
```

Note:
```
Empty value: value is "", typeof is string
Undefined: a variable without a value. value is undefined, typeof is undefined
Null: value is undefined, typeof is an object

===> null == undefined    // true
     null === undefined   // false

Object:
  - typeof null                           // Returns "object"
  - typeof {name: 'Mr.KevinDuy', age: 28} // Returns "object" (Not "array")
  - typeof [1, 2, 3]                      // Returns "object"

Function:
  - typeof function funcName() {}         // Returns "function"
```

## Immutable, Mutable Object

#### Immutable: numbers, strings

- Example 1:

```
let a = 'abc';
let b = a;

a = a.substring(2);

console.log(a); // c
console.log(b); // abc
console.log(a === b); // false
```

- Example 2:

```
let a = 1;
let b = a;

a++;

console.log(a); // 2
console.log(b); // 1
console.log(a === b); // false
```

#### Mutable: objects, arrays, functions, classes, sets, and maps.

- Example 1:
```

```

- Example 2:
```

```

## ES6 (ECMAScript 2015)

#### Literial String

#### Arrow Function

#### Destructing

#### Classes

#### New