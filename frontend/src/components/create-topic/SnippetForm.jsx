import { memo } from 'react';
import { TextareaAutosize } from '@mui/material';

function SnippetForm({ index, handleSnippetChange, removeSnippets, snippet }) {
  return (
    <>
      <div className="row mb-4">
        <input
          className="label-topic"
          name="languageTitle"
          placeholder="Language"
          value={snippet?.languageTitle}
          onChange={(e) => handleSnippetChange(index, e)}
        />
      </div>
      <div className="row mb-4">
        <TextareaAutosize
          minRows={5}
          className="label2"
          name="codeText"
          placeholder="Enter code"
          value={snippet?.codeText}
          onChange={(e) => handleSnippetChange(index, e)}
        />
      </div>
      <div className="row mb-4 justify-content-center">
        <button
          type="button"
          className="form-button w-auto"
          onClick={() => removeSnippets(index)}
        >
          REMOVE SNIPPET
        </button>
      </div>
    </>
  );
}

export default memo(SnippetForm);
