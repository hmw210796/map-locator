import { mapActions } from "./map-slice";
import { searchActions } from "./search-slice";

export const fetchAddressData = (enteredAddress, autoCompleteRef) => {
  return async (dispatch) => {
    const getPlace = async () => {
      const place = await autoCompleteRef.current.getPlace();
      return place;
    };

    try {
      const response = await getPlace();

      if (!response) {
        throw new Error(`'${enteredAddress}' does not exist`);
      }

      const newLocation = {
        lat: response.geometry.location.lat(),
        lng: response.geometry.location.lng(),
      };

      dispatch(mapActions.setCurrentLocation(newLocation));
      dispatch(
        searchActions.addToList({
          name: response.name,
          geometry: newLocation,
          address: response.formatted_address,
          id: response.place_id,
        })
      );
    } catch (err) {
      dispatch(searchActions.toggleError(err.message));
    }
  };
};

export const fetchSearchList = () => {
  return async (dispatch) => {
    const fetchData = () => {
      const data = localStorage.getItem("searchList");

      return JSON.parse(data);
    };

    try {
      const fetchedData = fetchData();

      if (fetchedData) {
        dispatch(searchActions.replaceList(fetchedData));
      } else {
        dispatch(searchActions.replaceList([]));
      }
    } catch (err) {
      console.log(err);
    }
  };
};
