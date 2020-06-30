import axios from 'axios';

// iOS - localhost
// Android Studio - 10.0.2.2
// Genymotion - 10.0.3.2
// USB - Use your ip network
const api = axios.create({
  baseURL: 'http://10.0.2.2:3333',
});

export default api;
