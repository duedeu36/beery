import axios from "axios";
import { GET_BEERS, BEERS_LOADING, CLEAR_CURRENT_BEER } from "./types";

// Get current beer
export const getBeers = () => dispatch => {
  dispatch(setBeersLoading());
  axios
    .get("/api/beers")
    .then(res =>
      dispatch({
        type: GET_BEERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_BEERS,
        payload: {}
      })
    );
};

// Beer loading
export const setBeersLoading = () => {
  return {
    type: BEERS_LOADING
  };
};

// Clear beer
export const clearCurrentBeer = () => {
  return {
    type: CLEAR_CURRENT_BEER
  };
};
