# Express Template Engine

**Easy HTML-based template engine for [Express](https://expressjs.com/)**

You can see tutorial here.

- [[English] Express Template Engine Tutorial](https://github.com/wnynya/Express-Template-Engine/blob/main/TUTORIAL-en.md)

- [[한국어] 쉬운 Express 템플릿 엔진 사용자 설명서](https://github.com/wnynya/Express-Template-Engine/blob/main/TUTORIAL-ko.md)

## Installation

```
npm i express-template-engine
```

## Setup with Express

```js
import engine from 'express-template-engine'; // ESM, Typescript
const engine = require('express-template-engine'); // CJS

// Set express template engine
app.engine('html', engine({ caching: false }));
app.set('view engine', 'html');

// Set views directory
app.set('views', path.resolve(__dirname, './views'));

// Use template engine
app.get('/', (req, res) => {
  res.render('template', { ... });
});
```

# Function Tags

## `<eval>` Tag

```html
<eval>val</eval>
```

```html
<eval>javascript.code({});</eval>
```

### Variable Injection (Same as `<eval>` Tag)

```html
<span>#{val}</span>
```

## `<repeat>` Tag

```html
<repeat index="i" from="0" to="5">
  <p>Run #{i} times.</p>
</repeat>
```

```html
<repeat index="i" times="5">
  <p>Run <eval>i</eval> times.</p>
</repeat>
```

## `<if>`, `<elif>`, `<else>` Tag

```html
<if condition="false">
  <p>Content of IF</p>
</if>
<elif condition="val == 'cond'">
  <p>Content of ELIF</p>
</elif>
<else>
  <p>Content of ELSE</p>
</else>
```

## `<import>` Tag

```html
<import src="another/template"></import>
```
