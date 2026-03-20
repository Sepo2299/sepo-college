import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const message = error.response.data?.error || 'An error occurred';
      
      switch (status) {
        case 400:
          console.error('Bad Request:', message);
          break;
        case 401:
          // Unauthorized - redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          break;
        case 403:
          console.error('Forbidden:', message);
          break;
        case 404:
          console.error('Not Found:', message);
          break;
        case 500:
          console.error('Server Error:', message);
          break;
        default:
          console.error('API Error:', message);
      }
    } else if (error.request) {
      // Network error
      console.error('Network Error: Unable to connect to server');
    } else {
      // Other error
      console.error('Request Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
  changePassword: (data) => api.put('/auth/change-password', data),
  forgotPassword: (email) => api.post('/auth/forgot-password', email),
  resetPassword: (data) => api.post('/auth/reset-password', data),
};

export const applicationAPI = {
  createApplication: (data) => api.post('/applications', data),
  getApplications: (params) => api.get('/applications', { params }),
  getApplication: (id) => api.get(`/applications/${id}`),
  checkStatus: (applicationNumber) => api.get(`/applications/check/${applicationNumber}`),
  updateStatus: (id, data) => api.put(`/applications/${id}/status`, data),
  getStats: (timeframe) => api.get('/applications/stats', { params: { timeframe } }),
  getTrends: () => api.get('/applications/trends'),
  search: (query) => api.get('/applications/search', { params: { query } }),
};

export const studentAPI = {
  getDashboard: () => api.get('/students/dashboard'),
  getCourses: () => api.get('/students/courses'),
  getProfile: () => api.get('/students/me/profile'),
  updateProfile: (data) => api.put('/students/me/profile', data),
  enrollInCourse: (studentId, courseId) => api.post(`/students/${studentId}/enroll`, { course_id: courseId }),
  getAssignments: (studentId) => api.get(`/students/${studentId}/assignments`),
  getStats: (studentId) => api.get(`/students/${studentId}/stats`),
};

export const courseAPI = {
  getCourses: (params) => api.get('/courses', { params }),
  getCourse: (id) => api.get(`/courses/${id}`),
  createCourse: (data) => api.post('/courses', data),
  updateCourse: (id, data) => api.put(`/courses/${id}`, data),
  deleteCourse: (id) => api.delete(`/courses/${id}`),
  getEnrollments: (courseId) => api.get(`/courses/${courseId}/enrollments`),
};

export const announcementAPI = {
  getAnnouncements: (params) => api.get('/announcements', { params }),
  getAnnouncement: (id) => api.get(`/announcements/${id}`),
  createAnnouncement: (data) => api.post('/announcements', data),
  updateAnnouncement: (id, data) => api.put(`/announcements/${id}`, data),
  deleteAnnouncement: (id) => api.delete(`/announcements/${id}`),
};

export const uploadAPI = {
  uploadFile: (file, type) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    return api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  deleteFile: (filename) => api.delete(`/upload/${filename}`),
};

// Utility functions
export const handleApiError = (error) => {
  if (error.response) {
    return {
      success: false,
      message: error.response.data?.error || 'An error occurred',
      status: error.response.status,
    };
  } else if (error.request) {
    return {
      success: false,
      message: 'Network error: Unable to connect to server',
      status: 0,
    };
  } else {
    return {
      success: false,
      message: error.message || 'An unexpected error occurred',
      status: 0,
    };
  }
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone) => {
  const re = /^(\+?264|0)?\d{9}$/;
  return re.test(phone.replace(/\s+/g, ''));
};

export default api;