/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-else-return */
import { Button } from '@mui/material';
import { nanoid } from '@reduxjs/toolkit';
import { useState } from 'react';
import Report from '../../../report/Report';
import EditNote from '../../EditNote/EditNote';
import ReadNote from '../../ReadNote/ReadNote';

const SHAREDNOTES_PREVIEWS = [
  {
    id: 1,
    expires: '3',
    permissions: 'Read',
    title: 'Title 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper condimentum ligula, vitae feugiat ipsum aliquam porttitor. Quisque eget velit vel diam gravida vulputate sit amet in quam. Mauris quam lorem, fringilla a odio ut, molestie luctus enim.',
  },
  {
    id: 2,
    expires: '7',
    permissions: 'Edit',
    title: 'Title 2',
    description:
      'Integer eu eleifend tellus, eget commodo nisi. Sed maximus est vitae metus tempus, sed ornare diam pulvinar. Vestibulum a vehicula felis. Curabitur lacinia congue dui vitae efficitur.',
  },
  {
    id: 3,
    expires: '5',
    permissions: 'Edit',
    title: 'Title 3',
    description:
      'Etiam id auctor massa, a volutpat mi. In vitae risus vel ipsum rutrum gravida eu vitae nunc. Phasellus eleifend orci at blandit pretium. Nam malesuada enim nec eleifend mattis.',
  },
];

export default function SharedNotesList() {
  const [toRead, setToRead] = useState(false);
  const [toEdit, setToEdit] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const handleClick = (note) => {
    if (note.permissions === 'Read') {
      // Render the ReadNote component if user has 'Read' permissions
      setSelectedNote(note);
      setToRead(true);
    } else if (note.permissions === 'Edit') {
      // Render the EditNote component if user has 'Edit' permissions
      setSelectedNote(note);
      setToEdit(true);
    } else {
      // Handle other permissions as necessary
      setSelectedNote(null);
      setToRead(false);
    }
  };
  const handleGoBackRead = () => {
    setToRead(false);
    setSelectedNote(null);
  };
  const handleGoBackEdit = () => {
    setToEdit(false);
    setSelectedNote(null);
  };

  return (
    <>
      {toRead === true && selectedNote !== null ? (
        <ReadNote note={selectedNote} onGoBack={handleGoBackRead} />
      ) : toEdit === true && selectedNote !== null ? (
        <EditNote note={selectedNote} onGoBack={handleGoBackEdit} />
      ) : (
        <div>
          {SHAREDNOTES_PREVIEWS.map((note) => (
            <div key={nanoid()}>
              <div className="card m-3 mb-4">
                <div className="card-header">
                  Expires: <strong>{note.expires} days</strong> &emsp;
                  Permissions: <strong>{note.permissions}</strong>
                </div>
                <div className="card-body">
                  <h4 className="card-title m-2">{note.title}</h4>
                  <p className="card-text m-2">{note.description}</p>
                  <div className="d-flex m-2 mb-0">
                    <Report />
                    <Button onClick={() => handleClick(note)}>View</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
