import './Notifications.css';
import { Modal } from 'react-bootstrap';
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
              value={sortBy.get('sortBy')}
              onChange={(e) => {
                handleSortBy(e.target.value);
              }}
              sx={{ color: 'black' }}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Alphabetical">Alphabetically</MenuItem>
            </Select>
          </FormControl>
          <div className="secondline">
            <NotificationsPreview
              setShow={setShow}
              lastNode={lastElementChild}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
