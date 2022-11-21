
import { FOURSQUARE_CLIENT_ID, FOURSQUARE_CLIENT_SECRET, ACCESS_TOKEN } from "../API_KEYS"
import axios from 'axios'

const VERSION = "20210409"
const VENUES = "5"
const RADIUS = 500
const FOOD_CATEGORY = "4d4b7105d754a06374d81259"
const BASE_URL = "https://api.foursquare.com/"

const REQUEST_COMMON_PARAMS = "client_id=" + FOURSQUARE_CLIENT_ID +
    "&client_secret=" + FOURSQUARE_CLIENT_SECRET + "&v=" + VERSION;


export async function getVenues(latLng) {

    const searchParams = new URLSearchParams({
        query: 'food',
        ll: latLng,
        sort: 'DISTANCE'

    });

    const url = BASE_URL + "/v3/places/search?" +
        REQUEST_COMMON_PARAMS + "&limit=" +
        VENUES + "&categoryId=" +
        FOOD_CATEGORY + "&radius=" + RADIUS
    const placeUrl = `https://api.foursquare.com/v3/places/search?${searchParams}`
    return axios.get(placeUrl, {
        headers: {
            Accept: 'application/json',
            Authorization: ACCESS_TOKEN,
        }
    }).catch((error) => {
        console.log(error);
    });
}

export function getPictureForVenue(id) {
    const url = BASE_URL + "/v2/venues/{id}/photos?$REQUEST_COMMON_PARAMS&limit=$PICTURE_LIMIT"
}