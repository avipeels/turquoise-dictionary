// import axios from "axios"
const axios = require('axios');

const validateUser = (payload) => axios.post('http://localhost:5000/login', payload);