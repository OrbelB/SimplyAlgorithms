import { createAsyncThunk } from '@reduxjs/toolkit';
import { universalReportEndpoint } from './Api/universalReport';

export const createReport = createAsyncThunk(
  'report/createReport',
  async (parm) => {
    const { universalReportDTO, jwtAccessToken } = parm;
    const res = await universalReportEndpoint.createReport(
      universalReportDTO,
      jwtAccessToken
    );
    return res.data;
  }
);

export const updateReport = createAsyncThunk(
  'report/updateReport',
  async (parm) => {
    const { universalReportDTO, jwtAccessToken } = parm;
    const res = await universalReportEndpoint.updateReport(
      universalReportDTO,
      jwtAccessToken
    );
    return res.data;
  }
);

export const deleteReport = createAsyncThunk(
  'report/deleteReport',
  async (parm) => {
    const { reportId, jwtAccessToken } = parm;
    const res = await universalReportEndpoint.deleteReport(
      reportId,
      jwtAccessToken
    );
    return res.data;
  }
);

export const getReport = createAsyncThunk('report/getReport', async (parm) => {
  const { reportId, jwtAccessToken } = parm;
  const res = await universalReportEndpoint.getReport(reportId, jwtAccessToken);
  return res.data;
});

export const listReports = createAsyncThunk(
  'report/listReport',
  async (pageParams) => {
    const { page, size, sortBy, jwtAccessToken } = pageParams;
    const res = await universalReportEndpoint.listReports(
      page,
      size,
      sortBy,
      jwtAccessToken
    );
    return res.data;
  }
);

export const listReportByIndividual = createAsyncThunk(
  'report/listIndividualReports',
  async (pageParams) => {
    const { page, size, sortBy, userId, individual, jwtAccessToken } =
      pageParams;
    const res = await universalReportEndpoint.listReportByIndividual(
      page,
      size,
      sortBy,
      userId,
      individual,
      jwtAccessToken
    );
    return res.data;
  }
);
