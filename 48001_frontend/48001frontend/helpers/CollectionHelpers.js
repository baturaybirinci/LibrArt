import axios from 'axios';
import { API_PATH } from '../constants';

async function getAllCollections(params) {
    try {
        const res = await axios.get(`${API_PATH}/collection/`, {
            params
        });
        return res.data;
    }
    catch {
        return [];
    }
}


export {getAllCollections}