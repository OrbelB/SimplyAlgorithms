import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import draftToHtml from 'draftjs-to-html';
import parse from 'html-react-parser';
import FlagIcon from '@mui/icons-material/Flag';
import Report from '../../../report/Report';
import { timeToExpire } from '../../../../utilities/beautify-time';

export default function ShareNoteCard({
  noteShareDTO,
  innerRef,
  userNoteDTO,
  handleClick,
}) {
  const { userId } = useSelector((state) => state.auth);
  const [openReport, setOpenReport] = useState(false);
  const body = useMemo(() => {
    let htmlContent = draftToHtml(userNoteDTO?.noteBody);
    htmlContent = htmlContent.replace(
      /<img([^>]+)>/gi,
      `<img$1 class="img-fluid" loading="lazy">`
    );
    return parse(htmlContent);
  }, [userNoteDTO?.noteBody]);

  const handleOpenReport = () => {
    setOpenReport(true);
  };

  const handleCloseReport = () => {
    setOpenReport(false);
  };
  return (
    <div key={noteShareDTO.shareId} ref={innerRef} className="card m-3 mb-4">
      <div className="card-header justify-content-start d-flex gap-1">
        <p>
          Expires In:{' '}
          <strong>{timeToExpire(noteShareDTO?.expireDate)} days</strong>
        </p>
        <p>
          Permissions: <strong>{noteShareDTO.canEdit ? 'Edit' : 'Read'}</strong>
        </p>
        <p>
          Created By: <strong>{userNoteDTO?.createdBy?.username}</strong>
        </p>
      </div>
      <div className="card-body">
        <h4 className="card-title m-2">{userNoteDTO?.title}</h4>
        <div className="card-text m-2">{body}</div>
        <div className="d-flex m-2 mb-0">
          <Button
            type="button"
            variant="contained"
            onClick={handleOpenReport}
            startIcon={<FlagIcon />}
          >
            Report
          </Button>
          <Report
            culpritUserId={userNoteDTO?.createdBy?.userId}
            foreignId={userNoteDTO.noteId}
            typeOfForeignId="note"
            victumUserId={userId}
            open={openReport}
            handleClose={handleCloseReport}
          />
          <Button onClick={() => handleClick(noteShareDTO, userNoteDTO)}>
            View
          </Button>
        </div>
      </div>
    </div>
  );
}
