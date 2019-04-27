import { GET_BEERS, BEERS_LOADING, CLEAR_CURRENT_BEER } from "../actions/types";

const initialState = {
  beer: null,
  beers: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case BEERS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_BEERS:
      return {
        ...state,
        beer: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_BEER:
      return {
        ...state,
        beer: null
      };
    default:
      return state;
  }
}
