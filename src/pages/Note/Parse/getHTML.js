import FSM from './parser';
import { cloneDeep, isEmpty, get } from 'lodash';
import { unescape } from './tool';

const startStr = '<span data-custom-underline="true">';
const endStr = '</span>';

const getElementHTML = item => {
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
    const child = getAstToHTML(children);
    return `<${tagName} ${attrStr}>${child}</${tagName}>`;
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
  // TODO 数据合并

  const translateNodeList = [];

  list.forEach(item => {
    const { level, start, end } = item;
    let { text } = item;
    const node = level.reduce((ast, path) => {
      if (ast.isCustom) return ast;
      return get(ast, path) || get(ast.children, path) || ast;
    }, ast);

    let { type, content } = node;

    // 字符转义后路径对应问题
    content = unescape(content);

    if (type !== 'text' || !text || !text.trim()) return;

    const parentNode = node.parent;

    if (!parentNode) return;

    let cNode = node;
    if (!node.isCustom) {
      cNode = {
        attributes: [
          {
            name: 'data-custom-split',
            value: 'true',
          },
        ],
        isCustom: true,
        custom: {
          list: [item],
          node,
        },
        children: [],
        class: '_custom-underline',
        tagName: 'span',
        type: 'element',
      };
      translateNodeList.push(cNode);
    } else {
      cNode.custom.list.push(item);
    }

    const index = parentNode.children.findIndex(item => item === node);

    if (index !== -1) {
      parentNode.children.splice(index, 1, cNode);
    }
  });

  translateNodeList.forEach(item => {
    const { list, node } = item.custom;
    const content = unescape(node.content);
    const newContext = list
      .reduce((list, d) => {
        const { start, end, text } = d;
        const comparisonText = content.slice(start, end);
        if (comparisonText !== text) return list;
        // end: 103
        // level: (3) [0, 1, 0]
        // start: 27
        list.push({ type: 'start', i: start }, { type: 'end', i: end });
        return list;
      }, [])
      .sort((a, b) => b.i - a.i)
      .reduce((text, item) => {
        const { type, i } = item;
        const insertStr = type === 'start' ? startStr : endStr;
        return `${text.slice(0, i)}${insertStr}${text.slice(i)}`;
      }, content);

    console.log('newContext', newContext);

    item.children.push({
      content: newContext,
      type: 'text',
    });
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
