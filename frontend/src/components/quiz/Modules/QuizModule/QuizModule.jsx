import './QuizModule.css';
// eslint-disable-next-line no-unused-vars
import { TextareaAutosize, TextField } from '@mui/material';
import TagForm from '../../../forums/tags/TagForm';
// import { tagsActions } from '../../../store/reducers/tags-reducer';

export default function QuizModule() {
  const temp = '';

  return (
    <div className="container-fluid">
      <div className="row">
        <TextField
          className="col-auto w-100 mb-2"
          id="margin-dense"
          required
          label="Title"
          value={temp}
          //   onChange={temofunch}
        />
        <TextField
          className="col-auto"
          type="number"
          id="margin-dense"
          required
          label="Max Score"
          value={temp}
          //   onChange={temofunch}
        />
        <div className="w-100">
          <TagForm currentTags={null} setCurrentTags={null} />
        </div>
      </div>
    </div>
  );
}
