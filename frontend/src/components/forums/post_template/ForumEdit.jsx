import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { TextField } from '@mui/material';
import UnderConstruction from '../../underconstruction/UnderConstruction';
import useValidateInput from '../../../hooks/use-ValidateInput';

import { forumActions } from '../../../store/reducers/forum-reducer';
import { updateForum } from '../../../services/forum';
import TagForm from '../tags/TagForm';
import { tagsActions } from '../../../store/reducers/tags-reducer';

export default function ForumEdit() {
  const { pageId } = useParams();
  const { forum, status } = useSelector((state) => state.forum);
  const { jwtAccessToken, isLoggedIn } = useSelector((state) => state.auth);
  const [currentTags, setCurrentTags] = useState(forum.tags);
  const {
    value: title,
    valueIsValid: titleIsValid,
    valueChangeHandler: titleChangeHandler,
    reset: titleReset,
  } = useValidateInput((value) => value.trim() !== '', forum.title);
  const {
    value: description,
    valueIsValid: descriptionIsValid,
    valueChangeHandler: descriptionChangeHandler,
    reset: descriptionReset,
  } = useValidateInput((value) => value.trim() !== '', forum.descriptionText);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location?.state?.from?.pathname || '/home';

  useEffect(() => {
    // if we have updated the forum slice, then
    if (status === 'completed') {
      dispatch(forumActions.switchStatus('success'));
      navigate(redirectTo, { replace: true });
    }
    if (!isLoggedIn) {
      navigate(redirectTo, { replace: true });
    }
  }, [currentTags, status, redirectTo, isLoggedIn, navigate, dispatch]);

  let isFormValid = false;
  if (titleIsValid && descriptionIsValid) isFormValid = true;
  const onSubmitForm = () => {
    if (!isFormValid) return;
    dispatch(
      updateForum({
        updatedForum: {
          pageId,
          descriptionText: description,
          title,
          photo: '',
          video: '',
          userDto: {
            userId: forum.userDto.userId,
          },
          tags: currentTags,
        },
        accessToken: jwtAccessToken,
      })
    );
    dispatch(tagsActions.resetData());
    descriptionReset();
    titleReset();
  };
  if (!forum) {
    return (
      <section>
        <UnderConstruction />
      </section>
    );
  }

  return (
    <div className="container-fluid form-group pt-5">
      <div className="row justify-content-center">
        <TextField
          className="col-auto w-75 mb-5"
          id="margin-dense"
          required
          label="Title"
          value={title}
          onChange={titleChangeHandler}
        />
        <TextField
          className="col-auto w-75 mb-5"
          id="filled-multiline-flexible"
          label="Description"
          rows={4}
          multiline
          required
          value={description}
          onChange={descriptionChangeHandler}
        />
        <h4 className="row justify-content-center">Current Categories</h4>
        <div className="w-75">
          <TagForm currentTags={currentTags} setCurrentTags={setCurrentTags} />
        </div>
      </div>
      <div className="row justify-content-around mt-5">
        <div className="col-auto">
          <button
            type="button"
            className=" btn  btn-outline-secondary"
            onClick={() => {
              dispatch(tagsActions.resetData());
              navigate(redirectTo, { replace: true });
            }}
          >
            BACK
          </button>
        </div>
        <div className="col-auto d-flex justify-content-end">
          <button
            type="button"
            className="btn  btn-outline-primary"
            onClick={onSubmitForm}
            disabled={!isFormValid}
          >
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
}
