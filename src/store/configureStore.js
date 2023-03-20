import { reducers } from "./reducer";

const { configureStore } = require("@reduxjs/toolkit");
const { default: logger } = require("redux-logger");

const store = configureStore({
  reducer: reducers,
  middleware: (gDM) => gDM().concat(logger),
});

export default store;
