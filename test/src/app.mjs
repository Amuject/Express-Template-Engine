'use strict';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from 'express';

const app = express();

import engine from '../../src/index.mjs';

app.engine('html', engine());
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, './views'));

app.get('/', (req, res) => {
  res.render('index', {
    msg: 'hello world',
    a: 1,
    b: () => {
      return 'func';
    },
  });
});

app.listen(3000);
