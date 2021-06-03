import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import firebase from 'firebase';

import { RootState } from '../../app/store';
import {
  auth,
  db,
  dbCollections,
  findUserDocumentByEmail,
  updateUserIfExists
} from '../../utils/firestore.utils';
import { SignUpFormModel } from './SignUpForm';

// import { RootState, AppThunk } from '../../app/store';

export interface CatUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthState {
  currentUser: firebase.User | null;
  status: 'idle' | 'loading' | 'failed';
  authError: string | null;
}

const initialState: AuthState = {
  currentUser: null,
  status: 'idle',
  authError: null
};

export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async (credentials: { email: string; password: string }) => {
    const loginResult = await auth.signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
    // eslint-disable-next-line no-console
    console.log(loginResult);
    if (!loginResult.user) {
      throw new Error('Login failed!');
    }
    const isExists = await findUserDocumentByEmail(credentials.email);
    if (isExists) {
      return isExists;
    }
    return loginResult.user.toJSON();
  }
);

export const signUpAsync = createAsyncThunk(
  'auth/signUpAsync',
  async (values: SignUpFormModel) => {
    const signUpResult = await auth.createUserWithEmailAndPassword(
      values.email,
      values.password
    );
    // eslint-disable-next-line no-console
    // console.log(signUpResult);
    if (!signUpResult.user) {
      throw new Error('Sign up failed!');
    }
    // await auth.updateCurrentUser({
    //   displayName: `${values.firstName} ${values.lastName}`
    // });
    const isExists = await findUserDocumentByEmail(values.email);
    if (isExists) {
      await updateUserIfExists({
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName
      });
    } else {
      await db.collection(dbCollections.users).add({
        id: signUpResult.user.uid,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName
      });
      // eslint-disable-next-line no-console
      // console.log({ createUserResult });
    }
    return signUpResult.user.toJSON();
  }
);

export const signOutAsync = createAsyncThunk('auth/signOutAsync', async () => {
  await auth.signOut();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<firebase.User | null>) => {
      state.currentUser = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
        state.authError = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = 'failed';
        // console.log({ error: 'login', action });
        state.authError = action.error.message || 'Login error occurred';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.authError = null;
        // state.currentUser = action.payload;
      })
      // Sign-in
      .addCase(signUpAsync.pending, (state) => {
        state.status = 'loading';
        state.authError = null;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.authError = action.error.message || 'Sign up error occurred';
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.authError = null;
        // state.currentUser = action.payload;
      })
      // Sign-out
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
        state.authError = null;
      })
      .addCase(signOutAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.authError = action.error.message || 'Sign up error occurred';
      })
      .addCase(signOutAsync.fulfilled, (state) => {
        state.status = 'idle';
        state.authError = null;
        state.currentUser = null;
      });
  }
});

export const { setCurrentUser } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectCurrentUser = (state: RootState) => state.auth.currentUser;

export default authSlice.reducer;
