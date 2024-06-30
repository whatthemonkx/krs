import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_SERVER_LINK;

export const getItems = async () => {
    try {
        const response = await axios.get(`${API_URL}/items`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

export const getSingleItems = async (itemId) => {
    try {
        const response = await axios.get(`${API_URL}/items/${itemId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

export const getSizes = async (ids) => {
    try {
        const response = await axios.post(`${API_URL}/items/sizes`, {
            id: ids
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};
