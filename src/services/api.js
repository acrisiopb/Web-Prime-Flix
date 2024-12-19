//Base da URL: https://api.themoviedb.org/3/
// URL da Api: /movie/now_playing?api_key=0a9a35c83a2f677a6d71cdc89de7f87e&language=pt-br

import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});
export default api;