/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import draftToHtml from 'draftjs-to-html';
import parse from 'html-react-parser';
import cx from 'classnames';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import TextEditor from '../text-editor/TextEditor';
import '../text-editor/TextEditor.css';
import './CreateTopic.css';
import styles from '../topic_page/algo-frame/Frame.module.css';
import { fetchWikiNames, createWiki, updateWiki } from '../../services/wiki';

const content = {
  blocks: [
    {
      key: '637gr',
      text: '',
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

function getIds(searchBar, names, prop, title) {
  return searchBar.pages
    .map((item) => {
      const matchingItems = names.filter((name) => name[title] === item.title);
      return matchingItems.length > 0
        ? matchingItems.map((name) => name[`${prop}Id`])[0]
        : undefined;
    })
    .filter((id) => id !== undefined);
}

export default function CreateTopic() {
  const [title, setTitle] = useState('');
  const [searchBar, setSearchBar] = useState({});
  const [pageOrWiki, setPageOrWiki] = useState('');
  const wikiName = useParams();
  const {
    nameAvailable: wikiNameAvailable,
    wikiNames,
    wiki,
  } = useSelector((state) => state.wiki);
  const dispatch = useDispatch();
  const { topicNames } = useSelector((state) => state.topic);
  const { jwtAccessToken } = useSelector((state) => state.auth);
  const [visualizer, setVisualizer] = useState();
  const [attribution, setAttribution] = useState();
  const [process, setProcess] = useState(JSON.stringify(content));
  const [snippets, setSnippets] = useState([{ language: '', code: '' }]);
  const [references, setReferences] = useState([{ name: '', reference: '' }]);

  const isReadyToSubmit =
    (wikiNameAvailable || wiki.wikiName) &&
    title !== '' &&
    Object.values(content).length > 0 &&
    searchBar?.pages?.length > 0;

  const handleSaveTopic = async (e) => {
    e.preventDefault();
    if (!isReadyToSubmit) return;

    let pageIds = [];
    let wikiIds = [];
    // get the page ids by the page names from the search bar
    if (pageOrWiki === 'page') {
      pageIds = getIds(searchBar, topicNames, 'page', 'title');
    } else if (pageOrWiki === 'wiki') {
      wikiIds = getIds(searchBar, wikiNames, 'wiki', 'wikiName');
    }

    const wikiToCreate = {
      wikiName: title,
      description: content,
      pageIds,
      wikiIds,
    };

    dispatch(createWiki({ wiki: wikiToCreate, jwtAccessToken }));
  };

  const handleUpdateTopic = async (e) => {
    e.preventDefault();
    if (!isReadyToSubmit) return;
    let pageIds = [];
    let wikiIds = [];
    // get the page ids by the page names from the search bar
    if (wiki.isParentChild === 'child') {
      let newPageNames = wiki.wikiTopicPages.map(({ topicPage }) => {
        return { title: topicPage.title, pageId: topicPage.pageId };
      });
      newPageNames = [...newPageNames, ...topicNames];
      pageIds = getIds(searchBar, newPageNames, 'page', 'title');
    } else if (wiki.isParentChild === 'parent') {
      let newWikiNames = wiki.wikiChildren.map(({ wikiChild }) => {
        return { wikiName: wikiChild.wikiName, wikiId: wikiChild.wikiId };
      });
      newWikiNames = [...newWikiNames, ...wikiNames];
      wikiIds = getIds(searchBar, newWikiNames, 'wiki', 'wikiName');
    }

    const wikiToUpdate = {
      wikiId: wiki.wikiId,
      wikiName: wiki.wikiName,
      description: content,
      pageIds,
      wikiIds,
    };

    dispatch(updateWiki({ wiki: wikiToUpdate, jwtAccessToken }));
  };

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
        <h5>Note: Once set, title cannot be changed</h5>
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
        <h2>Category Selection</h2>
        <h5>Note: Once set, category cannot be changed</h5>
        <div className="col-auto col-md-6 text-center">
          <Button
            variant="contained"
            disabled={wiki.isParentChild === 'child'}
            onClick={() => {
              setPageOrWiki('wiki');
              if (wiki?.links?.pages?.length === 0) {
                setSearchBar({
                  ...searchBar,
                  pages: [],
                });
              }

              if (wikiNames.length === 0) dispatch(fetchWikiNames());
            }}
          >
            Embed Wikis
          </Button>
        </div>
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
        <h2>Source Attribution</h2>
        <label>
          <input
            className="label"
            type="text"
            required
            value={attribution}
            onChange={(e) => setAttribution(e.target.value)}
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
              <textarea
                className="label2"
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
        <Button
          variant="contained"
          color="success"
          size="large"
          type="submit"
          disabled={!isReadyToSubmit}
          onClick={wikiName.wikiName ? handleUpdateTopic : handleSaveTopic}
        >
          Save
        </Button>
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
              title="algorithm visualizer"
            />
            <div className="bg-transparent" />
            <div className="Frame_credit__KSKRG">
              Algorithm visualizer brought to you by
              <a
                className=""
                href={attribution}
                target="_blank"
                rel="noreferrer"
              >
                {' '}
                {attribution}
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
              <div
                className="nav navbar-code nav-pills"
                id="nav-tab"
                role="tablist"
              >
                <button
                  key={snippets[0].language}
                  className="nav-link active text-white"
                  id={snippets[0].language}
                  data-bs-toggle="tab"
                  data-bs-target="#nav-java"
                  type="button"
                  role="tab"
                  aria-controls="nav-java"
                  aria-selected="true"
                >
                  {snippets[0].language}
                </button>
                {snippets.slice(1).map((user) => {
                  return (
                    <button
                      key={user.language}
                      className="nav-link text-white"
                      id={user.language}
                      data-bs-toggle="tab"
                      data-bs-target="#nav-java"
                      type="button"
                      role="tab"
                      aria-controls="nav-java"
                      aria-selected="true"
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
              <div
                key={snippets[0].code}
                className="tab-pane fade active show ws"
                id={snippets[0].code}
                role="tabpanel"
                aria-labelledby="nav-java-tab"
              >
                <code>{snippets[0].code}</code>
              </div>
              {snippets.slice(1).map((user) => {
                return (
                  <div
                    key={user.code}
                    className="tab-pane fade ws"
                    id={user.code}
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
