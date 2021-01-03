import React, { useState, useCallback, useRef } from 'react';

import htmlStr from './htmlString';
import htmlStr1 from './htmlString1';
import Parse from './Parse/index';
import styles from './index.less';
import { get } from 'lodash';

const handleGetLevel = (node, TopNode) => {
  const list = [];
  while (node !== TopNode) {
    const parent = node.parentNode;
    const children = parent.childNodes;
    for (let i = 0; i < children.length; i++) {
      if (node === children[i]) {
        list.push(i);
        break;
      }
    }
    node = parent;
  }
  return list.reverse();
};

const getAllContainerNodeLevel = ({ range, noteContainer }) => {
  const {
    collapsed,
    commonAncestorContainer,
    endContainer,
    endOffset,
    startContainer,
    startOffset,
  } = range;

  const topLevel = handleGetLevel(commonAncestorContainer, noteContainer);
  const isSameNode = startContainer === endContainer;
  let node = isSameNode
    ? commonAncestorContainer
    : commonAncestorContainer.childNodes[0];
  let isStart = false;
  let isEnd = false;
  let list = [];
  outer: while (node && !isEnd) {
    if (node === startContainer) {
      isStart = true;
    }

    if (node === endContainer) {
      isEnd = true;
    }
    console.log('node', node);

    // 所有分割文本上都多嵌套了一层 span ，添加自定义属性 data-custom-split
    // 文本节点木有获取属性
    const isCustom =
      node.getAttribute && node.getAttribute('data-custom-split');
    // 只标记文本节点
    if (isStart && node.nodeType === 3) {
      const level = handleGetLevel(node, commonAncestorContainer);

      let textStartOffset = 0;
      let textEndOffset = node.textContent.length;

      if (node === startContainer) {
        textStartOffset = startOffset;
      }

      if (node === endContainer) {
        textEndOffset = endOffset;
      }

      list.push({
        level: [...topLevel, ...level],
        start: textStartOffset,
        end: textEndOffset,
        text: node.textContent.slice(textStartOffset, textEndOffset),
      });
    } else if (isStart && isCustom) {
      // TODO 综合当前节点选中文本 ， 待完善
    }

    // 自定义节点为最底层的文本节点，无法在分割
    if (node.childNodes.length && !isCustom) {
      node = node.childNodes[0];
    } else if (node.nextSibling) {
      node = node.nextSibling;
    } else {
      do {
        node = node.parentNode;
        if (noteContainer === node) {
          break outer;
        }
      } while (!node.nextSibling);
      node = node.nextSibling;
    }
  }

  return list;
};

const translateAstNodes = ({ ast, list }) => {
  return list.map(item => {
    const { level, start, end, text } = item;

    const node = level.reduce((ast, path) => {
      return get(ast, path) || get(ast.children, path) || ast;
    }, ast);

    const { type, content } = node;

    if (type !== 'text') return;

    const parentNode = node.parent;

    if (!parentNode) return;

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
  // .filter(Boolean);
};

const Note = ({ temp }) => {
  const [state, setState] = useState(() => {
    return new Parse({ template: htmlStr || temp });
  });
  const [snapShoot, setSnapShoot] = useState(() => {
    return { __html: state.getHTML() };
  });
  const noteContainer = useRef();

  const handleMouseDown = useCallback(
    e => {
      if (!noteContainer.current) return;
      document.addEventListener(
        'mouseup',
        event => {
          const range = window.getSelection().getRangeAt(0);

          const { collapsed } = range;

          if (collapsed) return;

          const list = getAllContainerNodeLevel({
            range,
            noteContainer: noteContainer.current,
          });

          setSnapShoot({ __html: state.getHTML(list) });
          // debugger
          // translateAstNodes({ ast: state.ast, list });

          // setSnapShoot({ __html: state.getHTML() });
          // const findAst =

          // console.log(('list', list));
          // console.log(('findAst', findAst));
        },
        {
          once: true,
        },
      );
    },
    [noteContainer, state],
  );

  return (
    <div
      className={styles.note}
      ref={noteContainer}
      onMouseDown={handleMouseDown}
      dangerouslySetInnerHTML={snapShoot}
    ></div>
  );
};

export default Note;
