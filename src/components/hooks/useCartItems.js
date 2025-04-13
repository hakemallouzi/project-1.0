
import { useQuery } from 'react-query';
import api from '../api';

export const useCartItems = () => {
  return useQuery('cartItems', () =>
    api.url("/posts?_limit=3").get().json()
  );
};
