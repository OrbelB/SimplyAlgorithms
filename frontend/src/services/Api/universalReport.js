import { get, post, put, destroy } from './base';

export const PUBLIC_ENDPOINT_ROUTE = '/report';

export const universalReportEndpoint = {
  createReport: (universalReportDTO, jwtAccessToken) =>
    post(
      `${PUBLIC_ENDPOINT_ROUTE}/createReport`,
      {
        foreignId: universalReportDTO?.foreignId,
        culpritUser: universalReportDTO?.culpritUser,
        victimUser: universalReportDTO?.victimUser,
        typeOfForeignId: universalReportDTO?.typeOfForeignId,
        catagory: universalReportDTO?.catagory,
        report: universalReportDTO?.report,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtAccessToken}`,
        },
      }
    ),
  updateReport: (universalReportDTO, jwtAccessToken) =>
    put(
      `${PUBLIC_ENDPOINT_ROUTE}/updateReport`,
      {
        reportId: universalReportDTO?.reportId,
        foreignId: universalReportDTO?.foreignId,
        culpritUser: universalReportDTO?.culpritUser,
        victimUser: universalReportDTO?.victimUser,
        typeOfForeignId: universalReportDTO?.typeOfForeignId,
        catagory: universalReportDTO?.catagory,
        report: universalReportDTO?.report,
        resolvedBy: universalReportDTO?.resolveDate,
        resolveNote: universalReportDTO?.resolveNote,
        isResolved: universalReportDTO?.isResolved,
        resolveDate: universalReportDTO?.resolveDate,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtAccessToken}`,
        },
      }
    ),
  deleteReport: (reportId, jwtAccessToken) =>
    destroy(`${PUBLIC_ENDPOINT_ROUTE}/deleteReport`, {
      params: { reportId },
      headers: {
        Authorization: 'Bearer ' + jwtAccessToken,
      },
    }),
  getReport: (reportId, jwtAccessToken) =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/getReport`, {
      params: { reportId },
      headers: {
        Authorization: 'Bearer ' + jwtAccessToken,
      },
    }),
  listReports: (page, size, sortBy, jwtAccessToken) =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/listReports`, {
      params: { page, size, sortBy },
      headers: {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + jwtAccessToken,
      },
    }),
  listReportByIndividual: (
    page,
    size,
    sortBy,
    userId,
    individual,
    jwtAccessToken
  ) =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/listIndividualReports`, {
      params: { page, size, sortBy, userId, individual },
      headers: {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + jwtAccessToken,
      },
    }),
};
