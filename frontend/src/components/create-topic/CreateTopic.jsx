/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import '../text-editor/TextEditor.css';
import './CreateTopic.css';
import cx from 'classnames';
import RangeSlider from '../topic_page/algo-frame/RangeSlider';
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
  const [title, setTitle] = useState(content);
  const [visualizer, setVisualizer] = useState(content);
  const [attribution, setAttribution] = useState(content);
  const [process, setProcess] = useState(content);
  const [links, setLinks] = useState(content);
  const [videos, setVideos] = useState(content);

  return (
    <div className="createtopic">
      <h3>Topic Page Creation: </h3>
      <br />
      <form className="topic-form">
        <h2>Algorithm Title</h2>
        <Editor
          toolbarClassName="editor-toolbar"
          wrapperClassName="editor-wrapper"
          editorClassName="editor-title"
          onChange={(e) => setTitle(e)}
        />
        <textarea
          className="json-display"
          value={JSON.stringify(title, null, 4)}
        />
        <br />
        <br />
        <h2>Embedded Visualizer or Video Source</h2>
        <Editor
          toolbarClassName="editor-toolbar"
          wrapperClassName="editor-wrapper"
          editorClassName="editor-title"
          onChange={(e) => setVisualizer(e)}
          toolbar={{
            options: ['embedded'],
            embedded: {
              className: undefined,
              component: undefined,
              popupClassName: undefined,
              embedCallback: undefined,
              defaultSize: {
                height: 'auto',
                width: 'auto',
              },
            },
          }}
        />
        <textarea
          className="json-display"
          value={JSON.stringify(visualizer, null, 4)}
        />
        <br />
        <br />
        <h2>Visualizer Attribution, Page Author, Date</h2>
        <h4>Write on separate lines</h4>
        <Editor
          toolbarClassName="editor-toolbar"
          wrapperClassName="editor-wrapper"
          editorClassName="editor-title"
          onChange={(e) => setAttribution(e)}
        />
        <textarea
          className="json-display"
          value={JSON.stringify(attribution, null, 4)}
        />
        <br />
        <br />
        <h2>Algorithm Steps, Process, Running Time/Space Complexity</h2>
        <h4>Please manually include section titles</h4>
        <Editor
          toolbarClassName="editor-toolbar"
          wrapperClassName="editor-wrapper"
          editorClassName="editor-title"
          onChange={(e) => setProcess(e)}
        />
        <textarea
          className="json-display"
          value={JSON.stringify(process, null, 4)}
        />
        <br />
        <br />
        <h2>Further References - Links</h2>
        <Editor
          toolbarClassName="editor-toolbar"
          wrapperClassName="editor-wrapper"
          editorClassName="editor-title"
          onChange={(e) => setLinks(e)}
        />
        <textarea
          className="json-display"
          value={JSON.stringify(links, null, 4)}
        />
        <br />
        <br />
        <h2>Further References - Videos</h2>
        <Editor
          toolbarClassName="editor-toolbar"
          wrapperClassName="editor-wrapper"
          editorClassName="editor-title"
          onChange={(e) => setVideos(e)}
          toolbar={{
            options: ['embedded'],
            embedded: {
              className: undefined,
              component: undefined,
              popupClassName: undefined,
              embedCallback: undefined,
              defaultSize: {
                height: 'auto',
                width: 'auto',
              },
            },
          }}
        />
        <textarea
          className="json-display"
          value={JSON.stringify(videos, null, 4)}
        />
        <br />
        <br />
        <button type="button">Create Topic</button>
        <br />
      </form>
      <br />
      <h1>Page Preview</h1>
      <br />
      <div className={cx(styles['container-style'], 'container-fluid')}>
        <div className="row justify-content-between">
          <div className="col col-sm-auto mt-3">
            <h1 className="ms-auto m-0 p-3 text-start">Algorithm Title</h1>
          </div>
          <div className="col col-sm-auto mt-3">
            <RangeSlider />
          </div>
        </div>
        <div className="row">
          <div className="bg-transparent">
            {/* TODO create algo component and logic */}
            <center> algo goes here</center>
          </div>
        </div>
      </div>
      <div className="detail text-center">
        <div className="top p-5">{JSON.stringify(process)}</div>
        <div className="container-fluid bot">
          <div className="row justify-content-around  mt-auto mt-sm-5   p-2">
            <div className="col-auto col-sm-auto align-self-center">
              <h3 className="m-3 mb-4">FUTURE REFERENCES</h3>
              <ul>
                <li>{JSON.stringify(links)}</li>
              </ul>
            </div>
            <div className="col-auto  text-center vid">
              <iframe
                className="rounded-4 "
                width="auto"
                height="auto"
                src={JSON.stringify(videos)}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
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
