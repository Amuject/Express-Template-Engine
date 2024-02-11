'use strict';

import fs from 'fs';
import path from 'path';

import { JSDOM } from 'jsdom';

const templates = {};
function getTemplate(filePath) {
  if (!filePath.endsWith('.html')) {
    filePath = `${filePath}.html`;
  }
  const key = Buffer.from(filePath).toString('base64');
  templates[key] = templates[key]
    ? templates[key]
    : fs.readFileSync(filePath).toString();
  return templates[key];
}

function scopeEval(code, scope = {}) {
  return new Function(`with (this) { return (${code}); }`).call(scope);
}

function nodesFromString(string) {
  const dom = new JSDOM(string);
  return dom.window.document.childNodes;
}

function parseRepeatTag(document, scope = {}) {
  let elements = document.querySelectorAll('repeat');
  for (const element of elements) {
    let content = element.innerHTML;
    let index = element.getAttribute('index');
    let times = scopeEval(element.getAttribute('times'), scope);
    let from = scopeEval(element.getAttribute('from'), scope);
    let to = scopeEval(element.getAttribute('to'), scope);
    if (times) {
      from = 0;
      to = times - 1;
    }
    let innerHTML = '';
    for (let i = from; i <= to; i++) {
      scope[index] = i;
      const contentDOM = new JSDOM(content);
      const contentDocument = contentDOM.window.document;
      parseDocument(contentDocument, scope);
      innerHTML += contentDOM.serialize();
    }
    element.innerHTML = innerHTML;
  }
}

function parseInjection(document, scope = {}) {
  let elements = document.childNodes;
  for (const element of elements) {
    let content = element.innerHTML;
    if (!content) {
      continue;
    }
    const matches = content.match(/#{([^}]+)}/g);
    if (matches) {
      for (const match of matches) {
        const code = match.match(/#{([^}]+)}/)[1];
        const value = scopeEval(code, scope);
        content = content.replace(match, value);
      }
    }
    element.innerHTML = content;
  }
}

function parseImportTag(document, scope = {}) {
  let elements = document.querySelectorAll('import');
  for (const element of elements) {
    const importFile = path.resolve(
      scope.settings.views,
      element.getAttribute('src')
    );
    const importDOM = new JSDOM(getTemplate(importFile));
    const importDocument = importDOM.window.document;
    parseDocument(importDocument, scope);
    element.replaceWith(...importDocument.childNodes);
  }
}

function parseIfTag(document, scope = {}) {
  const elements = document.querySelectorAll('if');
  for (const element of elements) {
    let conditions = [element];
    let sibling = element;
    while (true) {
      sibling = sibling.nextElementSibling;
      if (!sibling) {
        break;
      } else if (sibling.tagName === 'ELIF') {
        conditions.push(sibling);
      } else if (sibling.tagName === 'ELSE') {
        conditions.push(sibling);
        break;
      } else {
        break;
      }
    }

    let checked = false;
    for (const condition of conditions) {
      if (checked) {
        condition.remove();
      } else if (condition.tagName === 'IF' || condition.tagName === 'ELIF') {
        let evalCode = condition.getAttribute('condition');
        let evalv = scopeEval(evalCode, scope);
        if (evalv) {
          condition.replaceWith(...condition.childNodes);
          checked = true;
        } else {
          condition.remove();
        }
      } else {
        condition.replaceWith(...condition.childNodes);
        checked = true;
      }
    }
  }
}

function parseEvelTag(document, scope = {}) {
  const elements = document.querySelectorAll('eval');
  for (const element of elements) {
    let value = scopeEval(element.innerHTML, scope);
    let nodes = nodesFromString(value);
    element.replaceWith(...nodes);
  }
}

function parseDocument(document, scope = {}) {
  parseRepeatTag(document, scope);
  parseInjection(document, scope);
  parseImportTag(document, scope);
  parseIfTag(document, scope);
  parseEvelTag(document, scope);
}

function render(file, scope = {}) {
  let html = getTemplate(file);

  const DOM = new JSDOM(html);
  const document = DOM.window.document;
  parseDocument(document, scope);
  html = DOM.serialize();

  return html;
}

function engine() {
  return (file, options, callback) => {
    try {
      return callback(null, render(file, options));
    } catch (error) {
      return callback(error, null);
    }
  };
}

export default engine;
