import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { faker } from '@faker-js/faker';

interface PostUser {
  name: string;
}

const addUser = createAsyncThunk('users/add', async () => {
  const response: AxiosResponse<any, PostUser> = await axios.post('http://localhost:3005/users', {
    name: faker.person.fullName(),
  });
  return response.data;
});

export { addUser };
