import axios from 'axios';
const PUNK_API = "https://api.punkapi.com/v2";

export const fullTextSearch = async (query) => {
    const response = await axios.get(`${PUNK_API}/beers?${query}`);
    return response.data;
}
