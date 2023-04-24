import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./alert";
import assignmentReducer from "./assignment-form";

const store = configureStore({
  reducer: { alert: alertReducer, assignment: assignmentReducer },
});

export default store;
