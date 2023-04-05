// api
import { get, post, put, destroy } from './base';

export const PUBLIC_ENDPOINT_ROUTE = '/note';

export const noteEndpoints = {
  listSharedToo: (userId, noteId, page, size, sortBy, jwtAccessToken) =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/listSharedToo`, {
      params: { userId, noteId, page, size, sortBy },
      headers: {
        Authorization: 'Bearer ' + jwtAccessToken,
      },
    }),
  listSharedNotes: (page, size, sortBy, userId, jwtAccessToken, title) =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/listSharedNotes`, {
      params: { page, size, sortBy, userId, title },
      headers: {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + jwtAccessToken,
      },
    }),
  listPublicNotes: (page, size, sortBy, userId, jwtAccessToken, title) =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/listPublicNotes`, {
      params: { page, size, sortBy, userId, title },
      headers: {
        Authorization: 'Bearer ' + jwtAccessToken,
      },
    }),
  listUserNotes: (page, size, sortBy, userId, jwtAccessToken, title) =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/listUserNotes`, {
      params: { page, size, sortBy, userId, title },
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtAccessToken,
      },
    }),
  getPublicNotes: (noteId, jwtAccessToken) =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/getPublicNotes`, {
      params: { noteId },
      headers: {
        Authorization: 'Bearer ' + jwtAccessToken,
      },
    }),
  getShareNotePage: (userId, noteId, shareId, jwtAccessToken) =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/getShareNotePage`, {
      params: { userId, noteId, shareId },
      headers: {
        Authorization: 'Bearer ' + jwtAccessToken,
      },
    }),
  getUserNote: (userId, noteId, jwtAccessToken) =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/userNotes`, {
      params: { userId, noteId },
      headers: {
        Authorization: 'Bearer ' + jwtAccessToken,
      },
    }),
  //  CANNOT MAKE NOTE PUBLIC WHEN CREATING.

  // END OF GET API
  //   START OF POST API

  createUserNote: (title, noteBody, userId, jwtAccessToken) =>
    post(
      `${PUBLIC_ENDPOINT_ROUTE}/create`, // DONT NEED ANYTHING ELSE, THE DATES ARE SET IN BACKEND
      {
        title,
        noteBody,
        createdBy: {
          userId,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwtAccessToken,
        },
      }
    ),
  savePublicNote: (userId, noteId, jwtAccessToken) =>
    post(`${PUBLIC_ENDPOINT_ROUTE}/savePublicNote`, null, {
      params: { userId, noteId },
      headers: {
        Authorization: 'Bearer ' + jwtAccessToken,
      },
    }),
  publicizeNote: (description, userNoteDTO, jwtAccessToken) =>
    post(
      `${PUBLIC_ENDPOINT_ROUTE}/publicizeNote`, // dont need anything else.
      {
        description,
        userNoteDTO, // for userNoteDTO only need the noteId
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwtAccessToken,
        },
      }
    ),
  shareNote: (noteShareDTO, userNoteDTO, jwtAccessToken) =>
    post(
      `${PUBLIC_ENDPOINT_ROUTE}/shareNote`,
      {
        noteShareDTO, // need shareToUsername & numberOfDaysToShare. the dates will be set in backend
        userNoteDTO, // only need noteId and nothing else
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwtAccessToken,
        },
      }
    ),

  // END OF POST API
  // START OF PUT API STUFF

  updateUserNote: (
    userNoteDTO,
    jwtAccessToken // title, body, & noteId
  ) =>
    put(
      `${PUBLIC_ENDPOINT_ROUTE}/update`,
      {
        noteId: userNoteDTO.noteId,
        title: userNoteDTO.title,
        noteBody: userNoteDTO.noteBody,
        createdBy: {
          userId: userNoteDTO.createdBy.userId,
        },
        // dont need createdBy
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwtAccessToken,
        },
      }
    ),
  updateSharedUserNote: (fullShareNoteDTO, jwtAccessToken) =>
    put(
      `${PUBLIC_ENDPOINT_ROUTE}/updateShareNote`,
      {
        // THIS IS WHAT IS NEEDED
        // userNoteDTO -> noteId
        //                 noteBody
        //                 Title
        // getNoteShareDTO -> shareId
        noteShareDTO: {
          shareId: fullShareNoteDTO?.noteShareDTO?.shareId,
        },
        userNoteDTO: {
          noteId: fullShareNoteDTO?.userNoteDTO?.noteId,
          title: fullShareNoteDTO?.userNoteDTO?.title,
          noteBody: fullShareNoteDTO?.userNoteDTO?.noteBody,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwtAccessToken,
        },
      }
    ),
  updateEditPermission: (userId, shareId, jwtAccessToken) =>
    put(`${PUBLIC_ENDPOINT_ROUTE}/updateEditPermission`, null, {
      params: { userId, shareId },
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtAccessToken,
      },
    }),
  updateExpireDateOnSharedNotes: (noteShareDTO, jwtAccessToken) =>
    put(
      `${PUBLIC_ENDPOINT_ROUTE}/updateExpireDate`,
      {
        shareId: noteShareDTO?.shareId,
        numberOfDaysToShare: noteShareDTO?.numberOfDaysToShare,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwtAccessToken,
        },
      }
    ),
  updatePublicNote: (publicNoteDTO, jwtAccessToken) =>
    put(
      `${PUBLIC_ENDPOINT_ROUTE}/updatePublicNote`,
      {
        // UserNoteDTO -> noteId
        // description
        description: publicNoteDTO?.description,
        userNoteDTO: {
          noteId: publicNoteDTO?.userNoteDTO.noteId,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwtAccessToken,
        },
      }
    ),

  // END OF PUT API
  // START OF DELETE (DESTROY) API

  privateNote: (userNoteDTO, jwtAccessToken) =>
    put(
      `${PUBLIC_ENDPOINT_ROUTE}/privateNote`,
      {
        userNoteDTO,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwtAccessToken,
        },
      }
    ),
  deletePublicNoteByAdmin: (publicNoteDTO, jwtAccessToken) =>
    destroy(
      `${PUBLIC_ENDPOINT_ROUTE}/deletePublicNoteAdmin`,
      {
        userNoteDTO: {
          noteId: publicNoteDTO?.userNoteDTO.noteId,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwtAccessToken,
        },
      }
    ),
  deleteNote: (userId, noteId, jwtAccessToken) =>
    destroy(`${PUBLIC_ENDPOINT_ROUTE}/delete`, {
      params: { userId, noteId },
      headers: {
        Authorization: 'Bearer ' + jwtAccessToken,
      },
    }),
  unShareNote: (shareId, jwtAccessToken) =>
    destroy(`${PUBLIC_ENDPOINT_ROUTE}/UnShareNote`, {
      params: { shareId },
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtAccessToken,
      },
    }),
};
