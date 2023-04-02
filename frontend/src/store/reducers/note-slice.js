import { createSlice } from '@reduxjs/toolkit';
import {
  createUserNote,
  deleteNote,
  listPublicNotes,
  listSharedNotes,
  getUserNote,
  updateUserNote,
  listUserNotes,
  privateNote,
  publicizeNote,
  listSharedToo,
  shareNote,
  unShareNote,
  updateEditPermission,
  updateSharedUserNote,
} from '../../services/note';

const initialState = {
  status: 'idle',
  error: '',
  publicNotes: [],
  currentPublicNotePage: undefined,
  totalPublicNotePages: undefined,
  privateNotes: [],
  currentPrivateNotePage: undefined,
  totalPrivateNotePages: undefined,
  sharedNotes: [],
  currentSharedNotePage: undefined,
  totalSharedNotePages: undefined,
  sharedToo: [],
  currentSharedTooPage: undefined,
  totalSharedTooPages: undefined,
};

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    resetData: (state) => {
      state.status = 'idle';
      state.error = '';
      state.publicNotes = [];
      state.currentPublicNotePage = undefined;
      state.totalPublicNotePages = undefined;
      state.privateNotes = [];
      state.currentPrivateNotePage = undefined;
      state.totalPrivateNotePages = undefined;
      state.sharedNotes = [];
      state.currentSharedNotePage = undefined;
      state.totalSharedNotePages = undefined;
      state.sharedToo = [];
      state.currentSharedTooPage = undefined;
      state.totalSharedTooPages = undefined;
    },
    updateSharedEditPermission: (state, action) => {
      state.sharedToo = state.sharedToo.map((shared) => {
        if (shared.shareId === action.payload.shareId) {
          return {
            ...shared,
            canEdit: action.payload.canEdit === 'Edit',
          };
        }
        return shared;
      });
    },
    updateCurrentPrivateNotePage: (state) => {
      state.currentPrivateNotePage += 1;
    },
    updateCurrentPublicNotePage: (state) => {
      state.currentPublicNotePage += 1;
    },
    updateCurrentSharedNotePage: (state) => {
      state.currentSharedNotePage += 1;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(listPublicNotes.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(listPublicNotes.fulfilled, (state, action) => {
        state.status = 'success';
        const existingIds = new Set(
          state.publicNotes.map((note) => note.publicShareId)
        );
        state.publicNotes = [
          ...state.publicNotes.map((note) => {
            const updateNote = action.payload.content.find(
              (n) => n.publicShareId === note.publicShareId
            );
            return updateNote ?? note;
          }),
          ...action.payload.content.filter(
            (note) => !existingIds.has(note.publicShareId)
          ),
        ];
        state.currentPublicNotePage = action.payload.number;
        state.totalPublicNotePages = action.payload.totalPages;
      })
      .addCase(listPublicNotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(listSharedNotes.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(listSharedNotes.fulfilled, (state, action) => {
        state.status = 'success';
        const existingIds = new Set(
          state.sharedNotes.map((note) => note.noteShareDTO.shareId)
        );
        state.sharedNotes = [
          ...state.sharedNotes.map((note) => {
            const updateNote = action.payload.content.find(
              (n) => n.noteShareDTO.shareId === note.noteShareDTO.shareId
            );
            return updateNote ?? note;
          }),
          ...action.payload.content.filter(
            (note) => !existingIds.has(note.noteShareDTO.shareId)
          ),
        ];
        state.currentSharedNotePage = action.payload.number;
        state.totalSharedNotePages = action.payload.totalPages;
      })
      .addCase(listSharedNotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getUserNote.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getUserNote.fulfilled, (state, action) => {
        state.status = 'success';
        state.privateNotes = action.payload.content;
        state.currentPrivateNotePage = action.payload.number;
        state.totalPrivateNotePages = action.payload.totalPages;
      })
      .addCase(getUserNote.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createUserNote.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(createUserNote.fulfilled, (state, action) => {
        state.status = 'success';
        state.privateNotes = [action.payload, ...state.privateNotes];
      })
      .addCase(createUserNote.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateUserNote.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(updateUserNote.fulfilled, (state, action) => {
        state.status = 'success';
        state.privateNotes = state.privateNotes.map((note) => {
          if (note.noteId === action.payload.noteId) {
            return action.payload;
          }
          return note;
        });
      })
      .addCase(updateUserNote.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteNote.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.status = 'success';
        state.privateNotes = state.privateNotes.filter(
          (note) => note.noteId !== action.payload
        );
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(listUserNotes.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(listUserNotes.fulfilled, (state, action) => {
        state.status = 'success';
        // create a Set of existing note IDs to iterate over later
        const existingNoteIds = new Set(
          state.privateNotes.map((note) => note.noteId)
        );

        // update existing notes and add new notes
        state.privateNotes = [
          ...state.privateNotes.map((note) => {
            const newNote = action.payload.content.find(
              (n) => n.noteId === note.noteId
            );
            return newNote || note;
          }),
          ...action.payload.content.filter(
            (note) => !existingNoteIds.has(note.noteId)
          ),
        ];
        state.currentPrivateNotePage = action.payload.number;
        state.totalPrivateNotePages = action.payload.totalPages;
      })
      .addCase(listUserNotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(privateNote.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(privateNote.fulfilled, (state, action) => {
        state.status = 'success';
        state.privateNotes = state.privateNotes.map((note) => {
          if (note.noteId === action.payload.noteId) {
            return action.payload;
          }
          return note;
        });
      })
      .addCase(privateNote.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(publicizeNote.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(publicizeNote.fulfilled, (state, action) => {
        state.status = 'success';
        state.privateNotes = state.privateNotes.map((note) => {
          if (note.noteId === action.payload.userNoteDTO.noteId) {
            return action.payload.userNoteDTO;
          }
          return note;
        });
      })
      .addCase(publicizeNote.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(shareNote.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(shareNote.fulfilled, (state, action) => {
        state.status = 'success';
        state.sharedToo = [action.payload, ...state.sharedToo];
      })
      .addCase(shareNote.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(listSharedToo.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(listSharedToo.fulfilled, (state, action) => {
        state.status = 'success';
        const existingIds = new Set(
          state.sharedToo.map((note) => note.shareId)
        );
        state.sharedToo = [
          ...state.sharedToo.map((note) => {
            const sharedToo = action.payload.content.find(
              (n) => n.shareId === note.shareId
            );
            return sharedToo ?? note;
          }),
          ...action.payload.content.filter(
            (note) => !existingIds.has(note.shareId)
          ),
        ];
        state.currentSharedTooPage = action.payload.number;
        state.totalSharedTooPages = action.payload.totalPages;
      })
      .addCase(listSharedToo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(unShareNote.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(unShareNote.fulfilled, (state, action) => {
        state.status = 'success';
        state.sharedToo = state.sharedToo.filter(
          (note) => note.shareId !== action.payload
        );
      })
      .addCase(unShareNote.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateEditPermission.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(updateEditPermission.fulfilled, (state, action) => {
        state.status = 'success';
        state.sharedToo = state.sharedToo.map((note) => {
          if (note.shareId === action.payload) {
            // do something here
          }
          return note;
        });
      })
      .addCase(updateEditPermission.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateSharedUserNote.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(updateSharedUserNote.fulfilled, (state, action) => {
        state.status = 'success';
        state.sharedNotes = state.sharedNotes.map((note) => {
          if (
            note.noteShareDTO.shareId === action.payload.noteShareDTO.shareId
          ) {
            return action.payload;
          }
          return note;
        });
      })
      .addCase(updateSharedUserNote.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  resetData,
  updateSharedEditPermission,
  updateCurrentPrivateNotePage,
  updateCurrentPublicNotePage,
  updateCurrentSharedNotePage,
} = noteSlice.actions;
