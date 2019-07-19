import axios from 'axios'
import config from '../conf'

export default {
    getPopularShows (language, page) {
        return axios.get(config.apiConfig.baseUrl + 'tv/popular?api_key=' +
            config.apiConfig.apiKey + '&language=' + language + '&page=' + page)
    },
    getShowDetails (language, id) {
        return axios.get(config.apiConfig.baseUrl + 'tv/' + id + '?api_key=' +
            config.apiConfig.apiKey + '&language=' + language)
    },
    getShowSeasons (id, seasonNumber, language) {
        return axios.get(config.apiConfig.baseUrl + 'tv/' + id + '/season/' + seasonNumber + '?api_key=' +
            config.apiConfig.apiKey + '&language=' + language)
    }

}