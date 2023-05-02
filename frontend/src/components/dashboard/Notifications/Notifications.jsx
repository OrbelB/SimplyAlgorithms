import './Notifications.css';
import Modal from 'react-bootstrap/Modal';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useSelector } from 'react-redux';
import NotificationsPreview from './NotificationsPreview/NotifcationsPreview';
import useSortBy from '../../../hooks/use-sortBy';
import usePaginationWithInfiniteScroll from '../../../hooks/use-pagination';
import { userActions } from '../../../store/reducers/user-slice';
import { fetchUserNotifications } from '../../../services/user';

export default function Notifications({ show, setShow }) {
  const {
    userId,
    jwtAccessToken,
    notificationsTotalPages,
    notificationsCurrPage,
  } = useSelector((state) => state.auth);
  const { status } = useSelector((state) => state.user);

  const { sortBy, handleSortBy } = useSortBy({
    actionToDispatch: fetchUserNotifications,
    userId,
    jwtAccessToken,
    status,
  });

  const { lastElementChild } = usePaginationWithInfiniteScroll({
    totalPages: notificationsTotalPages,
    currPage: notificationsCurrPage,
    updateCurrPage: userActions.updateNotificationCurrPage,
    itemId: userId,
    itemName: 'userId',
    fetchFunction: fetchUserNotifications,
    status,
    jwtAccessToken,
  });

  return (
    <Modal
      show={show}
      size="lg"
      backdrop="static"
      keyboard={false}
      scrollable
      bsPrefix="modal"
      onHide={() => setShow(false)}
    >
      <Modal.Header
        closeButton
        className="btr text-center"
        style={{ borderBottom: 'none' }}
      >
        <Modal.Title bsPrefix="modal-title">Notifications</Modal.Title>
      </Modal.Header>
      <Modal.Body className="btr" bsPrefix="modal-body">
        <FormControl sx={{ minWidth: '150px' }}>
          <InputLabel id="my-select-label">Sort By</InputLabel>
          <Select
            labelId="my-select-label"
            id="my-select"
            value={sortBy.get('sortBy') ?? ''}
            onChange={(e) => {
              handleSortBy(e.target.value);
            }}
            sx={{ backgroundColor: '#C7DDFF', borderRadius: '4px' }}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Alphabetical">Alphabetically</MenuItem>
          </Select>
        </FormControl>
        <div className="secondline">
          <NotificationsPreview setShow={setShow} lastNode={lastElementChild} />
        </div>
      </Modal.Body>
    </Modal>
  );
}
