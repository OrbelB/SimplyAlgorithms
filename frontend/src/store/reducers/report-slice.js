import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';

import {
  createReport,
  deleteReport,
  getReport,
  listReports,
  listReportByIndividual,
  updateReport,
} from '../../services/universalReport';

const reportAdapter = createEntityAdapter({
  selectId: (report) => report.reportId,
});

const initialState = reportAdapter.getInitialState({
  report: {},
  status: 'idle',
  error: null,
  reportId: undefined,
  currentPage: undefined,
  totalPages: undefined,
  totalElements: undefined,
});

export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    resetData: (state) => {
      reportAdapter.removeAll(state);
      state.report = {};
      state.status = 'idle';
      state.error = null;
      state.totalElements = undefined;
      state.currentPage = undefined;
      state.currentPage = undefined;
      state.reportId = undefined;
    },
    removeReportId: (state) => {
      state.reportId = undefined;
    },
    updateCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReport.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createReport.fulfilled, (state, action) => {
        state.status = 'success';
        state.reportId = action.payload;
      })
      .addCase(createReport.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateReport.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateReport.fulfilled, (state, action) => {
        state.status = 'success';
        reportAdapter.upsertOne(state, action.payload);
      })
      .addCase(updateReport.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getReport.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getReport.fulfilled, (state, action) => {
        state.status = 'success';
        reportAdapter.upsertOne(state, action.payload);
      })
      .addCase(getReport.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(listReports.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(listReports.fulfilled, (state, action) => {
        state.status = 'success';
        const { number, totalPages, content, totalElements } = action.payload;
        state.currentPage = number;
        state.totalPages = totalPages;
        state.totalElements = totalElements;
        reportAdapter.upsertMany(state, content);
      })
      .addCase(listReports.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(listReportByIndividual.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(listReportByIndividual.fulfilled, (state, action) => {
        state.status = 'success';
        const { number, totalPages, content, totalElements } = action.payload;
        state.currentPage = number;
        state.totalPages = totalPages;
        state.totalElements = totalElements;
        reportAdapter.upsertMany(state, content);
      })
      .addCase(listReportByIndividual.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteReport.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.status = 'success';
        reportAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteReport.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  selectAll: selectAllReports,
  selectById: selectReportById,
  selectIds: selectReportIds,
} = reportAdapter.getSelectors((state) => state.report);

export const filterReportsByIndividual = createSelector(
  [
    selectAllReports,
    (state, individual, individualId) => ({ individual, individualId }),
  ],
  (reports, { individual, individualId }) => {
    return reports.filter(
      (report) =>
        report[individual]?.username?.toLowerCase() ===
          individualId?.toLowerCase() ||
        report[individual]?.userId === individualId
    );
  }
);

export const reportActions = reportSlice.actions;
