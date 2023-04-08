import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, TextField, MenuItem, TextareaAutosize } from '@mui/material';
import debounce from 'lodash.debounce';
import { useNavigate, useParams } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';
import TextEditor from '../text-editor/TextEditor';
import '../text-editor/TextEditor.css';
import './CreateTopic.css';
import {
  getNameAvailability,
  createTopic,
  fetchSingleTopic,
  updateTopic,
} from '../../services/topic';
import { fetchWikiSubCategoriesNames } from '../../services/wiki';
import { topicActions } from '../../store/reducers/topic-slice';
import AlgoFrame from '../algo-frame/AlgoFrame';
import Detail from '../topic_page/detail/Detail';
import CodeSnippet from '../topic_page/code-snippet/CodeSnippet';

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

  const [title, setTitle] = useState('');
  const [visualizer, setVisualizer] = useState('');
  const [attribution, setAttribution] = useState('');
  const [process, setProcess] = useState(content);
  const [snippets, setSnippets] = useState([
    { languageTitle: '', codeText: '' },
  ]);
  const [references, setReferences] = useState([
    { title: '', externalResourceLink: '' },
  ]);
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [once, setOnce] = useState(true);
  const [wikiCategory, setWikiCategory] = useState('');

  const isReadyToSubmit =
    (topicNameAvailable || topic?.title || title !== '') &&
    Object.values(process).length > 0 &&
    visualizer !== '' &&
    attribution !== '' &&
    wikiCategory !== '';

  // reset the state of the page in the event of the topic name been part of the url
  useEffect(() => {
    console.count('useEffect resetState');
    if (topicName.topicName === undefined || topicName.topicName === 'new') {
      setVisualizer('');
      setAttribution('');
      setProcess(content);
      setWikiCategory('');
      setTitle('');
      setSnippets([{ languageTitle: '', codeText: '' }]);
      setReferences([{ title: '', externalResourceLink: '' }]);
    }
  }, [topicName.topicName]);

  // used to fetch the topic data in the event of the topic name been part of the url
  // for editing purposes
  useEffect(() => {
    console.count('useEffect fetchSingleTopic');
    if (
      topicStatus === 'idle' &&
      Object.keys(topic).length === 0 &&
      topicName?.topicName
    ) {
      dispatch(fetchSingleTopic(topicName.topicName));
    }
  }, [dispatch, topic, topicName.topicName, topicStatus]);

  // used to set the state of the current edit page to the topic data
  // that is being edited in the event of the topic name been part of the url
  useEffect(() => {
    console.count('useEffect setTopicData reset');
    if (
      topicStatus === 'success' &&
      (topic?.codeSnippets?.length > 0 ||
        topic?.topicExternalResources?.length > 0) &&
      topic?.pageDescription &&
      once
    ) {
      setOnce(false);
      setSnippets(topic.codeSnippets);
      setReferences(topic.topicExternalResources);
      setWikiCategory(topic.urlPath.split('/')[0] ?? '');
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
    console.count('useEffect setTopicData');
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

  const handleTitleChange = debounce((e) => {
    setTitle(e.target.value);
    dispatch(getNameAvailability({ name: e.target.value, jwtAccessToken }));
  }, 900);

  const handleSaveTopic = async (e) => {
    e.preventDefault();
    console.info('handleSaveTopic');
    if (!isReadyToSubmit) return;
    const wikiInfo = wikiNames.find((wiki) => wiki.wikiName === wikiCategory);
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

  console.count('outstide handleUpdateTopic');
  const handleUpdateTopic = async (e) => {
    e.preventDefault();
    console.info('handleSaveTopic');
    if (!isReadyToSubmit) return;

    const wikiInfo = wikiNames.find((wiki) => wiki.wikiName === wikiCategory);
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

  // const displayProcess = parse(draftToHtml(process));

  const handleReferenceChange = (index, event) => {
    console.info('index', index);
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
    helperText = `You cannot change the title of your topic page when updating it, the title is ${topic.title}`;
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
      <h2 className="text-center mb-5 pt">TOPIC PAGE CREATION FORM</h2>
      <h5 className="fi">
        Instructions: Fill out the fields with the correct formats.
      </h5>
      <h5 className="fi">Preview the topic page below before submitting.</h5>
      <br />
      <br />
      <form className="topic-form g-2">
        <h2 className="ft">1- ALGORITHM TITLE</h2>
        <h5 className="fi">Note: Once set, title cannot be changed</h5>
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
        <br />
        <h2 className="ft">2- CATEGORY SELECTION</h2>
        <h5 className="fi">Note: Once set, category cannot be changed</h5>
        <div className="col-auto col-md-6 text-center mb-5">
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
            <TextField
              select
              fullWidth
              variant="outlined"
              sx={{ fontSize: '1.5rem' }}
              helperText="Please select the wiki category"
              value={wikiCategory}
              onChange={(e) => setWikiCategory(e.target.value)}
            >
              {wikiNames.map((wiki) => (
                <MenuItem key={wiki.wikiId} value={wiki.wikiName}>
                  {wiki.wikiName}
                </MenuItem>
              ))}
            </TextField>
          </div>
        )}
        <br />
        <br />
        <br />
        <h2 className="ft">3- VISUALIZER OR VIDEO SOURCE</h2>
        <h5 className="fi">
          Note: If embedding YouTube videos, please use specific embed link or
          the video will not display
        </h5>
        <h5 className="fi">
          From video page, click on &quot;Share&ldquo; and then on
          &quot;Embed&ldquo;. Copy the link from &quot;src&ldquo; in the given
          HTML code.
        </h5>
        <br />
        <label htmlFor="vis-input">
          <input
            id="vis-input"
            className="label-topic"
            type="url"
            value={visualizer}
            onChange={(e) => setVisualizer(e.target.value)}
          />
        </label>
        <br />
        <br />
        <h2 className="ft">4- SOURCE ATTRIBUTION</h2>
        <label htmlFor="vis-source">
          <input
            id="vis-source"
            className="label-topic"
            type="text"
            required
            value={attribution}
            onChange={(e) => setAttribution(e.target.value)}
          />
        </label>
        <br />
        <br />
        <br />
        <h2 className="ft">
          5- ALGO STEPS/PROCESS/RUNNING TIME/SPACE COMPLEXITY
        </h2>
        <h5 className="fi">Please manually include section titles</h5>
        <div className="form-group m-3 col-10">
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
        <br />
        <h2 className="ft">6- FURTHER REFERENCES: LINKS</h2>
        <h5 className="fi">Source Title and Link</h5>
        <h5 className="fi mb-4">
          Ex: GeeksforGeeks-QuickSort | https://www.geeksforgeeks.org/
        </h5>
        {references.map((input, index) => {
          return (
            <div key={nanoid} className="mb-4">
              <div className="row mb-4">
                <input
                  className="label-topic"
                  name="title"
                  placeholder="Title"
                  value={input?.title}
                  onChange={(e) => handleReferenceChange(index, e)}
                />
              </div>
              <div className="row mb-4">
                <input
                  className=" label-topic"
                  name="externalResourceLink"
                  placeholder="Link"
                  value={input?.externalResourceLink}
                  onChange={(e) => handleReferenceChange(index, e)}
                />
              </div>
              <div className="row justify-content-center">
                <button
                  type="button"
                  className="form-button w-auto p-1"
                  onClick={() => removeReferences(index)}
                >
                  REMOVE REFERENCE
                </button>
              </div>
            </div>
          );
        })}

        <br />
        <button
          type="button"
          className="form-button w-auto"
          onClick={addReferences}
        >
          ADD REFERENCE
        </button>
        <br />
        <br />
        <br />
        <h2 className="ft">7- CODE SNIPPETS</h2>
        <h5 className="fi">Language and Code</h5>
        <h5 className="fi">Ex: Java | public static void...</h5>
        {snippets.map((input, index) => {
          return (
            <div key={nanoid}>
              <div className="row mb-4">
                <input
                  className="label-topic"
                  name="languageTitle"
                  placeholder="Language"
                  value={input?.languageTitle}
                  onChange={(e) => handleSnippetChange(index, e)}
                />
              </div>
              <div className="row mb-4">
                <TextareaAutosize
                  minRows={5}
                  className="label2"
                  name="codeText"
                  placeholder="Enter code"
                  value={input?.codeText}
                  onChange={(e) => handleSnippetChange(index, e)}
                />
              </div>
              <div className="row mb-4 justify-content-center">
                <button
                  type="button"
                  className="form-button w-auto"
                  onClick={() => removeSnippets(index)}
                >
                  REMOVE SNIPPET
                </button>
              </div>
            </div>
          );
        })}
        <br />
        <button
          type="button"
          className="form-button w-auto"
          onClick={addSnippets}
        >
          ADD SNIPPET
        </button>
        <br />
        <br />
        <br />
        <Button
          sx={{ padding: '1rem', width: '200px' }}
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
      <AlgoFrame vizTitle={title} vizUrl={visualizer} vizSource={attribution} />
      <Detail pageDescription={process} references={references} />
      <CodeSnippet
        snippets={snippets}
        setSnippetIndex={setSnippetIndex}
        snippetIndex={snippetIndex}
      />
    </div>
  );
}
