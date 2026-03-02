import axios from "axios";
import { useAuthStore } from "@/store/auth.store";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const getAuthHeader = () => {
    const token = useAuthStore.getState().access_token;
    return { Authorization: `Bearer ${token}` };
};

export const createChat = async (targetId: string) => {
    const response = await axios.post(
        `${API_URL}/api/chats`,
        { targetId },
        { headers: getAuthHeader() }
    );
    return response.data;
};

export const getMyChats = async () => {
    const response = await axios.get(`${API_URL}/api/chats`, {
        headers: getAuthHeader(),
    });
    return response.data;
};

export const getChatMessages = async (chatId: string, limit = 20, page = 1) => {
    const response = await axios.get(
        `${API_URL}/api/chats/${chatId}/messages?limit=${limit}&page=${page}`,
        { headers: getAuthHeader() }
    );
    return response.data;
};

export const sendMessage = async (chatId: string, content: string, messageType = "text") => {
    const response = await axios.post(
        `${API_URL}/api/chats/${chatId}/messages`,
        { content, messageType },
        { headers: getAuthHeader() }
    );
    return response.data;
};

export const markAsRead = async (messageId: string) => {
    const response = await axios.patch(
        `${API_URL}/api/chats/messages/${messageId}/read`,
        {},
        { headers: getAuthHeader() }
    );
    return response.data;
};

export const updateMessage = async (messageId: string, content: string) => {
    const response = await axios.patch(
        `${API_URL}/api/chats/messages/${messageId}`,
        { content },
        { headers: getAuthHeader() }
    );
    return response.data;
};

export const deleteMessage = async (messageId: string) => {
    const response = await axios.delete(
        `${API_URL}/api/chats/messages/${messageId}`,
        { headers: getAuthHeader() }
    );
    return response.data;
};
