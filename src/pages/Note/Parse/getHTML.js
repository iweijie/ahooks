import FSM from './parser';
import { cloneDeep, isEmpty, get } from 'lodash';
import { unescape } from './tool';

const getElementHTML = item => {
  const {
    type,
    uuid,
    tagName,
    content = '',
    parent,
    attributes,
    children,
    customSplitAttr,
  } = item;
  if (type === 'element') {
    const attrStr = attributes
      .map(attr => {
        const { value, name } = attr;
        return value ? `${name}="${value}"` : name;
      })
      .join(' ');
    const child = getAstToHTML(children);
    const customSplit = customSplitAttr ? 'data-custom-split="true"' : '';
    return `<${tagName} ${attrStr} ${customSplit}>${child}</${tagName}>`;
  } else if (type === 'text') {
    return content;
  }
  throw new Error('解析类型错误');
};

const getAstToHTML = ast => {
  if (isEmpty(ast)) return '';
  return ast
    .map(item => {
      return getElementHTML(item);
    })
    .join('');
};

const translateAstNodes = ({ ast, list = [] }) => {
  return list.map(item => {
    const { level, start, end } = item;
    let { text } = item;
    const node = level.reduce((ast, path) => {
      return get(ast, path) || get(ast.children, path) || ast;
    }, ast);

    let { type, content } = node;

    // 字符转义后路径对应问题
    content = unescape(content);

    if (type !== 'text' || !text || !text.trim()) return;

    const parentNode = node.parent;

    if (!parentNode) return;

    if (!parentNode.customSplitAttr) {
      parentNode.customSplitAttr = true;
    }

    const [s, e] = content.split(text);

    const newChildren = [];

    if (s) {
      newChildren.push({ type, content: s });
    }

    const cNode = {
      attributes: [
        {
          name: 'data-custom-underline',
          value: 'true',
        },
      ],
      children: [],
      class: '_custom-underline',
      tagName: 'span',
      type: 'element',
    };
    cNode.children.push({
      content: text,
      type: 'text',
    });

    newChildren.push(cNode);

    if (e) {
      newChildren.push({ type, content: e });
    }

    const index = parentNode.children.findIndex(item => item === node);

    if (index !== -1) {
      parentNode.children.splice(index, 1, ...newChildren);
    }
  });
};

// 笔记与ast 的融和
const getFormatAst = (ast, list) => {
  // const ast = JSON.parse(JSON.stringify(this.ast))
  // TODO 将笔记插入到ast中

  translateAstNodes({ ast, list });
  return ast;
};

const getHTML = (ast, list) => {
  console.time('_getFormatAst');
  ast = getFormatAst(ast, list);
  console.timeEnd('_getFormatAst');
  return getAstToHTML(ast);
};

export default getHTML;
