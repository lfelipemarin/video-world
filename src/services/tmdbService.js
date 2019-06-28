import axios from 'axios'
import config from '../conf'

export default {
    getPopularShows (language, page) {
        return axios.get(config.apiConfig.baseUrl + 'tv/popular?api_key=' +
            config.apiConfig.apiKey + '&language=' + language + '&page=' + page)
    }
}