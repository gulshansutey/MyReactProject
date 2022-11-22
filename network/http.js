
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
        sort: 'DISTANCE',
        open_now: "true"
    });

    const placeUrl = `https://api.foursquare.com/v3/places/search?${searchParams}`

    const response = await axios.get(placeUrl, {
        headers: {
            Accept: 'application/json',
            Authorization: ACCESS_TOKEN,
        }
    }).catch((error) => {
        console.log("Error--" + placeUrl);
        console.log(error);
    });

    const results = response.data.results
    const places = [];

    for (const i in results) {
        const data = results[i];
        const picRes = await getPictureForVenue(data.fsq_id);
        places.push({
            title: data.name,
            location: data.location,
            image: data.categories[0].icon,
            picture: picRes.data[0]
        });
    }
   
    return places;
}

export async function getPictureForVenue(fsq_id) {
    const params = new URLSearchParams({
        limit: "1"
    });
    const photoUrl = `https://api.foursquare.com/v3/places/${fsq_id}/photos?${params}`
    const response = await axios.get(photoUrl, {
        headers: {
            Accept: 'application/json',
            Authorization: ACCESS_TOKEN,
        }
    }).catch((error) => {
        console.log("Error--" + placeUrl);
        console.log(error);
    });
    return response;
}