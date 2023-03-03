/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import './TextEditor.css';

export default function TextEditor(props) {
  return (
    <Editor
      toolbarClassName={props.toolbar}
      wrapperClassName={props.wrapper}
      editorClassName={props.editor}
      toolbar={{ options: props.editorOptions }}
      onChange={(e) => props.setter(e)}
    />
  );
}

/* TIPS for props: 
toolbar, wrapper, and editor take in a string
editorOptions takes in an array of strings, ex: ['inline', 'blockType', 'fontSize', etc]
setter should be a useState function
*/
