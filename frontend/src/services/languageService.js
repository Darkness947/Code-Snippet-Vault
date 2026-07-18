import api from './api';

export const languageService = {
    getAll: async () => {
        const response = await api.get('/languages');
        return response.data;
    }
};
