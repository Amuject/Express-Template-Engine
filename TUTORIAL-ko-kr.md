# Express Template Engine 쉬운 사용자 설명서

이 쉬운 사용자 설명서는 Node.js 와 Express 모듈, 그리고 Express Template Engine을 사용해 웹 서버를 만들어 보고 템플릿 엔진의 기능을 사용해 볼 수 있도록 작성되었습니다.

## 목차

- [Express 서버 환경 만들기](#Express-서버-환경-만들기)
  - [컴퓨터에 Node.js 설치하기](#컴퓨터에-Nodejs-설치하기)
  - [새로운 Node.js 프로젝트 만들기](#새로운-Nodejs-프로젝트-만들기)
  - [Express 모듈 설치하기](#Express-모듈-설치하기)
  - [기본적인 Express 서버 코드 작성하기](#기본적인-Express-서버-코드-작성하기)
  - [Node.js로 Express 서버 실행하기](#Nodejs로-Express-서버-실행하기)
  - [기본적인 HTML 문서 보여주기](#기본적인-HTML-문서-보여주기)
  - [Express 템플릿 엔진 모듈 설치하기](#Express-템플릿-엔진-모듈-설치하기)
- [Express 템플릿 엔진 사용하기](#Express-템플릿-엔진-사용하기)
  - [Express 템플릿 엔진을 위한 Express 서버 코드 작성하기](#Express-템플릿-엔진을-위한-Express-서버-코드-작성하기)
  - [자바스크립트 변수 사용하기](#자바스크립트-변수-사용하기)
  - [반복문 사용하기](#반복문-사용하기)
  - [조건문 사용하기](#조건문-사용하기)
  - [다른 템플릿 파일 불러오기](#다른-템플릿-파일-불러오기)

# Express 서버 환경 만들기

## 컴퓨터에 Node.js 설치하기

Express 모듈은 Node.js 의 자바스크립트 환경 위에서 작동됩니다. 모듈을 사용하기 위해서,먼저 컴퓨터에 Node.js 를 설치해야 합니타.

설치 방법은 OS 별로 다릅니다.

- Windows, Mac OS 의 경우

  [Node.js 공식 웹사이트](https://nodejs.org/)에서 알맞은 설치 파일을 다운로드하여 설치 해 주세요.

- Linux (Debian, Ubuntu 등) 의 경우

  [NodeSource 의 설치 스크립트](https://github.com/nodesource/distributions?tab=readme-ov-file#debian-and-ubuntu-based-distributions)를 참조하여 설치 해 주세요.

## 새로운 Node.js 프로젝트 만들기

원하는 경로에 새로운 프로젝트 디렉토리를 만듭니다.

새로 만든 프로젝트 디렉토리 경로에서 터미널 창을 엽니다.

터미널 창에서 `npm init` 명령어를 사용하여 기본 설정 파일을 생성합니다. 보통의 경우 전부 `엔터 키`를 사용하여 넘기면 됩니다.

## Express 모듈 설치하기

터미널 창에서 `npm i express` 명령어를 사용하여 Express 모듈을 설치합니다.

## 기본적인 Express 서버 코드 작성하기

Express 모듈로 웹 서버를 실행하기 위해 기본적인 코드를 작성합니다.

프로젝트 디렉토리에서 `app.mjs` 파일을 새로 만든 뒤 텍스트 에디터로 엽니다.

`app.mjs` 파일에 다음의 코드를 작성 후 저장합니다.

```js
import express from 'express';

// express 인스턴스 만들기
const app = express();

// 루트 페이지 응답 설정
app.get('/', (req, res) => {
  res.send('hello world!');
});

// 웹 서버 실행
app.listen(3000, () => {
  console.log('Server started');
});
```

## Node.js로 Express 서버 실행하기

기본적인 준비가 끝났습니다. 웹 서버를 실행하기 위해 터미널 창으로 갑니다.

`node app.mjs` 명령어를 사용하여 서버를 실행합니다. 콘솔에 `Server started` 메시지가 나오면 서버가 성공적으로 실행 된 것입니다.

웹 브라우저로 [`http://localhost:3000`](http://localhost:3000) 주소에 접속하여 `hello world!` 메시지가 정상적으로 나타나는지 확인합니다.

터미널 창에서 `Ctrl` 키와 `C` 키를 동시에 눌러 웹 서버 프로세스를 종료합니다.

## 기본적인 HTML 문서 보여주기

HTML 문서를 작성해 둘 `views` 디렉토리를 프로젝트 디렉토리 내에 만듭니다.

`views` 디렉토리로 이동하여 첫번째 HTML 문서로 `index.html` 파일을 새로 만든 뒤 텍스트 에디터로 엽니다.

현재 시점에서 프로젝트 디렉토리의 구조는 다음과 같아야 합니다.

```
project-directory
  - node_modules
    - ...
  - views
    - index.html
  - app.mjs
  - package-lock.json
  - package.json
```

`index.html` 파일에 다음의 코드를 작성 후 저장합니다.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>HTML 문서 보여주기</title>
  </head>
  <body>
    <h1>새로운 HTML 문서!</h1>
    <p>새로운 HTML 문서를 작성하였습니다. 잘 표시돠었으면 좋겠네요.</p>
  </body>
</html>
```

`app.mjs` 파일을 열어 코드를 다음과 같이 수정 후 저장합니다.

```js
// 현재 경로를 가져오기 위한 코드
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from 'express';

// express 인스턴스 만들기
const app = express();

// 루트 페이지 응답 설정
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/index.html'));
});

// 웹 서버 실행
app.listen(3000, () => {
  console.log('Server started');
});
```

웹 서버를 다시 실행 후 웹 브라우저로 [`http://localhost:3000`](http://localhost:3000) 주소에 접속하면 작성한 HTML 문서를 확인할 수 있습니다.

## Express 템플릿 엔진 모듈 설치하기

Express 템플릿 엔진을 설치하기 전에 웹 서버를 종료합니다.

터미널 창에서 `npm i express-template-engine` 명령어를 사용하여 템플릿 엔진 모듈을 설치합니다.

# Express 템플릿 엔진 사용하기

## Express 템플릿 엔진을 위한 Express 서버 코드 작성하기

`app.mjs` 파일을 열어 코드를 다음과 같이 수정 후 저장합니다.

```js
// 현재 경로를 가져오기 위한 코드
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from 'express';

// express 인스턴스 만들기
const app = express();

// 템플릿 엔진 모듈 가져오기
import engine from 'express-template-engine';

// 템플릿 엔진 설정하기
app.engine('html', engine());
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, './views'));

// 루트 페이지 응답 설정
app.get('/', (req, res) => {
  res.render('index', {
    hello: 'world',
  });
});

// 웹 서버 실행
app.listen(3000, () => {
  console.log('Server started');
});
```

Express 템플릿 엔진을 설정하는 코드와 루트 페이지의 응답을 설정하는 코드가 `res.sendFile()` 에서 `res.render()` 로 바뀐 것을 확인할 수 있습니다.

Express 템플릿 엔진을 설정하는 코드에서는 HTML 파일을 담았던 `views` 디렉토리를 Express 템플릿 엔진을 담는 디렉토리로 설정 해 줍니다.

`res.render('index', {...})` 은 방금 작성한 `index.html` 파일을 템플릿 파일로 사용자에게 보여주겠다는 의미입니다.

이 상태에서 웹 서버를 다시 실행 후 웹 브라우저로 [`http://localhost:3000`](http://localhost:3000) 주소에 접속하면 작성한 HTML 문서를 똑같이 확인할 수 있습니다.

이 Express 템플릿 엔진은 HTML과 호환되기 때문에 일반적인 HTML 문서도 유효한 템플릿 문서이기 때문입니다.

## 자바스크립트 변수 사용하기

지금부터는 템플릿 파일로 사용되는 `views` 디렉토리 의 `index.html` 파일을 수정하여 템플릿 엔진의 기능읗 사용 해 봅니다. `<body>` 태그 안의 내용을 수정하여 템플릿 엔진의 기능을 바로 확인할 수 있습니다.

`index.html` 파일을 열어 코드를 다음과 같이 수정 후 저장합니다.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>HTML 문서 보여주기</title>
  </head>
  <body>
    <h1>새로운 HTML 문서!</h1>
    <p>새로운 HTML 문서를 작성하였습니다. 잘 표시돠었으면 좋겠네요.</p>
    <p>변수에 할당된 메시지를 불러옵니다. hello #{hello}!</p>
    <p>
      변수에 할당된 메시지를 다른 방식으로 불러옵니다. hello
      <eval>hello</eval>!
    </p>
  </body>
</html>
```

변수에 할당된 값을 불러오는 코드가 추가되었습니다. `#{hello}` 혹은 `<eval>hello</eval>` 를 사용하여 방금 전 `app.mjs` 파일의 `res.render('index', { hello: 'world' })` 의 코드에서 정의된 `hello` 변수에 대입한 값 `'world'` 를 HTML 문서의 코드 사이에 끼위넣듯이 사용할 수 있습니다.

웹 서버를 다시 실행 후 웹 브라우저로 [`http://localhost:3000`](http://localhost:3000) 주소에 접속하면 작성한 HTML 문서를 템플릿으로 사용한 결과를 확인할 수 있습니다. 이 방법은 아래에서 설명할 템플릿 엔진의 기능들을 확인할 때도 똑같이 사용하면 됩니다.

## 반복문 사용하기

`index.html` 파일을 열어 코드를 다음과 같이 수정 후 저장합니다.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>HTML 문서 보여주기</title>
  </head>
  <body>
    <h1>새로운 HTML 문서!</h1>
    <p>새로운 HTML 문서를 작성하였습니다. 잘 표시돠었으면 좋겠네요.</p>
    <p>변수에 할당된 메시지를 불러옵니다. hello #{hello}!</p>
    <p>
      변수에 할당된 메시지를 다른 방식으로 불러옵니다. hello
      <eval>hello</eval>!
    </p>
    <repeat times="3">
      <p>이 문장은 3번 반복됩니다!</p>
    </repeat>
    <repeat index="i" from="1" to="10">
      <p>숫자 세기: #{i}</p>
    </repeat>
  </body>
</html>
```

문서에 `<repeat>` 태그가 추가되었습니다. `<repeat>` 태그는 `times="실행횟수"` 속성 혹은 `from="처음"`, `to="끝"` 속성을 사용하여 `<repeat>` 태그 안의 내용을 반복하여 표시할 수 있습니다. 반복 중 인덱스 값이 필요한 경우 `index="변수명"` 속성을 사용하여 인덱스 값을 변수에 할당하여 사용할 수 있습니다. `times="실행횟수"` 속성과 `from="처음"`, `to="끝"` 속성이 동시에 사용될 경우 `times="실행횟수"` 속성에 따라 실행됩니다.

## 조건문 사용하기

`index.html` 파일을 열어 코드를 다음과 같이 수정 후 저장합니다.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>HTML 문서 보여주기</title>
  </head>
  <body>
    <h1>새로운 HTML 문서!</h1>
    <p>새로운 HTML 문서를 작성하였습니다. 잘 표시돠었으면 좋겠네요.</p>
    <p>변수에 할당된 메시지를 불러옵니다. hello #{hello}!</p>
    <p>
      변수에 할당된 메시지를 다른 방식으로 불러옵니다. hello
      <eval>hello</eval>!
    </p>
    <repeat times="3">
      <p>이 문장은 3번 반복됩니다!</p>
    </repeat>
    <repeat index="i" from="1" to="10">
      <p>숫자 세기: #{i}</p>
    </repeat>
    <if condition="new Date().getSeconds() <= 20">
      <p>지금은 0 - 20 초 사이입니다.</p>
    </if>
    <elif condition="new Date().getSeconds() <= 50">
      <p>지금은 20 - 50 초 사이입니다.</p>
    </elif>
    <else>
      <p>이번 분이 거의 끝나갑니다!</p>
    </else>
  </body>
</html>
```

`<if>`, `<elif>`, `<else>` 태그가 추가되었습니다. `<if>`, `<elif>` 태그에는 `condition=""` 속성을 사용하여 조건문을 지정할 수 있습니다. 조건문은 자바스크립트에서 사용되는 조건문과 동일합니다.

## 다른 템플릿 파일 불러오기

이 Express 템플릿 엔진에서는 다른 템플릿 파일을 불러 와 사용할 수 있습니다. 이 기능을 사용 해 보기 위해 새로운 템플릿 `temp.html` 파일을 `views` 디렉토리에 생성합니다.

`temp.html` 파일에 다음의 코드를 작성 후 저장합니다.

```html
<p style="color: red;">과연 이 빨간 문장이 잘 불러와질까요?</p>
```

`index.html` 파일을 열어 코드를 다음과 같이 수정 후 저장합니다.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>HTML 문서 보여주기</title>
  </head>
  <body>
    <h1>새로운 HTML 문서!</h1>
    <p>새로운 HTML 문서를 작성하였습니다. 잘 표시돠었으면 좋겠네요.</p>
    <p>변수에 할당된 메시지를 불러옵니다. hello #{hello}!</p>
    <p>
      변수에 할당된 메시지를 다른 방식으로 불러옵니다. hello
      <eval>hello</eval>!
    </p>
    <repeat times="3">
      <p>이 문장은 3번 반복됩니다!</p>
    </repeat>
    <repeat index="i" from="1" to="10">
      <p>숫자 세기: #{i}</p>
    </repeat>
    <if condition="new Date().getSeconds() <= 20">
      <p>지금은 0 - 20 초 사이입니다.</p>
    </if>
    <elif condition="new Date().getSeconds() <= 50">
      <p>지금은 20 - 50 초 사이입니다.</p>
    </elif>
    <else>
      <p>이번 분이 거의 끝나갑니다!</p>
    </else>
    <import src="temp"></import>
  </body>
</html>
```

문서의 마지막 즈음에 `<import>` 태그가 추가되었습니다. `<import src="다른 템플릿 파일">` 을 사용하여 다른 템플릿 파일의 내용을 불러 와 사용할 수 있습니다.

# 끝!

`Express Template Engine 쉬운 사용자 설명서`의 과정이 끝났습니다. Express 템플릿 엔진의 기능들은 전부 함께, 혹은 중첩하여 사용할 수 있습니다. Express 템플릿 엔진을 사용하여 더 쉽게 웹 페이지를 만들어 보세요!
