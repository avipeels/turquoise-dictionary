
const axios = require('axios');
// validateUser
export const validateUser = (username, password) => axios.post('http://localhost:5000/login', { username, password });