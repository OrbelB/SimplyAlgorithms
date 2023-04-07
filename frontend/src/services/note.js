// service
import { createAsyncThunk } from '@reduxjs/toolkit';
import { noteEndpoints } from './Api/note';

export const listSharedToo = createAsyncThunk(
  'note/listSharedToo',
  async (pageParams) => {
    const { userId, noteId, page, size, sortBy, jwtAccessToken } = pageParams;
    const response = await noteEndpoints.listSharedToo(
      userId,
      noteId,
      page,
      size,
      sortBy,
      jwtAccessToken
    );
    return response.data;
  }
);

export const listSharedNotes = createAsyncThunk(
  'note/listSharedNotes',
  async (pageParams) => {
    const { page, size, sortBy, userId, jwtAccessToken, title } = pageParams;
    const response = await noteEndpoints.listSharedNotes(
      page,
      size,
      sortBy,
      userId,
      jwtAccessToken,
      title
    );

    return response.data;
  }
);

export const listPublicNotes = createAsyncThunk(
  'note/listPublicNote',
  async (pageParams) => {
    const { page, size, sortBy, userId, jwtAccessToken, title } = pageParams;
    const response = await noteEndpoints
      .listPublicNotes(page, size, sortBy, userId, jwtAccessToken, title)
      .catch((error) => {
        return error;
      });
    return response.data;
  }
);

export const getPublicNote = createAsyncThunk(
  'note/getPublicNote',
  async (parm) => {
    const { noteId, accessToken } = parm;
    const response = await noteEndpoints.getPublicNotes(noteId, accessToken);

    return response.data;
  }
);

export const getSharedNote = createAsyncThunk(
  'note/getSharedNotePage',
  async (parm) => {
    const { userId, noteId, shareId, accessToken } = parm;
    const response = await noteEndpoints
      .getShareNotePage(userId, noteId, shareId, accessToken)
      .catch((error) => {
        return error;
      });
    return response.data;
  }
);

export const getUserNote = createAsyncThunk('note/userNote', async (parm) => {
  const { userId, noteId, accessToken } = parm;
  const res = await noteEndpoints.getUserNote(userId, noteId, accessToken);

  return res.data;
});

export const createUserNote = createAsyncThunk('note/create', async (parm) => {
  const { title, noteBody, userId, jwtAccessToken } = parm;
  const res = await noteEndpoints.createUserNote(
    title,
    noteBody,
    userId,
    jwtAccessToken
  );
  return res.data;
});

export const listUserNotes = createAsyncThunk(
  'note/listUserNotes',
  async (pageParams) => {
    const { page, size, sortBy, userId, jwtAccessToken, title } = pageParams;
    const response = await noteEndpoints.listUserNotes(
      page,
      size,
      sortBy,
      userId,
      jwtAccessToken,
      title
    );
    return response.data;
  }
);

export const savePublicNote = createAsyncThunk(
  'note/savePublicNote',
  async (parm) => {
    const { userId, noteId, jwtAccessToken } = parm;
    const res = await noteEndpoints.savePublicNote(
      userId,
      noteId,
      jwtAccessToken
    );

    return res.data;
  }
);

export const publicizeNote = createAsyncThunk(
  'note/publicizeNote',
  async (parm) => {
    const { description, userNoteDTO, jwtAccessToken } = parm;
    const res = await noteEndpoints.publicizeNote(
      description,
      userNoteDTO,
      jwtAccessToken
    );

    return res.data;
  }
);

export const shareNote = createAsyncThunk('note/shareNote', async (parm) => {
  const { noteShareDTO, userNoteDTO, jwtAccessToken } = parm;
  const res = await noteEndpoints.shareNote(
    noteShareDTO,
    userNoteDTO,
    jwtAccessToken
  );

  return res.data;
});

export const updateUserNote = createAsyncThunk(
  'note/update',
  async (parmesan) => {
    const { userNoteDTO, jwtAccessToken } = parmesan;
    const res = await noteEndpoints
      .updateUserNote(userNoteDTO, jwtAccessToken)
      .catch((error) => {
        return error;
      });
    return res.data;
  }
);

export const updateSharedUserNote = createAsyncThunk(
  'note/updateShareNote',
  async (par) => {
    const { fullShareNoteDTO, jwtAccessToken } = par;
    const res = await noteEndpoints.updateSharedUserNote(
      fullShareNoteDTO,
      jwtAccessToken
    );

    return res.data;
  }
);

export const updateEditPermission = createAsyncThunk(
  'note/updateEditPermission',
  async (par) => {
    const { userId, shareId, jwtAccessToken } = par;
    const res = await noteEndpoints.updateEditPermission(
      userId,
      shareId,
      jwtAccessToken
    );

    return res.data;
  }
);

export const updateExpireDateOnSharedNotes = createAsyncThunk(
  'note/updateExpireDate',
  async (par) => {
    const { noteShareDTO, jwtAccessToken } = par;
    const res = await noteEndpoints.updateExpireDateOnSharedNotes(
      noteShareDTO,
      jwtAccessToken
    );

    return res.data;
  }
);

export const exportPublicNote = createAsyncThunk(
  'note/updatePublicNote',
  async (par) => {
    const { publicNoteDTO, accessToken } = par;
    const res = await noteEndpoints.updatePublicNote(
      publicNoteDTO,
      accessToken
    );

    return res.data;
  }
);

export const privateNote = createAsyncThunk('note/privateNote', async (par) => {
  const { userNoteDTO, jwtAccessToken } = par;
  const res = await noteEndpoints.privateNote(userNoteDTO, jwtAccessToken);

  return res.data;
});

// for admin dashboard
export const deletePublicNoteByAdmin = createAsyncThunk(
  'note/deletePublicNoteAdmin',
  async (par) => {
    const { publicNoteDTO, accessToken } = par;
    const res = await noteEndpoints.deletePublicNoteByAdmin(
      publicNoteDTO,
      accessToken
    );

    return res.data;
  }
);

export const deleteNote = createAsyncThunk('note/delete', async (par) => {
  const { userId, noteId, jwtAccessToken } = par;
  const res = await noteEndpoints.deleteNote(userId, noteId, jwtAccessToken);
  return res.data;
});

export const unShareNote = createAsyncThunk('note/unShareNote', async (par) => {
  const { shareId, jwtAccessToken } = par;
  const res = await noteEndpoints.unShareNote(shareId, jwtAccessToken);

  return res.data;
});
