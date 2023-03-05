/* eslint-disable react/destructuring-assignment */
import { useMemo } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw, convertToRaw } from 'draft-js';
import './TextEditor.css';

export default function TextEditor(props) {
  const initialContentState = useMemo(() => {
    return convertFromRaw(props.value);
  }, [props.value]);

  // Convert the ContentState to a raw object
  // eslint-disable-next-line no-unused-vars
  const initialRawContentState = useMemo(() => {
    return convertToRaw(initialContentState);
  }, [initialContentState]);

  const handleEditorStateChange = (newEditorState) => {
    props.setter(newEditorState);
  };

  return (
    <Editor
      toolbarClassName={props.toolbar}
      wrapperClassName={props.wrapper}
      editorClassName={props.editor}
      initialContentState={initialRawContentState}
      onChange={handleEditorStateChange}
    />
  );
}

/* TIPS for props: 
toolbar, wrapper, and editor take in a string
editorOptions takes in an array of strings, ex: ['inline', 'blockType', 'fontSize', etc]
setter should be a useState function
*/
