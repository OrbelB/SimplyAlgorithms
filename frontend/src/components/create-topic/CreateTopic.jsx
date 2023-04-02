/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import draftToHtml from 'draftjs-to-html';
import parse from 'html-react-parser';
import cx from 'classnames';
import { Button, TextField } from '@mui/material';
import debounce from 'lodash.debounce';
import { useNavigate, useParams } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';
import TextEditor from '../text-editor/TextEditor';
import '../text-editor/TextEditor.css';
import './CreateTopic.css';
import styles from '../topic_page/algo-frame/Frame.module.css';
import {
  getNameAvailability,
  createTopic,
  fetchSingleTopic,
  updateTopic,
} from '../../services/topic';
import { fetchWikiSubCategoriesNames } from '../../services/wiki';
import TransferList from '../transferlist';
import { topicActions } from '../../store/reducers/topic-slice';

const content = {
  blocks: [
    {
      key: '637gr',
      text: '',
      type: '',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {},
};

// const options = [
//   'inline',
//   'blockType',
//   'fontSize',
//   'fontFamily',
//   'textAlign',
//   'colorPicker',
//   'link',
//   'emoji',
//   'image',
//   'remove',
//   'history',
// ];

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
  const topicName = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    nameAvailable: topicNameAvailable,
    topic,
    urlPath,
    status: topicStatus,
  } = useSelector((state) => state.topic);
  const { wikiNames } = useSelector((state) => state.wiki);
  const { jwtAccessToken, userId } = useSelector((state) => state.auth);

  const [title, setTitle] = useState(() => topic?.title ?? '');
  const [searchBar, setSearchBar] = useState(() =>
    topic.urlPath ? { pages: [{ title: topic.urlPath.split('/')[0] }] } : {}
  );
  const [pages, setPages] = useState(() =>
    topic.urlPath ? Array.from(topic.urlPath.split('/')[0]) : []
  );
  const [visualizer, setVisualizer] = useState(() => topic.visualizer ?? '');
  const [attribution, setAttribution] = useState(() => topic.source ?? '');
  const [process, setProcess] = useState(
    () => topic?.pageDescription ?? content
  );
  const [snippets, setSnippets] = useState(
    () => topic.codeSnippets ?? [{ languageTitle: '', codeText: '' }]
  );
  const [references, setReferences] = useState(
    () =>
      topic?.topicExternalResources ?? [{ title: '', externalResourceLink: '' }]
  );
  const [snippetIndex, setSnippetIndex] = useState(0);

  const [once, setOnce] = useState(true);

  const isReadyToSubmit =
    (topicNameAvailable || topic?.title || title !== '') &&
    Object.values(process).length > 0 &&
    visualizer !== '' &&
    attribution !== '' &&
    searchBar?.pages?.length > 0;

  // used to fetch the topic data in the event of the topic name been part of the url
  // for editing purposes
  useEffect(() => {
    if (
      topicStatus === 'idle' &&
      Object.keys(topic).length === 0 &&
      topicName?.topicName
    ) {
      dispatch(fetchSingleTopic(topicName.topicName));
    }
  }, [dispatch, topic, topicName.topicName, topicStatus]);

  // used to set the state of the this current edit page to the topic data
  // that is being edited in the event of the topic name been part of the url
  useEffect(() => {
    if (
      topicStatus === 'success' &&
      (topic?.codeSnippets?.length > 0 ||
        topic?.topicExternalResources?.length > 0) &&
      topic?.pageDescription &&
      once
    ) {
      setOnce(false);
      setPages(Array.from([topic.urlPath.split('/')[0]]));
      setSnippets(topic.codeSnippets);
      setReferences(topic.topicExternalResources);
      setSearchBar({
        pages: [
          {
            link: topic.urlPath.split('/')[0],
            title: topic.urlPath.split('/')[0],
          },
        ],
      });
      setTitle(topic.title);
      setVisualizer(topic.visualizer);
      setAttribution(topic.source);
      setProcess(topic.pageDescription);
    }
  }, [
    topicStatus,
    once,
    topic.codeSnippets,
    topic.pageDescription,
    topic.topicExternalResources,
    topic.urlPath,
    topic.title,
    topic.visualizer,
    topic.source,
  ]);

  // checks if the urlPath is not null and not empty and if the topicStatus is success
  // if so, it means that the topic has been created or updated, therefore the user is redirected
  useEffect(() => {
    if (urlPath !== null && urlPath !== '' && topicStatus === 'success') {
      const currentUrl = urlPath;
      dispatch(topicActions.resetData());
      navigate(
        currentUrl !== null
          ? `/wiki/${currentUrl}`
          : `/topic/${topicName?.topicName}`
      );
    }
  }, [dispatch, navigate, topicName, topicStatus, urlPath]);

  const handlePageSetup = (currPages) => {
    // remove the previous element and replace it for the new one
    const newPage = currPages.filter((page) => !pages.includes(page));
    // remove the previous element and replace it for the new one
    const updatedSearchBar = {
      ...searchBar,
      pages: newPage.map((page) => {
        return { link: page, title: page };
      }),
    };
    setSearchBar(updatedSearchBar);
    setPages(newPage);
  };

  const handleTitleChange = debounce((e) => {
    setTitle(e.target.value);
    dispatch(getNameAvailability({ name: e.target.value, jwtAccessToken }));
  }, 900);

  const handleSaveTopic = async (e) => {
    e.preventDefault();
    if (!isReadyToSubmit) return;
    let wikiIds = [];
    // get the page ids by the page names from the search bar
    wikiIds = getIds(searchBar, wikiNames, 'wiki', 'wikiName');
    const wikiInfo = wikiNames.find((wiki) => wiki.wikiId === wikiIds[0]);
    const topicToCreate = {
      userId,
      title,
      visualizer,
      source: attribution,
      pageDescription: process,
      wikiInfo,
      codeSnippets: snippets,
      externalResources: references,
    };

    try {
      await dispatch(
        createTopic({ topic: topicToCreate, jwtAccessToken })
      ).unwrap();
    } finally {
      if (topicStatus === 'success' && urlPath !== null && urlPath !== '') {
        navigate(`/wiki/${urlPath}`);
      }
    }
  };

  const handleUpdateTopic = async (e) => {
    e.preventDefault();

    if (!isReadyToSubmit) return;
    let wikiIds = {};

    // get the page ids by the page names from the search bar
    wikiIds = getIds(searchBar, wikiNames, 'wiki', 'wikiName');
    const wikiInfo = wikiNames.find((wiki) => wiki.wikiId === wikiIds[0]);
    const topicToUpdate = {
      pageId: topic.pageId,
      userId,
      title,
      visualizer,
      source: attribution,
      pageDescription: process,
      wikiInfo: wikiInfo ?? topic.wikiInfo,
      codeSnippets: snippets,
      externalResources: references,
    };

    dispatch(updateTopic({ updatedTopic: topicToUpdate, jwtAccessToken }));
  };

  const displayProcess = parse(draftToHtml(process));

  const handleReferenceChange = (index, event) => {
    const data = [...references];
    data[index][event.target.name] = event.target.value;
    setReferences(data);
  };

  const addReferences = () => {
    const newReference = { title: '', externalResourceLink: '' };
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
    const newSnippet = { languageTitle: '', codeText: '' };
    setSnippets([...snippets, newSnippet]);
  };

  const removeSnippets = (index) => {
    const data = [...snippets];
    data.splice(index, 1);
    setSnippets(data);
  };

  let helperText;

  if (Object.keys(topicName).length !== 0 && !topicNameAvailable) {
    helperText = `You cannot change the title of your wiki when updating it, the title is ${topic.title}`;
  } else if (
    topicNameAvailable === false &&
    Object.keys(topicName).length === 0
  ) {
    helperText = 'Name is taken choose another one';
  } else {
    helperText = 'Enter a title for your topic page';
  }

  const handleTextEditorChange = (e) => {
    setProcess(e);
  };

  return (
    <div className="createtopic">
      <br />
      <h2 className="text-center mb-5">Topic Page Creation Form</h2>
      <h5>Instructions: Fill out the fields with the correct formats.</h5>
      <h5>Preview the topic page below before submitting.</h5>
      <br />
      <form className="topic-form">
        <h2>Algorithm Title</h2>
        <h5>Note: Once set, title cannot be changed</h5>
        <TextField
          disabled={topicName?.topicName !== undefined}
          error={topicNameAvailable !== null && !topicNameAvailable}
          id="outlined-basic"
          onChange={handleTitleChange}
          label="Title"
          className="w-50"
          variant="outlined"
          margin="dense"
          required
          helperText={helperText}
        />
        <br />
        <br />
        <h2>Category Selection</h2>
        <h5>Note: Once set, category cannot be changed</h5>
        <div className="col-auto col-md-6 text-center">
          <Button
            variant="contained"
            onClick={() => {
              if (wikiNames.length === 0)
                dispatch(fetchWikiSubCategoriesNames());
            }}
          >
            Embed Wikis
          </Button>
        </div>
        {wikiNames.length > 0 && (
          <div className="col-auto col-md-6 text-center">
            <TransferList
              disabledDouble
              itemsToChooseFrom={wikiNames
                .map((currWiki) => {
                  if (topic?.urlPath?.split('/')[0] !== currWiki.wikiName) {
                    return currWiki.wikiName;
                  }
                  return undefined;
                })
                .filter((curr) => curr !== undefined)}
              itemsChosen={pages}
              setItemsChosen={handlePageSetup}
            />
          </div>
        )}
        <br />
        <br />
        <h2>Embedded Visualizer or Video Source</h2>
        <h5>
          Note: If embedding YouTube videos, please use specific embed link or
          the video will not display
        </h5>
        <h5>
          From video page, click on "Share" and then on "Embed". Copy the link
          from "src" in the given HTML code.
        </h5>
        <br />
        <label htmlFor="vis-input">
          <input
            id="vis-input"
            className="label"
            type="url"
            value={visualizer}
            onChange={(e) => setVisualizer(e.target.value)}
          />
        </label>
        <br />
        <br />
        <h2>Source Attribution</h2>
        <label htmlFor="vis-source">
          <input
            id="vis-source"
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
        <div className="form-group m-3">
          <TextEditor
            key={topic?.title}
            className="form-control"
            toolbar="editor-toolbar"
            wrapper="editor-wrapper"
            editor="editor-title"
            value={topic.pageDescription ?? process}
            setter={handleTextEditorChange}
          />
        </div>
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
                name="title"
                placeholder="Title"
                value={input.title}
                onChange={(e) => handleReferenceChange(index, e)}
              />
              <input
                className="label"
                name="externalResourceLink"
                placeholder="Link"
                value={input.externalResourceLink}
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
                name="languageTitle"
                placeholder="Language"
                value={input?.languageTitle}
                onChange={(e) => handleSnippetChange(index, e)}
              />
              <textarea
                className="label2"
                name="codeText"
                placeholder="code"
                value={input?.codeText}
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
          disabled={!isReadyToSubmit && topicStatus === 'pending'}
          onClick={topicName.topicName ? handleUpdateTopic : handleSaveTopic}
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
                  <div key={nanoid()} className="user-card">
                    <h4>
                      <a
                        href={user?.externalResourceLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {user?.title}
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
              {snippets.length > 0 && (
                <div
                  key={nanoid()}
                  className="nav navbar-code nav-pills"
                  id="nav-tab"
                  role="tablist"
                >
                  {snippets[snippetIndex]?.languageTitle !== '' &&
                    snippets?.map(({ languageTitle }, index) => {
                      return (
                        <button
                          key={nanoid()}
                          className={`nav-link ${
                            snippetIndex === index ? 'active' : ''
                          } text-white`}
                          id={languageTitle}
                          onClick={() => {
                            setSnippetIndex(index);
                          }}
                          data-bs-toggle="tab"
                          data-bs-target="#nav-java"
                          type="button"
                          role="tab"
                          aria-controls="nav-java"
                          aria-selected="true"
                        >
                          {languageTitle}
                        </button>
                      );
                    })}
                </div>
              )}
            </nav>
            <div
              className="tab-content description rounded-bottom"
              id="nav-tabContent"
            >
              {snippets[snippetIndex]?.codeText !== '' && (
                <div
                  key={snippets[snippetIndex]?.codeText}
                  className="tab-pane fade active show ws"
                  id={snippets[snippetIndex]?.codeText}
                  role="tabpanel"
                  aria-labelledby="nav-java-tab"
                >
                  <code>{snippets[snippetIndex]?.codeText}</code>
                </div>
              )}
            </div>
          </div>
          <div className="bottom" />
        </div>
      </div>
    </div>
  );
}
