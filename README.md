# babel-plugin-operator-overload

## Instration
```sh
# npm
# npm install -D babel-plugin-operator-overload
npm install -D https://github.com/taqm/babel-plugin-operator-overload

# yarn
# yarn add -D babel-plugin-operator-overload
yarn add -D https://github.com/taqm/babel-plugin-operator-overload
```

## Usage

Please add this in `.babelrc`.
```json
{
  "plugins": [
    ... ,
    "operator-overload"
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
