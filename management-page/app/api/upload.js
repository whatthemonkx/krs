import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_SERVER_LINK;

export const uploadImage = async (file, name, item, status, oldImageName, variant) => {
    try {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('name', name);
        formData.append('item', item);
        formData.append('status', status);
        formData.append('oldImageName', oldImageName);
        formData.append('variant', variant);

        const response = await axios.post(`${API_URL}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error; 
    }
};

export const uploadFirstImage = async (file, name, item, status, variant) => {
    try {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('name', name);
        formData.append('item', item);
        formData.append('status', status);
        formData.append('variant', variant);

        const response = await axios.post(`${API_URL}/upload/first`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error; 
    }
};

export const editVariation = async (name, item, status, variant) => {
    try {
        const response = await axios.post(`${API_URL}/upload/noimage`, {
            item: item,
            name: name,
            status: status,
            variant: variant,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

export const addVariation = async (name, item, status) => {
    try {
        const response = await axios.post(`${API_URL}/upload/add`, {
            item: item,
            name: name,
            status: status,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};
