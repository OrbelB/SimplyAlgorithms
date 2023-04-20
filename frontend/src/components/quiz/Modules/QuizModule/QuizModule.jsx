/* eslint-disable no-unused-vars */
import './QuizModule.css';
// eslint-disable-next-line no-unused-vars
import { TextareaAutosize, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { quizActions } from '../../../../store/reducers/quiz-slice';
import TagForm from '../../../forums/tags/TagForm';
import imageToStringBase64 from '../../../../utilities/image-to-data-url';
// import { tagsActions } from '../../../store/reducers/tags-reducer';

export default function QuizModule() {
  const { quizDTO } = useSelector((state) => state.quiz);
  const [currentTags, setCurrentTags] = useState(() =>
    quizDTO.tag ? [{ tag: quizDTO?.tag.tag, tagId: quizDTO?.tag.tagId }] : []
  );
  const [updateQuizTag, setUpdateQuizTag] = useState(false);
  const dispatch = useDispatch();
  const [image, setImage] = useState(undefined);

  useEffect(() => {
    if (updateQuizTag) {
      dispatch(quizActions.updateQuizTag({ tag: currentTags[0] }));
      setUpdateQuizTag(!updateQuizTag);
    }
  }, [currentTags, updateQuizTag, dispatch]);
  const handleTags = (tags) => {
    // replace the new tag add it with the old one
    setCurrentTags(tags.filter((tag) => tag.tagId !== currentTags[0]?.tagId));
    setUpdateQuizTag(!updateQuizTag);
  };

  const handleImage = async (e) => {
    setImage(e.target.files[0]);
    let stringBase64Image = '';
    await imageToStringBase64(e.target.files[0]).then((data) => {
      stringBase64Image = data;
    });
    dispatch(
      quizActions.updateQuizPicture({
        picture: stringBase64Image,
      })
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <TextField
          className="col-auto w-100 mb-2"
          id="margin-dense"
          required
          value={quizDTO.title}
          label="Title"
          onChange={(e) => {
            dispatch(quizActions.updateQuizTitle({ title: e.target.value }));
          }}
        />
        <TextField
          className="col-auto mb-2"
          type="number"
          id="margin-dense"
          value={quizDTO.score}
          required
          label="Max Score"
          onChange={(e) => {
            dispatch(quizActions.updateQuizScore({ score: e.target.value }));
          }}
        />
        <TextareaAutosize
          className="col-auto w-100 mb-2 p-2"
          minRows={5}
          id="margin-dense"
          value={quizDTO.description}
          required
          label="Description"
          onChange={(e) => {
            dispatch(
              quizActions.updateQuizDescription({ description: e.target.value })
            );
          }}
        />
        <div className="row justify-content-center">
          <div className="text-center w-75 pb-3">
            <img
              src={
                quizDTO.picture ||
                (image && URL.createObjectURL(image)) ||
                'https://via.placeholder.com/600x600'
              }
              height="600px"
              width="600px"
              className="rounded-4 m-4 img-fluid"
              alt="question_image"
            />
            <input
              type="file"
              id="questionImage"
              className="form-control"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleImage}
            />
          </div>
        </div>

        <div className="m-0 p-0">
          <TagForm currentTags={currentTags} setCurrentTags={handleTags} />
        </div>
      </div>
    </div>
  );
}
