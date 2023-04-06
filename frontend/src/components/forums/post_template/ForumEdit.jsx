/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { TextareaAutosize, TextField } from '@mui/material';
import UnderConstruction from '../../underconstruction/UnderConstruction';
import useValidateInput from '../../../hooks/use-ValidateInput';

import { forumActions } from '../../../store/reducers/forum-slice';
import { updateForum } from '../../../services/forum';
import TagForm from '../tags/TagForm';
import { tagsActions } from '../../../store/reducers/tags-slice';

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
  const onSubmitForm = (e) => {
    e.preventDefault();
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
    <form className="container-xxl form-group pt-5" onSubmit={onSubmitForm}>
      <h2 className="row justify-content-center mb-4">EDIT FORUM</h2>
      <div className="row justify-content-center">
        <TextField
          className="col-auto w-75 mb-5"
          id="margin-dense"
          required
          label="Title"
          value={title}
          onChange={titleChangeHandler}
        />
        <TextareaAutosize
          className="col-auto w-75 mb-5"
          id="filled-multiline-flexible"
          label="Description"
          minRows={15}
          required
          value={description}
          onChange={descriptionChangeHandler}
        />
        <h3 className="row justify-content-center">CURRENT CATEGORIES</h3>
        <div className="w-75 m-0 p-0">
          <TagForm currentTags={currentTags} setCurrentTags={setCurrentTags} />
        </div>
      </div>
      <div className="d-flex justify-content-around mt-5 mb-5">
        <button
          type="button"
          className="btn  btn-secondary btn-lg"
          onClick={() => {
            dispatch(tagsActions.resetData());
            navigate(redirectTo, { replace: true });
          }}
        >
          BACK
        </button>
        <button
          type="submit"
          className="btn btn-lg  btn-success"
          disabled={!isFormValid}
        >
          SUBMIT
        </button>
      </div>
    </form>
  );
}
