import axios from 'axios'

export default {
    getPopularShows () {
        return axios.get('https://api.themoviedb.org/3/tv/popular?api_key=fc55e9ba8a2e914f9fef0c71ddc8a57a&language=en-US&page=1')
    }
}