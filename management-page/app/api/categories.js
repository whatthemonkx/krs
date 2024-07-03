import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_SERVER_LINK;

export const getCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/catagories`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

export const addCategory = async (name) => {
    try {
        const response = await axios.post(`${API_URL}/catagories/add`, {
            name: name
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};
