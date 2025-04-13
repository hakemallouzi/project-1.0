import { useQuery } from 'react-query';

const fetchCartItems = async () => {
    // Simulated API call - replace with actual API call when ready
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: 'Product 1' },
                { id: 2, title: 'Product 2' },
                { id: 3, title: 'Product 3' }
            ]);
        }, 1000);
    });
};

export const useCartItems = () => {
    return useQuery('cartItems', fetchCartItems);
}; 