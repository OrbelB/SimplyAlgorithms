/* eslint-disable import/prefer-default-export */
// service
import { createAsyncThunk } from '@reduxjs/toolkit';
import { noteEndpoints } from './Api/note';

export const listSharedToo = createAsyncThunk(
  'note/listSharedToo',
  async (pageParams) => {
    const { userId, noteId, page, size, sortBy, accessToken } = pageParams;
    const response = await noteEndpoints.listSharedToo(
      userId,
      noteId,
      page,
      size,
      sortBy,
      accessToken
    );
    return response.data;
  }
);

export const listSharedNotes = createAsyncThunk(
  'note/listSharedNotes',
  async (pageParams) => {
    const { page, size, sortBy, userId, accessToken } = pageParams;
    const response = await noteEndpoints.listSharedNotes(
      page,
      size,
      sortBy,
      userId,
      accessToken
    );
    return response.data;
  }
);

export const listPublicNotes = createAsyncThunk(
  'note/listPublicNote',
  async (pageParams) => {
    const { page, size, sortBy, userId, accessToken } = pageParams;
    const response = await noteEndpoints.listPublicNotes(
      page,
      size,
      sortBy,
      userId,
      accessToken
    );
    return response.data;
  }
);

export const getPublicNote = createAsyncThunk(
  'note/getPublicNote',
  async (parm) => {
    const { noteId, accessToken } = parm;
    const response = await noteEndpoints
      .getPublicNotes(noteId, accessToken)
      .catch((error) => {
        return error;
      });
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
  const res = await noteEndpoints
    .getUserNote(userId, noteId, accessToken)
    .catch((error) => {
      return error;
    });
  return res.data;
});

export const createUserNote = createAsyncThunk('note/create', async (parm) => {
  const { userNoteDTO, accessToken } = parm;
  const res = await noteEndpoints
    .createUserNote(userNoteDTO, accessToken)
    .catch((error) => {
      return error;
    });
  return res.data;
});

export const savePublicNote = createAsyncThunk(
  'note/savePublicNote',
  async (parm) => {
    const { userId, noteId, accessToken } = parm;
    const res = await noteEndpoints
      .savePublicNote(userId, noteId, accessToken)
      .catch((error) => {
        return error;
      });
    return res.data;
  }
);

export const publicizeNote = createAsyncThunk(
  'note/publicizeNote',
  async (parm) => {
    const { description, userNoteDTO, accessToken } = parm;
    const res = await noteEndpoints
      .publicizeNote(description, userNoteDTO, accessToken)
      .catch((error) => {
        return error;
      });
    return res.data;
  }
);

export const shareNote = createAsyncThunk('note/shareNote', async (parm) => {
  const { noteShareDTO, userNoteDTO, accessToken } = parm;
  const res = await noteEndpoints
    .shareNote(noteShareDTO, userNoteDTO, accessToken)
    .catch((error) => {
      return error;
    });
  return res.data;
});

export const updateUserNote = createAsyncThunk(
  'note/update',
  async (parmesan) => {
    const { userNoteDTO, accessToken } = parmesan;
    const res = await noteEndpoints
      .updateUserNote(userNoteDTO, accessToken)
      .catch((error) => {
        return error;
      });
    return res.data;
  }
);

export const updateSharedUserNote = createAsyncThunk(
  'note/updateShareNote',
  async (par) => {
    const { fullShareNoteDTO, accessToken } = par;
    const res = await noteEndpoints
      .updateSharedUserNote(fullShareNoteDTO, accessToken)
      .catch((error) => {
        return error;
      });
    return res.data;
  }
);

export const updateEditPermission = createAsyncThunk(
  'note/updateEditPermission',
  async (par) => {
    const { userId, shareId, accessToken } = par;
    const res = await noteEndpoints
      .updateEditPermission(userId, shareId, accessToken)
      .catch((error) => {
        return error;
      });
    return res.data;
  }
);

export const updateExpireDateOnSharedNotes = createAsyncThunk(
  'note/updateExpireDate',
  async (par) => {
    const { noteShareDTO, accessToken } = par;
    const res = await noteEndpoints
      .updateExpireDateOnSharedNotes(noteShareDTO, accessToken)
      .catch((error) => {
        return error;
      });
    return res.data;
  }
);

export const exportPublicNote = createAsyncThunk(
  'note/updatePublicNote',
  async (par) => {
    const { publicNoteDTO, accessToken } = par;
    const res = await noteEndpoints
      .updatePublicNote(publicNoteDTO, accessToken)
      .catch((error) => {
        return error;
      });
    return res.data;
  }
);

export const privateNote = createAsyncThunk('note/privateNote', async (par) => {
  const { publicNoteDTO, accessToken } = par;
  const res = await noteEndpoints
    .privateNote(publicNoteDTO, accessToken)
    .catch((error) => {
      return error;
    });
  return res.data;
});

// for admin dashboard
export const deletePublicNoteByAdmin = createAsyncThunk(
  'note/deletePublicNoteAdmin',
  async (par) => {
    const { publicNoteDTO, accessToken } = par;
    const res = await noteEndpoints
      .deletePublicNoteByAdmin(publicNoteDTO, accessToken)
      .catch((error) => {
        return error;
      });
    return res.data;
  }
);

export const deleteNote = createAsyncThunk('note/delete', async (par) => {
  const { userId, noteId, accessToken } = par;
  const res = await publicizeNote
    .deleteNote(userId, noteId, accessToken)
    .catch((error) => {
      return error;
    });
  return res.data;
});

export const unShareNote = createAsyncThunk('note/unShareNote', async (par) => {
  const { shareId, accessToken } = par;
  const res = await noteEndpoints
    .unShareNote(shareId, accessToken)
    .catch((error) => {
      return error;
    });
  return res.data;
});
