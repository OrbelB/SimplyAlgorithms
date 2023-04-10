import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import draftToHtml from 'draftjs-to-html';
import parse from 'html-react-parser';
import WikiHome from '../components/wiki/WikiHome';
import Aside from '../components/wiki/Aside';
import { fetchSingleWiki, getNameAvailability } from '../services/wiki';
import { wikiActions } from '../store/reducers/wiki-slice';

export default function WikiPage() {
  const { wikiName } = useParams();
  const { jwtAccessToken } = useSelector((state) => state.auth);
  const { status, wiki, nameAvailable } = useSelector((state) => state.wiki);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSingleWiki(wikiName));
      dispatch(getNameAvailability({ name: wikiName, jwtAccessToken }));
    }
    if (wikiName !== wiki?.wikiName && status === 'success') {
      dispatch(wikiActions.resetData());
    }
  }, [status, wiki, wikiName, dispatch, jwtAccessToken]);

  const body = useMemo(() => {
    let htmlContent = draftToHtml(wiki?.description);
    htmlContent = htmlContent.replace(
      /<img([^>]+)>/gi,
      `<img$1 class="img-fluid" loading="lazy">`
    );

    return parse(htmlContent);
  }, [wiki?.description]);

  if (nameAvailable) {
    dispatch(wikiActions.resetData());
    navigate('/wiki/new/create', { replace: true });
  }

  if (status === 'failed' && nameAvailable === false) {
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
            path={wiki.isParentChild === 'child' ? '' : 'wiki'}
          />
        }
        Body={body}
      />
    );
  }
}
