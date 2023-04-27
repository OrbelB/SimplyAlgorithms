import { useCallback, useState } from 'react';
import parse from 'html-react-parser';
import draftToHtml from 'draftjs-to-html';
import FlagIcon from '@mui/icons-material/Flag';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import Report from '../../../report/Report';
import AreYouSureModal from '../../../AreYourSureModal/AreYouSureModal';
import useJwtPermssionExists from '../../../../hooks/use-jwtPermission';
import { deletePublicNoteByAdmin } from '../../../../services/note';

export default function PubNoteCard({
  userNoteDTO,
  lastPublicNote,
  index,
  saved,
  handleClick,
  userId,
  openReport,
  handleOpenReport,
  handleCloseReport,
}) {
  const [openDel, setOpenDel] = useState(false);
  const dispatch = useDispatch();
  const jwtAccessToken = useSelector((state) => state.auth.jwtAccessToken);
  const isAdmin = useJwtPermssionExists({ permission: 'ROLE_ADMIN' });

  // removes the public note from the database, only if the user is an admin
  const removePublicNote = async () => {
    try {
      await dispatch(
        deletePublicNoteByAdmin({
          authorId: userNoteDTO.createdBy.userId,
          noteId: userNoteDTO.noteId,
          jwtAccessToken,
        })
      ).unwrap();
    } finally {
      setOpenDel(false);
    }
  };
  const handleNoteBodyHTML = useCallback((noteBody) => {
    let htmlContent = draftToHtml(noteBody);
    htmlContent = htmlContent.replace(
      /<img([^>]+)>/gi,
      `<img$1 class="img-fluid" loading="lazy">`
    );
    const parsedContent = parse(htmlContent);
    return parsedContent;
  }, []);

  const handleConfirmDel = async () => {
    await removePublicNote();
  };
  return (
    <>
      <AreYouSureModal
        title="Are you sure you want to delete this public note?"
        onClose={() => setOpenDel(false)}
        onConfirm={handleConfirmDel}
        open={openDel}
        message="The public note will be removed from our records. This action is irreversible!"
      />
      <div ref={lastPublicNote} className="card m-3 mb-4">
        <div className="card-body">
          {isAdmin ? (
            <div className="row justify-content-around">
              <div className="col-auto col-lg-9 col-xs-12 text-start">
                <h4 className="card-title m-2 ms-0 me-0">
                  {userNoteDTO?.title}
                </h4>
              </div>
              <div className="col-auto col-lg-2 col-xs-12 align-self-center ">
                <Button
                  type="button"
                  className="float-end"
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => setOpenDel(true)}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </div>
            </div>
          ) : (
            <h4 className="card-title m-2">{userNoteDTO?.title}</h4>
          )}
          <h6 className="text-secondary m-2">
            {`Created By: ${userNoteDTO?.createdBy?.username}`}
          </h6>
          <div className="card-text m-3">
            {handleNoteBodyHTML(userNoteDTO?.noteBody)}
          </div>
          <div className="m-2 mb-0 d-flex justify-content-between">
            <Button
              type="button"
              variant="contained"
              onClick={handleOpenReport}
              startIcon={<FlagIcon />}
            >
              Report
            </Button>
            <Report
              open={openReport}
              handleClose={handleCloseReport}
              culpritUserId={userNoteDTO?.createdBy?.userId}
              foreignId={userNoteDTO?.noteId}
              typeOfForeignId="note"
              victumUserId={userId}
            />
            <Button
              variant="contained"
              color={saved[index] ? 'error' : 'success'}
              onClick={() => handleClick(index, userNoteDTO.noteId)}
              disabled={saved[index]}
            >
              {saved[index] ? 'Unsave Note' : 'Save Note'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
