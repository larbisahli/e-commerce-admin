import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React, { memo, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';

const EditorComponent = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange: Function = (editorState) => {
    setEditorState(editorState);
    return props.onChange(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  };

  return (
    <div className={props.className}>
      <Editor
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
