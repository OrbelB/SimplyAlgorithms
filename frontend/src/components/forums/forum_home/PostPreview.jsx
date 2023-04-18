import './PostPreview.css';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { Card, Typography, CardContent } from '@mui/material';
import { styled } from '@mui/system';
import { forumActions } from '../../../store/reducers/forum-slice';
import { fetchForumList } from '../../../services/forum';
import ForumQuickView from './ForumQuickView';
import AlertSnackBar from '../../alert-messages-snackbar/AlertSnackBar';
import { forumsActions } from '../../../store/reducers/forums-slice';
import usePaginationWithInfiniteScroll from '../../../hooks/use-pagination';

const StyledCard = styled(Card)({
  minWidth: '275px',
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
});

const StyledTitle = styled(Typography)({
  fontWeight: 'bold',
  marginBottom: '16px',
});

const StyledDescription = styled(Typography)({
  color: 'rgba(0, 0, 0, 0.6)',
});

export default function PostPreview({ forums }) {
  const {
    totalPages,
    currentPage,
    status,
    filterBy: filterForumBy,
  } = useSelector((state) => state.forums);

  const { lastElementChild: lastElement } = usePaginationWithInfiniteScroll({
    totalPages,
    currPage: currentPage,
    updateCurrPage: forumsActions.updateCurrentPage,
    itemId: '',
    itemName: '',
    fetchFunction: fetchForumList,
    status,
  });
  const { reportId } = useSelector((state) => state.forum);
  const dispatch = useDispatch();
  const showedForums = useMemo(() => {
    if (filterForumBy !== '') {
      return forums.filter((forum) =>
        forum.tags.find((tag) => tag.tagId === filterForumBy)
      );
    }
    return forums;
  }, [filterForumBy, forums]);

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
      {showedForums.length > 0 ? (
        showedForums.map((forum, index) => {
          if (showedForums.length === index + 1) {
            return (
              <ForumQuickView
                innerRef={lastElement}
                key={forum?.pageId}
                pageId={forum?.pageId}
                title={forum?.title}
                userDto={forum?.userDto}
                upVotes={forum?.upVotes}
                downVotes={forum?.downVotes}
              />
            );
          }
          return (
            <ForumQuickView
              key={forum?.pageId}
              pageId={forum?.pageId}
              title={forum?.title}
              userDto={forum?.userDto}
              upVotes={forum?.upVotes}
              downVotes={forum?.downVotes}
            />
          );
        })
      ) : (
        <StyledCard>
          <CardContent>
            <StyledTitle variant="h5" component="h2">
              No forums found!
            </StyledTitle>
            <StyledDescription variant="body1" component="p">
              There are currently no forums in the database that match with your
              request.
            </StyledDescription>
          </CardContent>
        </StyledCard>
      )}
    </>
  );
}
