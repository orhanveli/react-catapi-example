import {
  configureStore,
  ThunkAction,
  Action,
  bindActionCreators
} from '@reduxjs/toolkit';

import counterReducer from '../features/counter/counterSlice';
import authReducer, {
  loginAsync,
  signUpAsync
} from '../features/auth/auth.slice';
import { connect, ConnectedProps } from 'react-redux';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const mapState = (state: RootState) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch: AppDispatch) =>
  bindActionCreators(
    {
      loginAsync
    },
    dispatch
  );

export const connector = connect(mapState, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;
