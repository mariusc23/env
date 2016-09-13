# env

> A simple way to retrieve environment variables.

## Installation

    npm install --save @mariusc23/env


## Usage

```js
// ES5
const env = require('@mariusc23/env');

exports.SECRET = env({ name: 'SECRET' });
```

```js
// ES6
import env from '@mariusc23/env';

export const SECRET = env({ name: 'SECRET' });
```

### Options

#### name: string

Variable name.

```js
env({
  name: 'SECRET'
});
```

#### required: boolean

Throw an error if variable is not present in the environment.

```js
env({
  name: 'SECRET',
  required: true
});
```

#### defaultValue: string

Return a default value if variable is not present in the environment.

```js
env({
  name: 'SECRET',
  defaultValue: 'puppies'
});
```

#### transform(value): function

Transform the value before returning it.

```js
env({
  name: 'OPTIONS',
  transform: JSON.parse
});
```

### Global Defaults

You can set global defaults. This is useful when you are too lazy to define a file to hold all your configuration constants.

```js
env.setDefault('NODE_ENV', 'development'); // hint: built in

env({ name: 'NODE_ENV' });
// => 'development'
```
