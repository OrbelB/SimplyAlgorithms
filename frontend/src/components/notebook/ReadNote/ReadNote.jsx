import { Button } from '@mui/material';
import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';
import draftToHtml from 'draftjs-to-html';
import FlagIcon from '@mui/icons-material/Flag';
import { timeToExpire } from '../../../utilities/beautify-time';
import Report from '../../report/Report';

export default function ReadNote({ note, onGoBack }) {
  const { userId } = useSelector((state) => state.auth);
  const body = useMemo(() => {
    return parse(draftToHtml(note?.userNoteDTO?.noteBody));
  }, [note?.userNoteDTO?.noteBody]);
  const [openReport, setOpenReport] = useState(false);

  const handleOpenReport = () => {
    setOpenReport(true);
  };

  const handleCloseReport = () => {
    setOpenReport(false);
  };
  return (
    <div className="card m-3 mb-4">
      <div className="card-header">
        Expires:{' '}
        <strong>{timeToExpire(note?.noteShareDTO?.expireDate)} days</strong>{' '}
        &emsp; Permissions:{' '}
        <strong>{note?.noteShareDTO?.canEdit ? 'Edit' : 'Read'}</strong>
      </div>
      <div className="card-body">
        <h4 className="card-title m-2">{note?.userNoteDTO?.title ?? ''}</h4>
        <div className="card-text m-2">{body}</div>
        <div className="d-flex justify-content-between m-2 mb-0">
          <Button className="m-1" onClick={onGoBack} variant="contained">
            Go Back
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={handleOpenReport}
            startIcon={<FlagIcon />}
            className="ml-auto"
          >
            Report
          </Button>
          <Report
            open={openReport}
            handleClose={handleCloseReport}
            culpritUserId={note.userNoteDTO?.createdBy.userId}
            foreignId={note.noteShareDTO.shareId}
            victumUserId={userId}
            typeOfForeignId="share note"
          />
        </div>
      </div>
    </div>
  );
}
