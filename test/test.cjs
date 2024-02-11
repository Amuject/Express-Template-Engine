'use strict';

const path = require('node:path');

const express = require('express');

const app = express();

const engine = require('express-template-engine');

app.engine('html', engine());
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, './views'));

app.get('/', (req, res) => {
  res.render('index', {
    hello: 'world',
    msg: 'hello world',
    a: 1,
    b: () => {
      return 'func';
    },
    array: ['aaa', 'bbb', 'ccc'],
  });
});

app.listen(3000);
