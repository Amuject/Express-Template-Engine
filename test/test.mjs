'use strict';

import path from 'node:path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from 'express';

const app = express();

import engine from 'express-template-engine';

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
    head: 'head.html',
  });
});

app.listen(3000);
