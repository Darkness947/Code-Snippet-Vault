import api from './api';

export const collectionService = {
    getAll: async () => {
        const response = await api.get('/collections');
        return response.data;
    },
    getById: async (id) => {
        const response = await api.get(`/collections/${id}`);
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/collections', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put(`/collections/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/collections/${id}`);
        return response.data;
    },
    attachSnippet: async (collectionId, snippetId) => {
        const response = await api.post(`/collections/${collectionId}/snippets/${snippetId}`);
        return response.data;
    },
    detachSnippet: async (collectionId, snippetId) => {
        const response = await api.delete(`/collections/${collectionId}/snippets/${snippetId}`);
        return response.data;
    }
};
