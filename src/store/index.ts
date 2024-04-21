import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import rootReducer from "./rootReducer";
import { programActions } from "../features/TrainingProgram/trainingProgram.slice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefalutMiddlewar) =>
    getDefalutMiddlewar({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [programActions.importTrainingProgram.type],
        // Ignore these field paths in all actions
        // ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // // Ignore these paths in the state
        // ignoredPaths: ["items.dates"],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
