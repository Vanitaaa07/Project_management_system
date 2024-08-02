import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000/api' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers.Authorization = localStorage.getItem('token');
    }
    return req;
});


export const signUp = (formData) => API.post('/auth/signup', formData);
export const login = (formData) => API.post('/auth/login', formData);
export const fetchProjects = () => API.get('/projects');
export const addProject = (projectData) => API.post('/projects', projectData);
export const editProject = (id, projectData) => API.put(`/projects/${id}`, projectData);
export const deleteProject = (id) => API.delete(`/projects/${id}`);
export const fetchUsers = () => API.get('/admin/users');
export const fetchAllProjects = () => API.get('/admin/projects');
export const adminEditProject = (id, projectData) => API.put(`/admin/projects/${id}`, projectData);
export const adminDeleteProject = (id) => API.delete(`/admin/projects/${id}`);