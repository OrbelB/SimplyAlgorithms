/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import {} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import '../text-editor/TextEditor.css';
import './CreateTopic.css';
import cx from 'classnames';
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

export default function CreateTopic() {
  const [title, setTitle] = useState('');
  const [visualizer, setVisualizer] = useState();
  const [process, setProcess] = useState(JSON.stringify(content));
  const [snippets, setSnippets] = useState([{ language: '', code: '' }]);
  const [references, setReferences] = useState([{ references: '' }]);

  const handleSnippetChange = (index, event) => {
    const data = [...snippets];
    data[index][event.target.name] = event.target.value;
    setSnippets(data);
  };

  const addFields = () => {
    const newSnippet = { language: '', code: '' };
    setSnippets([...snippets, newSnippet]);
  };

  const handleReferenceChange = (index, event) => {
    const data = [...references];
    data[index] = event.target.value;
    setReferences(data);
  };

  const addReferences = () => {
    const newReference = { references: '' };
    setReferences([...references, newReference]);
  };

  return (
    <div className="createtopic">
      <h3>Topic Page Creation Form</h3>
      <h5>Instructions: Fill out the fields with the correct formats.</h5>
      <h5>Preview the topic page below</h5>
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
        <h4>Please manually include section titles</h4>
        <Editor
          toolbarClassName="editor-toolbar"
          wrapperClassName="editor-wrapper"
          editorClassName="editor-title"
          onChange={(e) => setProcess(e)}
          toolbar={{
            options: [
              'inline',
              'blockType',
              'fontSize',
              'fontFamily',
              'list',
              'textAlign',
              'colorPicker',
              'link',
              'emoji',
              'image',
              'remove',
              'history',
            ],
          }}
        />
        <br />
        <br />
        <h2>Further References - Links</h2>
        {references.map((input, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index}>
              <input
                className="label"
                name="reference"
                value={input.references}
                onChange={(e) => handleReferenceChange(index, e)}
              />
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
        <h2>Code Snippets</h2>
        {snippets.map((input, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index}>
              <input
                className="label"
                name="language"
                value={input.language}
                onChange={(e) => handleSnippetChange(index, e)}
              />
              <input
                className="label"
                name="code"
                value={input.code}
                onChange={(e) => handleSnippetChange(index, e)}
              />
            </div>
          );
        })}
        <br />
        <button
          type="button"
          className="form-button w-auto"
          onClick={addFields}
        >
          Add More
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
        <div className="top p-5">{draftToHtml(process)}</div>
        <div className="container-fluid bot">
          <div className="row justify-content-around  mt-auto mt-sm-5   p-2">
            <div className="col-auto col-sm-auto align-self-center">
              <h3 className="m-3 mb-4">FUTURE REFERENCES</h3>
            </div>
          </div>
        </div>
        <div className="component">
          <h1>Implementations</h1>
          <div className="container">
            <nav className="bg-secondary rounded-top">
              <div className="nav nav-pills" id="nav-tab" role="tablist">
                <button
                  className="nav-link text-white active"
                  id="nav-java-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-java"
                  type="button"
                  role="tab"
                  aria-controls="nav-java"
                  aria-selected="true"
                >
                  Java
                </button>
                <button
                  className="nav-link text-white"
                  id="nav-js-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-js"
                  type="button"
                  role="tab"
                  aria-controls="nav-js"
                  aria-selected="false"
                >
                  JS
                </button>
                <button
                  className="nav-link text-white"
                  id="nav-c-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-c"
                  type="button"
                  role="tab"
                  aria-controls="nav-c"
                  aria-selected="false"
                >
                  C
                </button>
                <button
                  className="nav-link text-white "
                  id="nav-cplusplus-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-cplusplus"
                  type="button"
                  role="tab"
                  aria-controls="nav-cplusplus"
                  aria-selected="false"
                >
                  C++
                </button>
                <button
                  className="nav-link text-white"
                  id="nav-python-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-python"
                  type="button"
                  role="tab"
                  aria-controls="nav-python"
                  aria-selected="false"
                >
                  Python
                </button>
              </div>
            </nav>
            <div
              className="tab-content description rounded-bottom"
              id="nav-tabContent"
            >
              <div
                className="tab-pane fade show active"
                id="nav-java"
                role="tabpanel"
                aria-labelledby="nav-java-tab"
              >
                <code>Words</code>
              </div>
              <div
                className="tab-pane fade"
                id="nav-js"
                role="tabpanel"
                aria-labelledby="nav-js-tab"
              >
                <code>Words</code>
              </div>
              <div
                className="tab-pane fade"
                id="nav-c"
                role="tabpanel"
                aria-labelledby="nav-c-tab"
              >
                <code>Words</code>
              </div>
              <div
                className="tab-pane fade"
                id="nav-cplusplus"
                role="tabpanel"
                aria-labelledby="nav-cplusplus-tab"
              >
                <code>Words</code>
              </div>
              <div
                className="tab-pane fade"
                id="nav-python"
                role="tabpanel"
                aria-labelledby="nav-python-tab"
              >
                <code>Words</code>
              </div>
            </div>
          </div>
          <div className="bottom" />
        </div>
      </div>
    </div>
  );
}
