import api from '../utils/api';

const blogService = {
    getAllPosts: async (page = 0, size = 10) => {
        try {
            const response = await api.get(`/posts?page=${page}&size=${size}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || {message: 'Error al cargar los posts'};
        }
    },

    getPostBySlug: async (slug) => {
        try {
            const response = await api.get(`/blog/posts/${slug}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || {message: 'Error al cargar el post'};
        }
    },
    createPost: async (postData) => {
        try {
            const response = await api.post('/blog/posts', postData);
            return response.data;
        } catch (error) {
            throw error.response?.data || {message: 'Error al crear el post'};
        }
    },
    updatePost: async (id, postData) => {
        try {
            const response = await api.put(`/blog/posts/${id}`, postData);
            return response.data;
        } catch (error) {
            throw error.response?.data || {message: 'Error al actualizar el post'};
        }
    },
    deletePost: async (id) => {
        try {
            const response = await api.delete(`/posts/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || {message: 'Error al eliminar el post'};
        }
    },

    getCategories: async () => {
        try {
            const response = await api.get('/blog/categories');
            return response.data;
        } catch (error) {
            throw error.response?.data || {message: 'Error al cargar las categorías'};
        }
    },

    getComments: async (postId) => {
        try {
            const response = await api.get(`/blog/posts/${postId}/comments`);
            return response.data;
        } catch (error) {
            throw error.response?.data || {message: 'Error al cargar los comentarios'};
        }
    },
    addComment: async (postId, commentData) => {
        try {
            const response = await api.post(`/blog/posts/${postId}/comments`, commentData);
            return response.data;
        } catch (error) {
            throw error.response?.data || {message: 'Error al agregar el comentario'};
        }
    },
    deleteComment: async (postId, commentId) => {
        try {
            const response = await api.delete(`/blog/posts/${postId}/comments/${commentId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || {message: 'Error al eliminar el comentario'};
        }
    } 
};

export default blogService;
