/* eslint-disable react/jsx-props-no-spreading */
import { Checkbox } from '@mui/material';
import { nanoid } from '@reduxjs/toolkit';
import Report from '../../../report/Report';

const label = { inputProps: { 'aria-label': 'Filter Save' } };
const PUBLICNOTES_PREVIEWS = [
  {
    id: 1,
    title: 'Title 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper condimentum ligula, vitae feugiat ipsum aliquam porttitor. Quisque eget velit vel diam gravida vulputate sit amet in quam. Mauris quam lorem, fringilla a odio ut, molestie luctus enim.',
  },
  {
    id: 2,
    title: 'Title 2',
    description:
      'Integer eu eleifend tellus, eget commodo nisi. Sed maximus est vitae metus tempus, sed ornare diam pulvinar. Vestibulum a vehicula felis. Curabitur lacinia congue dui vitae efficitur.',
  },
  {
    id: 3,
    title: 'Title 3',
    description:
      'Etiam id auctor massa, a volutpat mi. In vitae risus vel ipsum rutrum gravida eu vitae nunc. Phasellus eleifend orci at blandit pretium. Nam malesuada enim nec eleifend mattis.',
  },
];
export default function PubNoteList() {
  return PUBLICNOTES_PREVIEWS.map((note) => (
    <div key={nanoid()}>
      <div className="card m-3 mb-4">
        <div className="card-body">
          <h4 className="card-title m-2">{note.title}</h4>
          <p className="card-text m-2">{note.description}</p>
          <div className="m-2 mb-0">
            <Report />
          </div>
          <div className="position-absolute top-0 end-0 m-3">
            <Checkbox {...label} />
          </div>
        </div>
      </div>
    </div>
  ));
}
