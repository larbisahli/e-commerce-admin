import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import classNames from 'classnames';
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
      const state = _convertFromHtml(productDescription);
      setEditorState(EditorState.createWithContent(state));
    } else if (stateIsEmpty) {
      setEditorState(EditorState.createEmpty());
    }
  }, [props.block, props.value, stateIsEmpty]);

  const _convertFromHtml = (content) => {
    const blocksFromHTML = convertFromHTML(content);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    return state;
  };

  const options = props.options ?? [
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
  ];

  return (
    <div className={props.className}>
      <Editor
        placeholder={props?.placeholder}
        onBlur={props?.onBlur}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        wrapperClassName="editor-wrapper-class"
        editorClassName={classNames('editor-class', props.editorClassName)}
        toolbar={{
          options,
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
