import axios from 'axios';

export const requests = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 5000,
  withCredentials: true,
});

export const getHistoryBySessionId = async (sessionId) => {
  try {
    const response =  await requests.get(`/history/${sessionId}`);
    return response.data;
  } catch {
    return null;
  }
}
