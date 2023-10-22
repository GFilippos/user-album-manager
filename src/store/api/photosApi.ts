import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Album } from '../../models/album.model';
import { faker } from '@faker-js/faker';
import { Photo } from '../../models/photo.model';

const photosApi = createApi({
  reducerPath: 'photos',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
  }),
  tagTypes: ['Photo', 'AlbumPhoto'],
  endpoints(builder) {
    return {
      fetchPhotos: builder.query({
        providesTags: (result, error, album) => {
          const tags = result.map((photo: Photo) => {
            return { type: 'Photo', id: photo.id };
          });
          tags.push({ type: 'AlbumPhoto', id: album.id });
          return tags;
        },
        query: (album: Album) => {
          return {
            url: '/photos',
            params: {
              albumId: album.id,
            },
            method: 'GET',
          };
        },
      }),
      addPhoto: builder.mutation({
        invalidatesTags: (result, error, album) => {
          return [{ type: 'AlbumPhoto', id: album.id }];
        },
        query: (album: Album) => {
          return {
            url: '/photos',
            body: {
              albumId: album.id,
              url: faker.image.abstract(150, 150, true),
            },
            method: 'POST',
          };
        },
      }),
      removePhoto: builder.mutation({
        invalidatesTags: (result, error, photo) => {
          return [{ type: 'Photo', id: photo.id }];
        },
        query: (photo: Photo) => {
          return {
            url: `/photos/${photo.id}`,
            method: 'DELETE',
          };
        },
      }),
    };
  },
});

export const { useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation } = photosApi;
export { photosApi };
