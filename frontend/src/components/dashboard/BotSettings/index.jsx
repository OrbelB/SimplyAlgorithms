import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Box,
  TextField,
  MenuItem,
  Button,
  Divider,
  CardActions,
} from '@mui/material';
import { useEffect, useState, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AreYouSureModal from '../../AreYourSureModal/AreYouSureModal';
import { fetchBot, updateBot } from '../../../services/bot';

const initialFormState = {
  chattyDesc: '',
  maxInputToken: 0,
  maxOutputToken: 0,
  delateSetting: 0,
  temperature: 0.0,
  remainingDelays: 0,
  maxReplies: 0,
  profileEnabled: 0,
  model: '',
  apiURL: '',
  updateState: true,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'chattyDesc':
      return { ...state, chattyDesc: action.payload };
    case 'maxInputToken': {
      const parsedNumber = parseInt(action.payload, 10);
      if (Number.isNaN(parsedNumber)) return state;
      if (parsedNumber < 50 || parsedNumber > 2048) return state;
      return { ...state, maxInputToken: action.payload };
    }
    case 'maxOutputToken':
      return { ...state, maxOutputToken: action.payload };
    case 'delateSetting':
      return { ...state, delateSetting: action.payload };
    case 'temperature':
      return { ...state, temperature: action.payload };
    case 'remainingDelays':
      return { ...state, remainingDelays: action.payload };
    case 'maxReplies': {
      const parsedNumber = parseInt(action.payload, 10);
      if (Number.isNaN(parsedNumber)) return state;
      return { ...state, maxReplies: action.payload };
    }
    case 'profileEnabled':
      return { ...state, profileEnabled: action.payload };
    case 'model':
      return { ...state, model: action.payload };
    case 'apiURL':
      return { ...state, apiURL: action.payload };
    case 'updateState':
      return { ...state, updateState: action.payload };
    case 'reset':
      return initialFormState;
    default:
      return state;
  }
};

export default function BotSettings() {
  const dispatch = useDispatch();

  const [formState, formDispatch] = useReducer(formReducer, initialFormState);
  const { bot, status } = useSelector((state) => state.bot);

  const jwtAccessToken = useSelector((state) => state.auth.jwtAccessToken);
  const [showAreYouSureModal, setShowAreYouSureModal] = useState(false);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBot({ jwtAccessToken }));
      formDispatch({ type: 'updateState', payload: true });
    }
  }, [status, dispatch, jwtAccessToken]);

  useEffect(() => {
    if (bot && formState.updateState && status === 'success') {
      formDispatch({ type: 'chattyDesc', payload: bot?.chattyDesc });
      formDispatch({ type: 'maxInputToken', payload: bot?.maxInputToken });
      formDispatch({ type: 'maxOutputToken', payload: bot?.maxOutputToken });
      formDispatch({ type: 'delateSetting', payload: bot?.delateSetting });
      formDispatch({ type: 'temperature', payload: bot?.temperature });
      formDispatch({ type: 'remainingDelays', payload: bot?.remainingDelays });
      formDispatch({ type: 'maxReplies', payload: bot?.maxReplies });
      formDispatch({ type: 'profileEnabled', payload: bot?.profileEnabled });
      formDispatch({ type: 'model', payload: bot?.model });
      formDispatch({ type: 'apiURL', payload: bot?.apiURL });
      formDispatch({ type: 'updateState', payload: false });
    }
  }, [bot, formState.updateState, status]);

  const handleSaveBotChanges = async () => {
    const updatedBot = { ...formState };
    setShowAreYouSureModal(false);
    try {
      await dispatch(updateBot({ jwtAccessToken, updatedBot })).unwrap();
      formDispatch({ type: 'reset' });
    } finally {
      formDispatch({ type: 'updateState', payload: true });
    }
  };

  return (
    <>
      {showAreYouSureModal && (
        <AreYouSureModal
          open={showAreYouSureModal}
          onClose={() => setShowAreYouSureModal(false)}
          onConfirm={handleSaveBotChanges}
          title="Are you sure you change the current bot settings?"
          message="This action cannot be reverted!"
        />
      )}
      <Card variant="elevation" sx={{ border: 2, borderColor: 'black' }} raised>
        <CardHeader
          title="Bot Settings"
          subheader="Change the settings of the OPENAI bot here"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: 2 }}>
            <Grid container spacing={3} direction="row">
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  readOnly
                  value={bot?.chattyId || ''}
                  variant="standard"
                  helperText="This is Chatty's name"
                  name="botName"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  value={formState.chattyDesc}
                  onChange={(e) =>
                    formDispatch({
                      type: 'chattyDesc',
                      payload: e.target.value,
                    })
                  }
                  variant="standard"
                  label="Description"
                  helperText="Change Chatty's Description"
                  name="description"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  required
                  type="number"
                  inputProps={{
                    min: 50,
                    max: 2000,
                  }}
                  value={formState.maxInputToken}
                  onChange={(e) =>
                    formDispatch({
                      type: 'maxInputToken',
                      payload: e.target.valueAsNumber,
                    })
                  }
                  variant="standard"
                  label="max input token"
                  helperText="This is the max amount of tokens that can be sent to Chatty"
                  name="description"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  required
                  type="number"
                  inputProps={{
                    min: 50,
                    max: 2000,
                  }}
                  value={formState.maxOutputToken}
                  onChange={(e) =>
                    formDispatch({
                      type: 'maxOutputToken',
                      payload: e.target.valueAsNumber,
                    })
                  }
                  variant="standard"
                  label="max output token"
                  helperText="This is the max amount of tokens that can be generated by Chatty (not being used yet)"
                  name="outPutToken"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  required
                  type="number"
                  inputProps={{
                    min: 0,
                    max: 96,
                  }}
                  value={formState.delateSetting}
                  onChange={(e) =>
                    formDispatch({
                      type: 'delateSetting',
                      payload: e.target.valueAsNumber,
                    })
                  }
                  variant="standard"
                  label="delay settings"
                  helperText="This will delay the task scheduler to run every x seconds"
                  name="delaySettings"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  required
                  type="number"
                  inputProps={{
                    min: 0,
                    max: 96,
                  }}
                  value={formState.remainingDelays}
                  onChange={(e) =>
                    formDispatch({
                      type: 'remainingDelays',
                      payload: e.target.valueAsNumber,
                    })
                  }
                  variant="standard"
                  label="remaining delays"
                  helperText="This will delay the task scheduler to run every x seconds"
                  name="remainingDelays"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  required
                  type="number"
                  inputProps={{
                    min: 0,
                    max: 500,
                  }}
                  value={formState.maxReplies}
                  onChange={(e) =>
                    formDispatch({
                      type: 'maxReplies',
                      payload: e.target.valueAsNumber,
                    })
                  }
                  variant="standard"
                  label="max replies"
                  helperText="This is the amount of replies chatty can do per call"
                  name="maxReplies"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  select
                  variant="standard"
                  label="Enable bot"
                  helperText="This will enable or disable the bot"
                  value={formState.profileEnabled}
                  onChange={(e) =>
                    formDispatch({
                      type: 'profileEnabled',
                      payload: e.target.value,
                    })
                  }
                >
                  <MenuItem value={1}>True</MenuItem>
                  <MenuItem value={0}>False</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  required
                  variant="standard"
                  label="model"
                  helperText="This is the model to use from OpenAI"
                  value={formState.model}
                  onChange={(e) =>
                    formDispatch({
                      type: 'model',
                      payload: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  required
                  type="number"
                  variant="standard"
                  label="Temperature"
                  helperText="This sets up the randomness of the model"
                  value={formState.temperature}
                  onChange={(e) =>
                    formDispatch({
                      type: 'temperature',
                      payload: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  variant="standard"
                  label="API URL"
                  helperText="This is the url of the model to use from OPENAI"
                  value={formState.apiURL}
                  onChange={(e) =>
                    formDispatch({
                      type: 'apiURL',
                      payload: e.target.value,
                    })
                  }
                />
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
            disabled={status === 'loading'}
            onClick={() => setShowAreYouSureModal(true)}
          >
            Save Changes
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
