import { useState, useCallback } from 'react';
import { useAppDispatch } from '../store';
import { AsyncThunk, SerializedError } from '@reduxjs/toolkit';
import { NullableError } from '../store';
import { User } from '../models/user.model';

export const useThunk = (thunk: AsyncThunk<any, any, {}>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<NullableError>(null);
  const dispatch = useAppDispatch();

  const runThunk = useCallback(
    (user?: User) => {
      setIsLoading(true);
      dispatch(thunk(user))
        .unwrap()
        .catch((err: SerializedError) => setError(err))
        .finally(() => setIsLoading(false));
    },
    [dispatch, thunk]
  );

  return [runThunk, isLoading, error];
};
