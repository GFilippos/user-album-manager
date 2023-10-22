import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../../models/user.model';
import { Album } from '../../models/album.model';
import { faker } from '@faker-js/faker';

const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
    fetchFn: async (...args) => {
      // REMOVE FOR PRODUCTION - overriden build-in fetch to get 1s pause for testing
      await pause(1000);
      return fetch(...args);
    },
  }),
  tagTypes: ['Album', 'UsersAlbums'],
  endpoints(builder) {
    return {
      addAlbum: builder.mutation<void, User>({
        invalidatesTags: (result, error, user) => {
          return [{ type: 'UsersAlbums', id: user.id }];
        },
        query: (user) => {
          return {
            url: '/albums',
            method: 'POST',
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
          };
        },
      }),
      removeAlbum: builder.mutation<void, Album>({
        invalidatesTags: (results, error, album) => {
          return [{ type: 'Album', id: album.id }];
        },
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: 'DELETE',
          };
        },
      }),
      fetchAlbums: builder.query({
        providesTags: (result, error, user) => {
          const tags = result?.map((album: Album) => {
            return { type: 'Album', id: album.id };
          });
          tags?.push({ type: 'UsersAlbums', id: user.id });
          return tags;
        },
        query: (user) => {
          return {
            url: '/albums',
            params: {
              userId: user.id,
            },
            method: 'GET',
          };
        },
      }),
    };
  },
});

export const { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } = albumsApi;
export { albumsApi };
