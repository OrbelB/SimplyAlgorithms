import './PostPreview.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useMemo } from 'react';
import { forumActions } from '../../../store/reducers/forum-reducer';
import { fetchForumList } from '../../../services/forum';
import ForumQuickView from './ForumQuickView';
import AlertSnackBar from '../../alert-messages-snackbar/AlertSnackBar';
import { selectSortedForums } from '../../../store/reducers/forums-reducer';

export default function PostPreview() {
  const [page, setPage] = useState(1);
  const { totalPages } = useSelector((state) => state.forums);
  const [loadMorePages, setLoadMorePages] = useState(false);
  const { reportId } = useSelector((state) => state.forum);
  const { filterBy: filterForumBy } = useSelector((state) => state.forums);

  const dispatch = useDispatch();
  const forums = useSelector(selectSortedForums);

  const showedForums = useMemo(() => {
    if (filterForumBy !== '') {
      return forums.filter((forum) =>
        forum.tags.find((tag) => tag.tagId === filterForumBy)
      );
    }
    return forums;
  }, [filterForumBy, forums]);

  const clickViewMorePages = (event) => {
    event.preventDefault();
    dispatch(fetchForumList({ page, size: 5, sortBy: '' }));
    setPage(page + 1);
    setLoadMorePages(!loadMorePages);
  };

  const removeReportId = () => {
    dispatch(forumActions.removeSingleReportId());
  };

  return (
    <>
      {reportId && (
        <AlertSnackBar
          passedMessage={`Your report has been received. The id is ${reportId}`}
          typeMessage="success"
          removeData={removeReportId}
        />
      )}
      <div>
        {showedForums.map((forum) => (
          <ForumQuickView
            key={forum?.pageId}
            pageId={forum?.pageId}
            title={forum?.title}
            userDto={forum?.userDto}
            upVotes={forum?.upVotes}
            downVotes={forum?.downVotes}
          />
        ))}
        <div className="row justify-content-center">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={clickViewMorePages}
            hidden={totalPages === page}
          >
            load more pages..
          </button>
        </div>
      </div>
    </>
  );
}
