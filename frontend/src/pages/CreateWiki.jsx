import { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import parse from 'html-react-parser';
import '../components/create-topic/CreateTopic.css';
import draftToHtml from 'draftjs-to-html';
import { Button, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import TextEditor from '../components/text-editor/TextEditor';
import WikiHome from '../components/wiki/WikiHome';
import Aside from '../components/wiki/Aside';
import TransferList from '../components/transferlist';
import { fetchTopicNames } from '../services/topic';
import {
  fetchWikiNames,
  getNameAvailability,
  createWiki,
  fetchSingleWiki,
  updateWiki,
  fetchWikiLinks,
  fetchSubCategories,
} from '../services/wiki';
import AlertSnackBar from '../components/alert-messages-snackbar/AlertSnackBar';
import { wikiActions } from '../store/reducers/wiki-slice';

const initialContent = {
  blocks: [
    {
      key: '2d4ek',
      data: {
        'text-align': 'center',
      },
      text: '',
      type: 'unstyled',
      depth: 0,
      entityRanges: [],
      inlineStyleRanges: [],
    },
  ],
  entityMap: {},
};

function getIds(searchBar, names, prop, title) {
  return searchBar?.pages
    ?.map((item) => {
      const matchingItems = names.filter((name) => name[title] === item.title);
      return matchingItems.length > 0
        ? matchingItems.map((name) => name[`${prop}Id`])[0]
        : undefined;
    })
    .filter((id) => id !== undefined);
}

export default function CreateWiki() {
  const wikiName = useParams();
  const {
    nameAvailable: wikiNameAvailable,
    wikiNames,
    wikiId: createdWikiId,
    status: wikiStatus,
    wiki,
  } = useSelector((state) => state.wiki);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  const { jwtAccessToken } = useSelector((state) => state.auth);
  const { topicNames } = useSelector((state) => state.topic);
  const [pageOrWiki, setPageOrWiki] = useState('');

  const [once, setOnce] = useState(true);
  const [content, setContent] = useState(
    () => wiki?.description ?? initialContent
  );
  const [pages, setPages] = useState([]);
  const [searchBar, setSearchBar] = useState({});
  useEffect(() => {
    if (
      Object.keys(wiki).length === 0 &&
      wikiStatus === 'idle' &&
      Object.keys(wikiName).length !== 0
    ) {
      dispatch(fetchSingleWiki(wikiName.wikiName));
    }

    if (wikiName.wikiName && (wiki.description || wiki.links) && once) {
      setContent(wiki.description ?? initialContent);
      setPages(wiki.links.pages.map((page) => page.title));
      setSearchBar(wiki.links);
      setTitle(wiki.title);
      setOnce(false);
    }

    if (createdWikiId) {
      navigate(`/wiki/${createdWikiId}`, { replace: true });
      dispatch(wikiActions.resetData());
      dispatch(fetchWikiLinks());
      dispatch(fetchSubCategories());
    }
  }, [
    content.blocks,
    createdWikiId,
    dispatch,
    navigate,
    once,
    title,
    wiki,
    wikiName,
    wikiName.wikiName,
    wikiStatus,
  ]);

  const body = useMemo(() => {
    let htmlContent = draftToHtml(content);
    htmlContent = htmlContent.replace(
      /<img([^>]+)>/gi,
      `<img$1 class="img-fluid" loading="lazy">`
    );
    return parse(htmlContent);
  }, [content]);

  const handlePageSetup = (currPages) => {
    setPages(currPages);
    const updatedSearchBar = {
      ...searchBar,
      pages: currPages.map((page) => {
        return { link: page, title: page };
      }),
    };
    setSearchBar(updatedSearchBar);
  };

  const handleTitleChange = debounce((e) => {
    setSearchBar({
      ...searchBar,
      link: e.target.value,
      title: e.target.value,
    });
    setTitle(e.target.value);

    dispatch(getNameAvailability({ name: e.target.value, jwtAccessToken }));
  }, 900);

  const isReadyToSubmit =
    (wikiNameAvailable || wiki.wikiName) &&
    title !== '' &&
    Object.values(content).length > 0;

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

    await dispatch(createWiki({ wiki: wikiToCreate, jwtAccessToken }));
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

  let helperText;

  if (Object.keys(wikiName).length !== 0 && !wikiNameAvailable) {
    helperText = `You cannot change the title of your wiki when updating it, the title is ${wiki.wikiName}`;
  } else if (
    wikiNameAvailable === false &&
    Object.keys(wikiName).length === 0
  ) {
    helperText = 'Name is taken choose another one';
  } else {
    helperText = 'Enter a title for your wiki page';
  }

  return (
    <>
      {wikiStatus === 'failed' && (
        <AlertSnackBar
          passedMessage="Something went wrong. Try again later"
          typeMessage="warning"
        />
      )}
      <div className="container-xxl">
        <div className="row justify-content-center g-0">
          <h1>
            {Object.keys(wikiName).length !== 0 ? 'UPDATE' : 'CREATE'} WIKI
          </h1>
        </div>
        <div className="row justify-content-center pt-5 pb-5 g-0">
          <TextField
            disabled={wikiName?.wikiName !== undefined}
            error={wikiNameAvailable !== null && !wikiNameAvailable}
            id="outlined-basic"
            onChange={handleTitleChange}
            label="Title"
            variant="outlined"
            margin="dense"
            required
            helperText={helperText}
          />
        </div>
        <div className="row justify-content-center pb-5 g-0">
          <TextEditor
            key={wiki?.wikiName}
            toolbar="editor-toolbar"
            wrapper="editor-wrapper"
            editor="editor-title"
            value={wiki?.description ?? initialContent}
            setter={setContent}
          />
        </div>
        <div className="row justify-content-center g-0 mb-5">
          <div className="col-auto col-md-6 text-center">
            <Button
              variant="contained"
              disabled={wiki.isParentChild === 'parent'}
              onClick={() => {
                setPageOrWiki('page');
                if (wiki?.links?.pages?.length === 0) {
                  setSearchBar({
                    ...searchBar,
                    pages: [],
                  });
                }
                if (topicNames.length === 0) dispatch(fetchTopicNames());
              }}
            >
              Embed Pages
            </Button>
          </div>
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
        </div>
        {pageOrWiki !== '' &&
          (topicNames.length > 0 || wikiNames.length > 0) && (
            <>
              <div className="row justify-content-center mb-5 g-0">
                <Typography variant="h3">
                  Choose the {pageOrWiki} you want this wiki be associated with
                </Typography>
              </div>
              <div className="row justify-content-center pb-5 g-0">
                <TransferList
                  key={pageOrWiki}
                  itemsToChooseFrom={
                    pageOrWiki === 'page'
                      ? topicNames.map((topic) => {
                          return topic.title;
                        })
                      : wikiNames
                          .map((currWiki) => {
                            if (wiki?.wikiName !== currWiki.wikiName) {
                              return currWiki.wikiName;
                            }
                            return undefined;
                          })
                          .filter((curr) => curr !== undefined)
                  }
                  itemsChosen={pages}
                  setItemsChosen={handlePageSetup}
                />
              </div>
            </>
          )}
        <div className="row justify-content-center mb-5 g-0">
          <h3>REVIEW</h3>
        </div>
        <div className="row justify-content-center  pb-5 g-0">
          <WikiHome
            Aside={<Aside links={searchBar} disabled />}
            Body={body}
            disabled
          />
        </div>
        <div className="row justify-content-center justify-content-md-around ">
          <div className="col-auto col-sm-6 col-md-6 text-center">
            <Button
              variant="contained"
              color="warning"
              size="large"
              onClick={() => {
                if (wikiName.wikiName) {
                  navigate(`/wiki/${wiki.wikiName}`, { replace: true });
                }
                navigate(`/wiki`, { replace: true });
              }}
            >
              Cancel
            </Button>
          </div>
          <div className="col-auto col-sm-6 col-md-6 mb-5 text-center">
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
          </div>
        </div>
      </div>
    </>
  );
}
