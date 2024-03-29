'use strict';

import fs from 'node:fs';
import path from 'node:path';

import { parse, HTMLElement } from 'node-html-parser';

interface TemplateEngineOptions {
  caching: false | boolean;
}

class TemplateEngine {
  options: TemplateEngineOptions;
  templates: Map<string, string>;

  constructor(options: TemplateEngineOptions) {
    this.options = options;
    this.templates = new Map();
  }

  template(filePath: string) {
    if (!filePath.endsWith('.html')) {
      filePath = `${filePath}.html`;
    }

    const key = Buffer.from(filePath).toString('base64');

    if (!this.templates[key]) {
      this.templates[key] = fs.readFileSync(filePath).toString();
    }

    return this.templates[key];
  }

  eval(code: string, scope: any) {
    return new Function(`with (this) { return ${code} }`).call(scope);
  }

  nodes(string: string) {
    return parse(string).childNodes;
  }

  processRepeatTag(document: HTMLElement, scope: any = {}) {
    let elements = document.querySelectorAll('repeat');

    for (const element of elements) {
      let times = this.eval(element.getAttribute('times'), scope);
      let from = this.eval(element.getAttribute('from'), scope);
      let to = this.eval(element.getAttribute('to'), scope);
      if (times) {
        from = 0;
        to = times - 1;
      }

      let content = element.innerHTML;
      let indexKey = element.getAttribute('index');
      let repeatedContent = '';
      for (let i = from; i <= to; i++) {
        if (indexKey) {
          scope[indexKey] = i;
        }
        const contentDocument = parse(content);
        this.processDocument(contentDocument, scope);
        repeatedContent += contentDocument.toString();
      }
      element.innerHTML = repeatedContent;
    }
  }

  processEvelTag(document: HTMLElement, scope: any = {}) {
    const elements = document.querySelectorAll('eval');

    for (const element of elements) {
      let value = this.eval(element.innerHTML, scope);
      let nodes = this.nodes(value);

      element.replaceWith(...nodes);
    }
  }

  processInjection(document: HTMLElement, scope: any = {}) {
    for (const childNode of document.childNodes) {
      const element = <HTMLElement>childNode;
      let content = element.innerHTML;
      if (!content) {
        continue;
      }

      const injections = content.match(/#{([^}]+)}/g);
      for (const injection of injections || []) {
        const code = injection.match(/#{([^}]+)}/)[1];
        const value = this.eval(code, scope);

        content = content.replace(injection, value);
      }

      element.innerHTML = content;
    }
  }

  processIfTag(document: HTMLElement, scope = {}) {
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
          let code = condition.getAttribute('condition');
          if (this.eval(code, scope)) {
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

  processImportTag(document: HTMLElement, scope: any = {}) {
    let elements = document.querySelectorAll('import');

    for (const element of elements) {
      const importFile = path.resolve(
        scope.settings.views,
        element.getAttribute('src')
      );
      const importDocument = parse(this.template(importFile));

      this.processDocument(importDocument, scope);

      element.replaceWith(...importDocument.childNodes);
    }
  }

  processDocument(document: HTMLElement, scope = {}) {
    this.processRepeatTag(document, scope);
    this.processEvelTag(document, scope);
    this.processInjection(document, scope);
    this.processIfTag(document, scope);
    this.processImportTag(document, scope);
  }

  render(file, scope = {}) {
    let html = this.template(file);

    const document = parse(html);
    this.processDocument(document, scope);
    html = document.toString();

    return html;
  }
}

let templateEngine: TemplateEngine;

function engine(options: TemplateEngineOptions) {
  templateEngine = new TemplateEngine(options);
  return (file: any, scope: any, callback: Function) => {
    try {
      return callback(null, templateEngine.render(file, scope));
    } catch (error) {
      return callback(error, null);
    }
  };
}

export default engine;
export { TemplateEngine };
