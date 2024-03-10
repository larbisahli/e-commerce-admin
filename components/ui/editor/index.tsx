import React, { memo } from 'react';

import EditorComponent from './editor';
// import EditorComponent from './editorjs';

interface EditorInputProps {
  control?: any;
  className?: string;
  placeholder?: string;
  name: string;
  [key: string]: unknown;
}

// https://lexical.dev/
// https://github.com/zenoamaro/react-quill
// https://blog.logrocket.com/best-text-editors-react/
// https://github.com/ianstormtaylor/slate good

const Editor = ({ className, ...rest }: EditorInputProps) => {
  return <EditorComponent {...rest} className={className} />;
};

export default memo(Editor);
