import { createSlice } from "@reduxjs/toolkit";

const assignmentFormSlice = createSlice({
  name: "assignmentForm",
  initialState: { initialValues: {}, validationSchema: {} },
  reducers: {
    setInitialValues(state, action) {
      state.initialValues = { ...state.initialValues, ...action.payload };
    },
    setValidationSchema(state, action) {
      state.validationSchema = { ...state.validationSchema, ...action.payload };
    },
    removeInitialValues(state, action) {
      delete state.initialValues[action.payload];
    },
    removeValidationSchema(state, action) {
      delete state.validationSchema[action.payload];
    },
  },
});

export const assignmentFormActions = assignmentFormSlice.actions;
export default assignmentFormSlice.reducer;
