import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_SERVER_LINK;

export const processSale = async (name, address1, address2, zip, state, email, items, totalPrice) => {
    try {
        await axios.post(`${API_URL}/sales`, {
            name,
            address1,
            address2,
            zip,
            state,
            email,
            items,
            totalPrice,
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

export const getSoldItems = async () => {
    try {
        const response = await axios.get(`${API_URL}/sales/items`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

export const getTransactions = async () => {
    try {
        const response = await axios.get(`${API_URL}/sales/transactions`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

export const getSoldoutSizes = async () => {
    try {
        const response = await axios.get(`${API_URL}/sales/soldout`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};