import axios from "axios";
import { API_PATH } from "../constants";

async function getAllUsers() {
    try {
        const res = await axios.get(`${API_PATH}/user/`);
        return res.data;
    } catch {
        return [];
    }
}

async function getUser(address) {
    try {
        const res = await axios.get(`${API_PATH}/user/${address}/`);
        return res.data;
    }
    catch {
        return null;
    }
}

async function getUserCollections(address) {
    try {
        const res = await axios.get(`${API_PATH}/collection/?creator=${address}`);
        return res.data;
    }
    catch {
        return [];
    }
}

async function signUp(formData) {
    try {
        const res = await axios.post(`${API_PATH}/user/`, formData);
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

async function updateUser(id, formData) {
    try {
        const res = await axios.patch(`${API_PATH}/user/${id}/`, formData);
        return true;
    }
    catch {
        return false;
    }
}

export {getAllUsers, getUser, getUserCollections, signUp, updateUser};