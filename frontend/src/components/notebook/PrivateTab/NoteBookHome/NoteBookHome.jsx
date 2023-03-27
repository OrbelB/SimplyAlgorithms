import NoteBookList from '../NoteBookList/NoteBookList';

export default function NotebookHome({ notes, setNotes }) {
  return (
    <div className="form-outline">
      <input
        type="search"
        className="form-control w-75 m-3"
        placeholder="Search for Note"
      />
      {notes.length === 0 ? (
        <div className="card m-3">
          <div className="card-body">
            <h5 className="card-title"> Message: </h5>
            <p className="card-text"> There are no notes available.</p>
          </div>
        </div>
      ) : (
        notes.map((element) => {
          return (
            <NoteBookList
              element={element}
              key={element.id}
              notes={notes}
              setNotes={setNotes}
            />
          );
        })
      )}
    </div>
  );
}
