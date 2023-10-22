import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../../models/user.model';

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const response = await axios.get<User[]>('http://localhost:3005/users');
  await pause(1500);
  return response.data;
});

const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};
