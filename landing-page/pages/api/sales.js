import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_SERVER_LINK;

export const processSale = async (name, address1, address2, zip, state, email, items) => {
    try {
        await axios.post(`${API_URL}/sales`, {
            name,
            address1,
            address2,
            zip,
            state,
            email,
            items,
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};
