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

export const deleteItem = async (ids) => {
    try {
        const response = await axios.post(`${API_URL}/items/deleteItem`, {
            id: ids
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

export const deleteVariation = async (ids) => {
    try {
        const response = await axios.post(`${API_URL}/items/deleteVariation`, {
            id: ids
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

export const addItem = async (name, description, price, itemType, status) => {
    try {
        const response = await axios.post(`${API_URL}/items/addItem`, {
            name: name,
            description: description,
            price: price,
            itemType: itemType,
            status: status,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

export const editItem = async (name, description, price, itemType, status, id) => {
    try {
        const response = await axios.post(`${API_URL}/items/editItem`, {
            name: name,
            description: description,
            price: price,
            itemType: itemType,
            status: status,
            id: id
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

export const deleteSize = async (id) => {
    try {
        const response = await axios.post(`${API_URL}/items/deleteSize`, {
            id: id
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

export const editSize = async (id, name, quantity) => {
    try {
        const response = await axios.post(`${API_URL}/items/editSize`, {
            id: id,
            name: name,
            quantity: quantity,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

export const addSize = async (id, name, quantity) => {
    try {
        const response = await axios.post(`${API_URL}/items/addSize`, {
            id: id,
            name: name,
            quantity: quantity,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};
