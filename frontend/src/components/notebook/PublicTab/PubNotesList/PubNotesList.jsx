/* eslint-disable react/jsx-props-no-spreading */
import { useSelector } from 'react-redux';
import { Checkbox } from '@mui/material';
import parse from 'html-react-parser';
import draftToHtml from 'draftjs-to-html';
import Report from '../../../report/Report';
import usePaginationWithInfiniteScroll from '../../../../hooks/use-pagination';
import { updateCurrentPublicNotePage } from '../../../../store/reducers/note-slice';
import { listPublicNotes } from '../../../../services/note';

const label = { inputProps: { 'aria-label': 'Filter Save' } };

export default function PubNoteList({ notes }) {
  const { jwtAccessToken, userId } = useSelector((state) => state.auth);
  const { currentPublicNotePage, totalPublicNotePages, status } = useSelector(
    (state) => state.note
  );
  const { lastElementChild: lastPublicNote } = usePaginationWithInfiniteScroll({
    totalPages: totalPublicNotePages,
    currentPage: currentPublicNotePage,
    updateCurrPage: updateCurrentPublicNotePage,
    itemId: userId,
    itemName: 'userId',
    fetchFunction: listPublicNotes,
    jwtAccessToken,
    status,
  });

  return notes?.map(({ userNoteDTO }, index) => {
    if (index + 1 === notes.length) {
      return (
        <div
          key={userNoteDTO.noteId}
          ref={lastPublicNote}
          className="card m-3 mb-4"
        >
          <div className="card-body">
            <h4 className="card-title m-2">{userNoteDTO?.title}</h4>
            <div className="card-text m-2">
              {parse(draftToHtml(userNoteDTO?.noteBody))}
            </div>
            <div className="m-2 mb-0">
              <Report />
            </div>
            <div className="position-absolute top-0 end-0 m-3">
              <Checkbox {...label} />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div key={userNoteDTO.noteId} className="card m-3 mb-4">
        <div className="card-body">
          <h4 className="card-title m-2">{userNoteDTO?.title}</h4>
          <div className="card-text m-2">
            {parse(draftToHtml(userNoteDTO?.noteBody))}
          </div>
          <div className="m-2 mb-0">
            <Report />
          </div>
          <div className="position-absolute top-0 end-0 m-3">
            <Checkbox {...label} />
          </div>
        </div>
      </div>
    );
  });
}
