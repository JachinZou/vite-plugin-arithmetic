A vite plugin as a solution for the problem in the calculation precision of the floating points numbers.

## Usage
```bash
npm install vite-plugin-arithmetic --save-dev
```

## Add vite-plugin-arithmetic

#### vite.config.js
```javascript
import arithmetic from 'vite-plugin-arithmetic'

{
    // other config ....
    plugins: [
      vue(), // if vue plugin exist, it should be front of arithmetic
      // vuejsx(), // maybe you should use this, also should be fron of arithmetic
      arithmetic(),  // this plugin should behind of vue plugin, like vue, vuejsx etc.
    ],
    // other config ....
  }
```


## Example
By this plugin, it translate BinaryExpression to FunctionCall for a right result with float number.

```javascript
var a = 0.1 + 0.2;
//0.30000000000000004
	↓ ↓ ↓ ↓ ↓ ↓
import { add as $$add_87676230 } from 'virtual:calc';
var a = $$add_87676230(0.1, 0.2);
//0.3
```

```javascript
var a = 0.1 + 0.2;
var b = 0.8 - 0.2;
//0.30000000000000004
//0.6000000000000001
	↓ ↓ ↓ ↓ ↓ ↓
import { add as $$add_87676230, sub as $$sub_87676230 } from 'virtual:calc';
var a = $$add_87676230(0.1, 0.2);
var a = $$sub_87676230(0.8, 0.2);
//0.3
//0.6
```
`Note: it doesn't work with eval() And just support (+ - * \ += -= *= /=), if the members of the operator is not Number type, it will return the result as it should be`

