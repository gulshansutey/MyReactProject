import { createContext, useState } from "react";

export const PlacesContext = createContext({
    storePlaces: (places) => { },
    places: []
})


function PlacesContextProvider({ children }) {

    const [places, setPlaces] = useState([]);
    function storePlaces(places) {
        setPlaces(places);
    }
 
    const value ={
        storePlaces: storePlaces,
        places: places 
    }
    return <PlacesContext.Provider value={value}>{children}</PlacesContext.Provider>
}

export default PlacesContextProvider;