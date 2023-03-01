/* eslint-disable no-unused-vars */
import './QuizModule.css';
// eslint-disable-next-line no-unused-vars
import { TextareaAutosize, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import { quizActions } from '../../../../store/reducers/quiz-reducer';
import TagForm from '../../../forums/tags/TagForm';
// import { tagsActions } from '../../../store/reducers/tags-reducer';

export default function QuizModule() {
  const [currentTags, setCurrentTags] = useState([]);
  const [updateQuizTag, setUpdateQuizTag] = useState(false);
  const dispatch = useDispatch();

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

  return (
    <div className="container-fluid">
      <div className="row">
        <TextField
          className="col-auto w-100 mb-2"
          id="margin-dense"
          required
          label="Title"
          onChange={debounce((e) => {
            dispatch(quizActions.updateQuizTitle({ title: e.target.value }));
          }, 1000)}
        />
        <TextField
          className="col-auto"
          type="number"
          id="margin-dense"
          required
          label="Max Score"
          onChange={debounce((e) => {
            dispatch(quizActions.updateQuizScore({ score: e.target.value }));
          }, 500)}
        />
        <div className="w-100">
          <TagForm currentTags={currentTags} setCurrentTags={handleTags} />
        </div>
      </div>
    </div>
  );
}
