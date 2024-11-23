import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const authService = {
    login: (email: string, password: string) => 
        api.post('/auth/login', {email, password}),

    register: (name: string, email: string, password: string) =>
        api.post('/auth/register', {name, email, password})
}

export const subjectService = {
    getAllSubjects: () => api.get('/subjects'),
    getSubjectTopics: (subjectId: number) => api.get(`/subjects/${subjectId}/topics`),
    markTopicCompleted: (topicId: number) => api.post(`/progress/topic/${topicId}`),
    getSubjectLeaderboard: (subjectId: number) => api.get(`/subjects/${subjectId}/leaderboard`)
}

export default api;