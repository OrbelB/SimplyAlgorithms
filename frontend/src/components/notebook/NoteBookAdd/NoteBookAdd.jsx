/* eslint-disable no-unused-vars */
/* eslint-disable object-shorthand */
/* eslint-disable jsx-a11y/label-has-associated-control */
import TextEditor from '../../text-editor/TextEditor';

export default function NotebookAdd({
  title,
  setTitle,
  description,
  setDescription,
  notes,
  setNotes,
}) {
  const inputHandlerTitle = (e) => {
    setTitle(e.target.value);
  };

  const inputHandlerDescription = (e) => {
    setDescription(e.target.value);
  };

  const addNotesHandler = (e) => {
    e.preventDefault();
    if (title !== '' && description !== '') {
      setNotes((note) => {
        return [
          ...note,
          {
            title: title,
            description: description,
            id: new Date().getTime(),
          },
        ];
      });
    }
    setTitle('');
    setDescription('');
  };

  return (
    <form>
      <div className="form-group m-3">
        <label htmlFor="note-title">Title: </label>
        <input
          type="text"
          className="form-control"
          id="note-title"
          placeholder="Enter title"
          value={title}
          onChange={inputHandlerTitle}
        />
      </div>
      <div className="form-group m-3">
        <label htmlFor="note-description">Description: </label>
        <TextEditor
          className="form-control"
          toolbar="editor-toolbar"
          wrapper="editor-wrapper"
          editor="editor-title"
          id="note-description"
          placeholder="Enter description"
          value={description} // value will not be registered, either way it would be submitted through markup
          onChange={inputHandlerDescription}
        />
      </div>
      <div className="form-group m-3">
        <button
          type="button"
          className="form-control btn btn-primary"
          onClick={addNotesHandler}
        >
          Save Note
        </button>
      </div>
    </form>
  );
}
