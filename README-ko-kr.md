# Express Template Engine

**[Express](https://expressjs.com/)와 함께 사용할 수 있는 쉬운 HTML 태그 기반의 템플릿 엔진**

## 설치

`npm i @wnynya/express-template-engine`

## 빠른 사용방법

```js
import engine from '@wnynya/express-template-engine';

// 템플릿 엔진 등록
app.engine('html', engine({ caching: false }));
app.set('view engine', 'html');

// 템플릿 디렉토리 설정
app.set('views', './views');

app.get('/', (req, res) => {
  // 템플릿 엔진 사용
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
