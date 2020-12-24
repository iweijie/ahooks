import FSM from './parser';
import { cloneDeep, isEmpty } from 'lodash';
import { temp } from './temp';

const a = [
  {
    start: [
      { t: 'div', o: 0, m: 'n' },
      { t: 'main', o: 0, m: 'n' },
      { t: 'div', o: 0, m: 'n' },
      { t: 'span', o: 0, m: 'n' },
      { text: 'span', o: 0, m: 'f' },
    ],
    end: [
      { t: 'div', o: 0, m: 'n' },
      { t: 'main', o: 0, m: 'n' },
      { t: 'div', o: 0, m: 'n' },
      { t: 'span', o: 0, m: 'n' },
      { text: 'span', m: 'f' },
    ],
  },
];

class Parse {
  constructor(props) {
    this.ast = this.getAst(temp || props.template);
  }

  getAst(str) {
    return FSM(str);
  }

  getHTML() {
    console.time('_getFormatAst');
    const ast = this._getFormatAst();
    console.timeEnd('_getFormatAst');
    return this._getAstToHTML(ast);
  }

  // 笔记与ast 的融和
  _getFormatAst(options) {
    const ast = cloneDeep(this.ast);
    // const ast = JSON.parse(JSON.stringify(this.ast))
    // TODO 将笔记插入到ast中
    return ast;
  }

  _getAstToHTML(ast) {
    if (isEmpty(ast)) return '';
    return ast
      .map(item => {
        return this._getElementHTML(item);
      })
      .join('');
  }

  _getElementHTML(item) {
    const {
      type,
      uuid,
      tagName,
      content = '',
      parent,
      attributes,
      children,
    } = item;
    if (type === 'element') {
      const attrStr = attributes
        .map(attr => {
          const { value, name } = attr;
          return value ? `${name}="${value}"` : name;
        })
        .join(' ');
      const child = this._getAstToHTML(children);
      return `<${tagName} ${attrStr} data-note-custom-uuid="${uuid}">${child}</${tagName}>`;
    } else if (type === 'text') {
      return content;
    }
    throw new Error('解析类型错误');
  }
}

export const parse = new Parse();

export default Parse;
