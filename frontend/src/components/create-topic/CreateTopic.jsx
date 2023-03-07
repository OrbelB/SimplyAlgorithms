/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import draftToHtml from 'draftjs-to-html';
import parse from 'html-react-parser';
import cx from 'classnames';
import TextEditor from '../text-editor/TextEditor';
import '../text-editor/TextEditor.css';
import './CreateTopic.css';
import styles from '../topic_page/algo-frame/Frame.module.css';

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

const options = [
  'inline',
  'blockType',
  'fontSize',
  'fontFamily',
  'textAlign',
  'colorPicker',
  'link',
  'emoji',
  'image',
  'remove',
  'history',
];

export default function CreateTopic() {
  const [title, setTitle] = useState('');
  const [visualizer, setVisualizer] = useState();
  const [process, setProcess] = useState(JSON.stringify(content));
  const [snippets, setSnippets] = useState([{ language: '', code: '' }]);
  const [references, setReferences] = useState([{ name: '', reference: '' }]);

  const displayProcess = parse(draftToHtml(process));

  const handleReferenceChange = (index, event) => {
    const data = [...references];
    data[index][event.target.name] = event.target.value;
    setReferences(data);
  };

  const addReferences = () => {
    const newReference = { references: '' };
    setReferences([...references, newReference]);
  };

  const removeReferences = (index) => {
    const data = [...references];
    data.splice(index, 1);
    setReferences(data);
  };

  const handleSnippetChange = (index, event) => {
    const data = [...snippets];
    data[index][event.target.name] = event.target.value;
    setSnippets(data);
  };

  const addSnippets = () => {
    const newSnippet = { language: '', code: '' };
    setSnippets([...snippets, newSnippet]);
  };

  const removeSnippets = (index) => {
    const data = [...snippets];
    data.splice(index, 1);
    setSnippets(data);
  };

  return (
    <div className="createtopic">
      <br />
      <br />
      <h3>Topic Page Creation Form</h3>
      <h5>Instructions: Fill out the fields with the correct formats.</h5>
      <h5>Preview the topic page below before submitting.</h5>
      <br />
      <form className="topic-form">
        <h2>Algorithm Title</h2>
        <label>
          <input
            className="label"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <br />
        <h2>Embedded Visualizer or Video Source</h2>
        <label>
          <input
            className="label"
            type="url"
            value={visualizer}
            onChange={(e) => setVisualizer(e.target.value)}
          />
        </label>
        <br />
        <br />
        <h2>Algorithm Steps, Process, Running Time/Space Complexity</h2>
        <h5>Please manually include section titles</h5>

        <TextEditor
          toolbar="editor-toolbar"
          wrapper="editor-wrapper"
          editor="editor-title"
          value={content}
          editorOptions={options}
          setter={setProcess}
        />
        <br />
        <br />
        <h2>Further References - Links</h2>
        <h5>Source Title and Link</h5>
        <h5>Ex: GeeksforGeeks-QuickSort | https://www.geeksforgeeks.org/</h5>
        {references.map((input, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index}>
              <input
                className="label"
                name="name"
                placeholder="Title"
                value={input.name}
                onChange={(e) => handleReferenceChange(index, e)}
              />
              <input
                className="label"
                name="reference"
                placeholder="Link"
                value={input.reference}
                onChange={(e) => handleReferenceChange(index, e)}
              />
              <button
                type="button"
                className="form-button w-auto"
                onClick={() => removeReferences(index)}
              >
                Remove Reference
              </button>
            </div>
          );
        })}
        <br />
        <button
          type="button"
          className="form-button w-auto"
          onClick={addReferences}
        >
          Add Reference
        </button>
        <br />
        <br />
        <h2>Code Snippets</h2>
        <h5>Language and Code</h5>
        <h5>Ex: Java | public static void...</h5>
        {snippets.map((input, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index}>
              <input
                className="label"
                name="language"
                placeholder="Language"
                value={input.language}
                onChange={(e) => handleSnippetChange(index, e)}
              />
              <input
                className="label"
                name="code"
                placeholder="Code"
                value={input.code}
                onChange={(e) => handleSnippetChange(index, e)}
              />
              <button
                type="button"
                className="form-button w-auto"
                onClick={() => removeSnippets(index)}
              >
                Remove Snippet
              </button>
            </div>
          );
        })}
        <br />
        <button
          type="button"
          className="form-button w-auto"
          onClick={addSnippets}
        >
          Add Snippet
        </button>
        <br />
        <br />
        <button type="button" className="form-button w-auto">
          Create Topic
        </button>
        <br />
      </form>
      <br />
      <h1>New Topic Page Preview:</h1>
      <br />
      <br />
      <div className="Frame_algo_title__lDbbF">{title}</div>
      <div className={cx(styles['container-style'], 'container-fluid')}>
        <div className="row justify-content-between">
          <div className="col col-sm-auto mt-3" />
          <div className="row">
            <iframe
              id="viz_alg"
              src={visualizer}
              className="Frame_website__ZlBLM"
              loading="lazy"
              title="bubble sort algorithm visualizer by algorithm-visualizer.org"
            />
            <div className="bg-transparent" />
            <div className="Frame_credit__KSKRG">
              Algorithm visualizer brought to you by
              <a
                className=""
                href="https://algorithm-visualizer.org/"
                target="_blank"
                rel="noreferrer"
              >
                {' '}
                algorithm-visualizer.org
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="detail text-center">
        <div className="top p-5">{displayProcess}</div>
        <div className="container-fluid bot">
          <div className="row justify-content-around  mt-auto mt-sm-5   p-2">
            <div className="col-auto col-sm-auto align-self-center">
              <h3 className="m-3 mb-4">FURTHER REFERENCES</h3>
              {references.map((user) => {
                return (
                  <div key={user.index} className="user-card">
                    <h4>
                      <a href={user.reference} target="_blank" rel="noreferrer">
                        {user.name}
                      </a>
                    </h4>
                  </div>
                );
              })}
              <div />
              <div />
            </div>
          </div>
        </div>
        <div className="component">
          <h1>Implementations</h1>
          <div className="container">
            <nav className="bg-secondary rounded-top">
              <div className="nav nav-pills" id="nav-tab" role="tablist">
                {snippets.map((user) => {
                  return (
                    <button
                      key={user.language}
                      className="nav-link text-white active"
                      id="nav-java-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-java"
                      type="button"
                      role="tab"
                      aria-controls="nav-java"
                      aria-selected="false"
                    >
                      {user.language}
                    </button>
                  );
                })}
              </div>
            </nav>
            <div
              className="tab-content description rounded-bottom"
              id="nav-tabContent"
            >
              {snippets.map((user) => {
                return (
                  <div
                    key={user.code}
                    className="tab-pane fade show active"
                    id="nav-java"
                    role="tabpanel"
                    aria-labelledby="nav-java-tab"
                  >
                    <code>{user.code}</code>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bottom" />
        </div>
      </div>
    </div>
  );
}
