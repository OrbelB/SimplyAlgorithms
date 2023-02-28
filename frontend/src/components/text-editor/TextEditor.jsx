import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw } from 'draft-js';
import './TextEditor.css';

const content = {
  blocks: [
    {
      key: '637gr',
      text: 'Initialized from content state.',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {},
};

export default function TextEditor() {
  const [contentState, setContentState] = useState(() =>
    convertFromRaw(content)
  );

  return (
    <div>
      <Editor
        toolbarClassName="editor-toolbar"
        wrapperClassName="editor-wrapper"
        editorClassName="editor-title"
        onChange={(e) => setContentState(convertFromRaw(e))}
      />
      <br />
      <textarea
        className="json-display"
        value={JSON.stringify(contentState, null, 4)}
      />
    </div>
  );
}

/* import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import './CreateTopic.css';

export default function CreateTopic() {
  return (
    <div className="editor-page">
      <h1>React Draft Wysiwyg Example</h1>
      <Editor
        wrapperClassName="wrapper-class"
        toolbarClassName="toolbar-class"
      />
    </div>
  );
} */

/* eslint-disable jsx-a11y/label-has-associated-control */
/* import { useState } from 'react';
import './CreateTopic.css';

export default function CreateTopic() {
  const [title, setTitle] = useState('');
  const [step1, setStep1] = useState('');
  const [step2, setStep2] = useState('');
  const [process, setProcess] = useState('');
  const [complexity, setComplexity] = useState('');
  const [references, setReferences] = useState('');
  const [embed, setEmbed] = useState('');
  return (
    <div className="createtopic">
      <h2>Topic Page Create: </h2>
      <form className="topic-form">
        <label>
          Title:
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>Step 1:</label>
        <textarea
          required
          value={step1}
          onChange={(e) => setStep1(e.target.value)}
        />
        <br />
        <label>Step 2:</label>
        <textarea
          required
          value={step2}
          onChange={(e) => setStep2(e.target.value)}
        />
        <br />
        <label>How Does The Algorithm Work?:</label>
        <textarea
          required
          value={process}
          onChange={(e) => setProcess(e.target.value)}
        />
        <br />
        <label>Running Time and Space Complexity:</label>
        <textarea
          required
          value={complexity}
          onChange={(e) => setComplexity(e.target.value)}
        />
        <br />
        <label>Further References:</label>
        <textarea
          required
          value={references}
          onChange={(e) => setReferences(e.target.value)}
        />
        <br />
        <label>
          Reference video:
          <input
            type="url"
            value={embed}
            onChange={(e) => setEmbed(e.target.value)}
          />
        </label>
        <br />
        <button type="button">Create Topic</button>
        <br />
      </form>
      <div className="detail text-center">
        <div className="top p-5">
          <h2>STEPS</h2>
          <ol className="list-group list-group-numbered">
            <li className="list-group-item border-0">{step1}</li>
            <li className="list-group-item border-0">{step2}</li>
          </ol>
        </div>
        <div className="mid rounded-5 ">
          <h2 className="mb-4">HOW DOES THE ALGORITHM WORKS?</h2>
          <p className="text-start">{process}</p>
        </div>
        <div className="container-fluid bot">
          <div className="row justify-content-center mb-4">
            <h2>RUNNING TIME AND SPACE COMPLEXITY</h2>
          </div>
          <div className="row justify-content-center text-start">
            <p className="text-start align-self-center">{complexity}</p>
          </div>
          <div className="row justify-content-around  mt-auto mt-sm-5   p-2">
            <div className="col-auto col-sm-auto align-self-center">
              <h3 className="m-3 mb-4">FUTURE REFERENCES</h3>
              <ul>
                <li>{references}</li>
              </ul>
            </div>
            <div className="col-auto  text-center vid">
              <iframe
                className="rounded-4 "
                width="auto"
                height="auto"
                src={embed}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} */
