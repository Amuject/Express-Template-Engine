# Express Template Engine

## Installation

`npm i @wnynya/express-template-engine`

## Usage

```js
import engine from '@wnynya/express-template-engine';

app.engine('html', engine());
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, './views'));

app.get('/', (req, res) => {
  res.render('template', {});
});
```

## Variable Injection

```html
<span>#{val}</span>
```

## `<eval>` Tag

```html
<eval>variable</eval>
```

```html
<eval>javascript.code({});</eval>
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
