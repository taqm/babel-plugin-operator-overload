![.github/workflows/main.yml](https://github.com/taqm/babel-plugin-transform-operator-overload/workflows/.github/workflows/main.yml/badge.svg)
[![npm version](https://badge.fury.io/js/babel-plugin-transform-operator-overload.svg)](https://badge.fury.io/js/babel-plugin-transform-operator-overload)

# babel-plugin-transform-operator-overload

## Instration
```sh
# npm
npm install -D babel-plugin-transform-operator-overload

# yarn
yarn add -D babel-plugin-transform-operator-overload
```

## Usage

Please add this in `babel.config.js`.
```json
{
  "plugins": [
    ... ,
    "babel-plugin-transform-operator-overload"
  ],
}
```

This plugin works inside a block labeled 'opol'.

```js
opol: {
  const c = a + b;
  console.log(c);
}
```

↓

```js
{
  const c = ((left, right) => left["+"] ? left["+"](right) : left + right)(a, b);
  console.log(c);
}
```


#### e.g.)
```js
const obj = {
  value: 5,

  ['+'](num) {
    return this.value + num;
  },

  ['-'](num) {
    return this.value - num;
  }
};

const puts = { '<<': console.log };
opol: {
  puts << 'hello world';
  // => hello world

  puts << (obj + 3);
  // => 8
}
```

### Works Operators
`+` , `-` , `/` , `%` , `*` , `**` , `&` , `,` , `>>` , `>>>` , `<<` , `^` , `==` , `===` , `!=` , `!==` , `instanceof` , `>` , `<` , `>=` , `<=`

## License
MIT
