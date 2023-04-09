import './Notifications.css';
import { Modal } from 'react-bootstrap';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import NotificationsPreview from './NotificationsPreview/NotifcationsPreview';

export default function Notifications({ show, setShow }) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <>
      {/* <!-- Modal --> */}
      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        onHide={() => setShow(false)}
      >
        <Modal.Header closeButton className="btr text-center">
          <Modal.Title>Notifications</Modal.Title>
        </Modal.Header>
        <Modal.Body className="btr">
          <FormControl
            sx={{
              color: 'black',
              width: '150px',
            }}
          >
            <InputLabel id="my-select-label" sx={{ color: 'black' }}>
              Sort By
            </InputLabel>
            <Select
              labelId="my-select-label"
              id="my-select"
              value={selectedOption}
              onChange={handleSelectChange}
              sx={{ color: 'black' }}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="option1">Newest</MenuItem>
              <MenuItem value="option2">Alphabetically</MenuItem>
            </Select>
          </FormControl>
          <div className="secondline">
            <NotificationsPreview setShow={setShow} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
