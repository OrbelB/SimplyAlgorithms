import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import draftToHtml from 'draftjs-to-html';
import parse from 'html-react-parser';
import WikiHome from '../components/wiki/WikiHome';
import Aside from '../components/wiki/Aside';
import { fetchSingleWiki } from '../services/wiki';
import { wikiActions } from '../store/reducers/wiki-reducer';

export default function WikiPage() {
  const { wikiName } = useParams();
  const [runOnce, setRunOnce] = useState(true);
  const { status, wiki } = useSelector((state) => state.wiki);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSingleWiki(wikiName));
    }
    if (wikiName !== wiki?.wikiName && status === 'success' && runOnce) {
      setRunOnce(false);
      dispatch(wikiActions.resetData());
    }
  }, [status, wiki, wikiName, dispatch, runOnce]);

  const body = useMemo(() => {
    return parse(draftToHtml(wiki?.description));
  }, [wiki?.description]);

  if (status === 'failed') {
    dispatch(wikiActions.resetData());
    navigate('/wiki/Main Category', { replace: true });
  }

  if (wiki && status === 'success') {
    return (
      <WikiHome
        title={wikiName}
        wikiId={wiki.wikiId}
        Aside={
          <Aside
            links={wiki.links}
            path={wiki.isParentChild === 'child' ? 'topic' : 'wiki'}
          />
        }
        Body={body}
      />
    );
  }
}
