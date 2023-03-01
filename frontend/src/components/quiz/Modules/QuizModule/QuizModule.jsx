/* eslint-disable no-unused-vars */
import './QuizModule.css';
// eslint-disable-next-line no-unused-vars
import { TextareaAutosize, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { quizActions } from '../../../../store/reducers/quiz-reducer';
import TagForm from '../../../forums/tags/TagForm';
// import { tagsActions } from '../../../store/reducers/tags-reducer';

export default function QuizModule() {
  const { quizDTO } = useSelector((state) => state.quiz);
  const [currentTags, setCurrentTags] = useState(() =>
    quizDTO.tag ? [{ tag: quizDTO?.tag.tag, tagId: quizDTO?.tag.tagId }] : []
  );
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
          value={quizDTO.title}
          label="Title"
          onChange={(e) => {
            dispatch(quizActions.updateQuizTitle({ title: e.target.value }));
          }}
        />
        <TextField
          className="col-auto"
          type="number"
          id="margin-dense"
          value={quizDTO.score}
          required
          label="Max Score"
          onChange={(e) => {
            dispatch(quizActions.updateQuizScore({ score: e.target.value }));
          }}
        />
        <div className="w-100">
          <TagForm currentTags={currentTags} setCurrentTags={handleTags} />
        </div>
      </div>
    </div>
  );
}
