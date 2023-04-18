import { useLayoutEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  CardContent,
  CardHeader,
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
  Divider,
  CardActions,
} from '@mui/material';
import UserSearchModal from './UserSearchModal/UserSearchModal';
import {
  updateUserRole,
  checkAvailability,
  requestLockAccount,
  deleteAccount,
} from '../../../services/user';
import AlertSnackBar from '../../alert-messages-snackbar/AlertSnackBar';
import AreYouSureModal from '../../AreYourSureModal/AreYouSureModal';
import { listReportByIndividual } from '../../../services/universalReport';
import { filterReportsByIndividual } from '../../../store/reducers/report-slice';

export default function UserSearchSection() {
  const { status, nameAvailable, username } = useSelector(
    (state) => state.user
  );
  const { jwtAccessToken, userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [roleToChangeTo, setRoleToChangeTo] = useState('');
  const [userIdOrUsername, setUserIdOrUsername] = useState('');
  const [daysToLock, setDaysToLock] = useState(0);
  const [lockAccount, setLockAccount] = useState('');
  const [individualType, setIndividualType] = useState('');
  const [requestSubmmited, setRequestSubmmited] = useState(false);
  const [showAreYouSureModal, setShowAreYouSureModal] = useState(false);
  const individualName = useMemo(() => {
    if (individualType === 'culprit') return 'culpritUser';
    if (individualType === 'victum') return 'victimUser';
    if (individualType === 'resolver') return 'resolvedBy';
    return '';
  }, [individualType]);

  const filteredReports = useSelector((state) =>
    filterReportsByIndividual(state, individualName, userIdOrUsername)
  );
  useLayoutEffect(() => {
    if (requestSubmmited && status === 'success') {
      setRoleToChangeTo('');
      setUserIdOrUsername('');
      setDaysToLock(0);
      setLockAccount('');
    }
  }, [requestSubmmited, status]);
  const handleSubmiChangeRoleRequest = async (e) => {
    e.preventDefault();
    if (roleToChangeTo === '') return;
    try {
      await dispatch(
        updateUserRole({
          usernameOrId: userIdOrUsername,
          role: roleToChangeTo,
          jwtAccessToken,
        })
      ).unwrap();
    } finally {
      setRequestSubmmited(true);
    }
  };

  const handleUsernameOrIdChange = async (e) => {
    e.preventDefault();
    if (userIdOrUsername === '') return;

    await dispatch(
      checkAvailability({ username: userIdOrUsername, jwtAccessToken })
    ).unwrap();
  };

  const alertSnackBarType = useMemo(() => {
    if (requestSubmmited && status === 'success')
      return (
        <AlertSnackBar
          passedMessage="Your request has been succesfully submitted!"
          typeMessage="success"
          removeData={() => setRequestSubmmited(false)}
        />
      );
    if (requestSubmmited && status === 'failed')
      return (
        <AlertSnackBar
          passedMessage="Something went wrong with your request try again later!"
          typeMessage="error"
          removeData={() => setRequestSubmmited(false)}
        />
      );
    return null;
  }, [requestSubmmited, status]);

  const canRequestRoleChange =
    userIdOrUsername !== '' && roleToChangeTo !== '' && !nameAvailable;

  const canRequestLockAccount =
    userIdOrUsername !== '' && lockAccount !== '' && !nameAvailable;

  const canDeleteAccount =
    userIdOrUsername !== '' &&
    !nameAvailable &&
    !showAreYouSureModal &&
    userId !== userIdOrUsername &&
    userIdOrUsername !== username;
  const [openUserReports, setOpenUserReports] = useState(false);

  const handleOpenUserReports = async () => {
    try {
      await dispatch(
        listReportByIndividual({
          page: 0,
          size: 10,
          individual: individualType,
          userId: userIdOrUsername,
          jwtAccessToken,
        })
      ).unwrap();
    } finally {
      setOpenUserReports(true);
    }
  };

  const handleCloseUserReports = () => {
    setOpenUserReports(false);
  };

  const handleSubmiLockAccountRequest = async (e) => {
    e.preventDefault();
    if (!canRequestLockAccount) return;
    try {
      await dispatch(
        requestLockAccount({
          usernameOrId: userIdOrUsername,
          daysToLock,
          jwtAccessToken,
          accountLockedSwitch: lockAccount === 'UNLOCK',
        })
      ).unwrap();
    } finally {
      setRequestSubmmited(true);
    }
  };
  // const reports = [
  //   {
  //     reportId: '123',
  //     foreignId: '456',
  //     culpritUser: '789',
  //     victimUser: '101',
  //     resolvedBy: '112',
  //     typeOfForeignId: 'something',
  //     category: 'profanity',
  //     report:
  //       'here will be a description of the report, and this will be seen once clicked',
  //     resolveNote: 'Removed offensive language',
  //     reportDate: '2022-03-25',
  //     resolveDate: '2022-03-25',
  //     isResolved: 'Yes',
  //   },
  // ];

  const submitDeleteAccountRequest = async () => {
    if (userId === userIdOrUsername) {
      setShowAreYouSureModal(false);
    }
    try {
      await dispatch(
        deleteAccount({
          userIdOrUsername,
          jwtAccessToken,
        })
      ).unwrap();
    } finally {
      setRequestSubmmited(true);
      setShowAreYouSureModal(false);
    }
  };

  const canSearchReports =
    userIdOrUsername !== '' && !nameAvailable && individualType !== '';
  return (
    <>
      {showAreYouSureModal && (
        <AreYouSureModal
          open={showAreYouSureModal}
          onClose={() => setShowAreYouSureModal(false)}
          onConfirm={submitDeleteAccountRequest}
          title="Are you sure you want to delete the user account?"
          message="This action cannot be reverted!"
        />
      )}
      {alertSnackBarType}
      <form noValidate autoComplete="off">
        <Card
          variant="elevation"
          sx={{ border: 2, borderColor: 'black' }}
          raised
        >
          <CardHeader
            title="Search for a user"
            subheader="To Change the role, lock accounts or search for reports"
          />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: 2 }}>
              <Grid container spacing={3} direction="row">
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    value={userIdOrUsername}
                    onChange={(e) => setUserIdOrUsername(e.target.value)}
                    onBlur={handleUsernameOrIdChange}
                    variant="standard"
                    label="username or ID"
                    error={nameAvailable}
                    helperText="Search for a user by username or userId"
                    name="username"
                    required
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  container
                  direction="row"
                  justifyContent="space-between"
                >
                  <Grid item container direction="column">
                    <Grid item xs={6} md={6}>
                      <TextField
                        select
                        variant="standard"
                        fullWidth
                        label="Role"
                        helperText="change user role"
                        name="Role"
                        value={roleToChangeTo}
                        onChange={(e) => setRoleToChangeTo(e.target.value)}
                      >
                        <MenuItem value="">NONE</MenuItem>
                        <MenuItem value="ADMIN">ADMIN</MenuItem>
                        <MenuItem value="STUDENT">STUDENT</MenuItem>
                        <MenuItem value="TEACHER">TEACHER</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={6} md={6} alignSelf="end" sx={{ mt: 2 }}>
                      <Button
                        variant="contained"
                        type="button"
                        disabled={!canRequestRoleChange || status === 'pending'}
                        onClick={handleSubmiChangeRoleRequest}
                      >
                        SUBMIT
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  container
                  direction="row"
                  justifyContent="space-between"
                >
                  <Grid item container direction="column" xs={6} md={6}>
                    <Grid
                      item
                      container
                      direction="row"
                      justifyContent="space-between"
                      spacing={3}
                    >
                      <Grid item xs={12} md={12}>
                        <TextField
                          type="number"
                          variant="standard"
                          fullWidth
                          value={daysToLock}
                          onChange={(e) => setDaysToLock(e.target.value)}
                          inputProps={{
                            min: 0,
                            max: 365,
                          }}
                          label="days to lock account"
                          helperText="choose the number of days to lock the account"
                          name="daysToLockAccount"
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <TextField
                          select
                          type="text"
                          variant="standard"
                          fullWidth
                          label="Lock Account?"
                          helperText="lock account?"
                          name="lockAccount"
                          value={lockAccount}
                          onChange={(e) => setLockAccount(e.target.value)}
                        >
                          <MenuItem value="">NONE</MenuItem>
                          <MenuItem value="LOCK">LOCK</MenuItem>
                          <MenuItem value="UNLOCK">UNLOCK</MenuItem>
                        </TextField>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    direction="column"
                    spacing={2}
                    md={6}
                    xs={6}
                    alignSelf="center"
                  >
                    <Grid item xs={6} md={6} alignSelf="flex-end">
                      <Button
                        variant="contained"
                        sx={{ mt: 2 }}
                        disabled={
                          !canRequestLockAccount || status === 'pending'
                        }
                        onClick={handleSubmiLockAccountRequest}
                      >
                        SUBMIT
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  container
                  direction="row"
                  justifyContent="space-between"
                >
                  <Grid item container direction="column">
                    <Grid item xs={12} md={12}>
                      <TextField
                        select
                        variant="standard"
                        fullWidth
                        label="Individual"
                        helperText="Type of indvidual to search reports by (make sure to pass a userId first)"
                        name="Individual Type"
                        value={individualType}
                        onChange={(e) => setIndividualType(e.target.value)}
                      >
                        <MenuItem value="">NONE</MenuItem>
                        <MenuItem value="victum">VICTUM</MenuItem>
                        <MenuItem value="culprit">CULPRIT</MenuItem>
                        <MenuItem value="resolver">RESOLVER</MenuItem>
                      </TextField>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Button
                    fullWidth
                    color="error"
                    variant="contained"
                    label="Delete Account"
                    disabled={!canDeleteAccount || status === 'pending'}
                    onDoubleClick={() => setShowAreYouSureModal(true)}
                  >
                    DELETE ACCOUNT
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <Divider color="#0000FF" />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="success"
              size="large"
              disabled={status === 'pending' || !canSearchReports}
              onClick={handleOpenUserReports}
            >
              Search Reports
            </Button>
            <UserSearchModal
              reports={filteredReports}
              open={openUserReports}
              handleClose={handleCloseUserReports}
            />
          </CardActions>
        </Card>
      </form>
    </>
  );
}
