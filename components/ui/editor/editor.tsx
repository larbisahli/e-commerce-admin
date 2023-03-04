import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import isEmpty from 'lodash/isEmpty';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';

const EditorComponent = (props) => {
  const [editorState, setEditorState] = useState(null);

  const onEditorStateChange: Function = (editorState) => {
    setEditorState(editorState);
    return props.onChange(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  };

  const stateIsEmpty = useMemo(() => isEmpty(editorState), [editorState]);

  useEffect(() => {
    const productDescription = props.value;
    const block = props.block;

    if (block) return;

    if (productDescription && stateIsEmpty) {
      const blocksFromHTML = convertFromHTML(productDescription);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      setEditorState(EditorState.createWithContent(state));
    } else if (stateIsEmpty) {
      setEditorState(EditorState.createEmpty());
    }
  }, [props.block, props.value, stateIsEmpty]);

  return (
    <div className={props.className}>
      <Editor
        onBlur={props?.onBlur}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        wrapperClassName="editor-wrapper-class"
        editorClassName="editor-class"
        toolbar={{
          options: [
            'inline',
            'blockType',
            'fontSize',
            'fontFamily',
            'list',
            'textAlign',
            'colorPicker',
            'emoji',
            'link',
            'history'
          ],
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: false }
        }}
      />
    </div>
  );
};

export default memo(EditorComponent);
