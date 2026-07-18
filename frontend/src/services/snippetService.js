import api from './api';

export const snippetService = {
    getAll: async (params = {}) => {
        const response = await api.get('/snippets', { params });
        return response.data;
    },
    getById: async (id) => {
        const response = await api.get(`/snippets/${id}`);
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/snippets', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put(`/snippets/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/snippets/${id}`);
        return response.data;
    },
    toggleFavorite: async (id) => {
        const response = await api.patch(`/snippets/${id}/favorite`);
        return response.data;
    },
    getVersions: async (id) => {
        const response = await api.get(`/snippets/${id}/versions`);
        return response.data;
    },
    getMarkdown: async (id) => {
        const response = await api.get(`/snippets/${id}/markdown`);
        return response.data;
    },
    search: async (params = {}) => {
        const response = await api.get('/search', { params });
        return response.data;
    }
};
