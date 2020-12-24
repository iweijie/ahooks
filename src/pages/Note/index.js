import React, { useState, useCallback, useRef } from 'react';

import htmlStr from './htmlString';
import htmlStr1 from './htmlString1';
import { parse } from './Parse/index';
import styles from './index.less';
console.time('getHTML');
const __html = { __html: parse.getHTML() };
console.timeEnd('getHTML');
console.log(parse.ast);
const __html1 = { __html: htmlStr1 };

const Note = () => {
  const [state, setState] = useState(__html);
  const [snapShoot, setSnapShoot] = useState(__html);
  const noteContainer = useRef();

  const handleMouseDown = useCallback(
    e => {
      if (!noteContainer.current) return;
      console.log(e);
      noteContainer.current.addEventListener(
        'mouseup',
        event => {
          const a = window.getSelection();
          console.log(a);
          console.log(window.getSelection().getRangeAt(0));
          console.log(window.getSelection().toString());
        },
        { once: true },
      );
    },
    [noteContainer],
  );

  return (
    <div>
      <button
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
        }}
        onClick={() => {
          setState(state => {
            if (state === __html) {
              return __html1;
            }
            return __html;
          });
        }}
      >
        按钮
      </button>
      <div
        className={styles.note}
        ref={noteContainer}
        onMouseDown={handleMouseDown}
        dangerouslySetInnerHTML={state}
      ></div>
    </div>
  );
};

export default Note;
