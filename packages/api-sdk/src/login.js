// import axios from "axios"
const axios = require('axios');

export const validateUser = (username, password) => axios.post('http://localhost:5000/login', { username, password });