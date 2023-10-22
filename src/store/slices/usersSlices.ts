import { PayloadAction, SerializedError, createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from '../thunks/fetchUsers';
import { addUser } from '../thunks/addUser';
import { removeUser } from '../thunks/removeUser';
import { User } from '../../models/user.model';

export type NullableError = SerializedError | null;

type InitialStateType = {
  usersList: User[];
  isLoading: boolean;
  error: NullableError;
};

const InitialState: InitialStateType = {
  usersList: [],
  isLoading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState: InitialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.isLoading = false;
      state.usersList = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(addUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.usersList.push(action.payload);
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(removeUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.usersList = state.usersList.filter((user) => user.id !== action.payload.id);
    });
    builder.addCase(removeUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const usersReducer = usersSlice.reducer;
