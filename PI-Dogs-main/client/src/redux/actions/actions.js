import axios from "axios";
import {
  FILTER_BY_ORIGIN,
  GET_ALL_BREEDS,
  ORDER_BY_NAME,
  ORDER_BY_WEIGHT,
  GET_ALL_TEMPS,
  FILTER_BY_TEMPER,
  GET_NAME_DOG,
  GET_DOG_DETAIL,
} from "../action-types/action-types";

// export const resetDogs = () => {
//   return async function(dispatch) {
//     const info = await axios("http://localhost:3001/dogs")
//     return dispatch({
//       type: GET_ALL_BREEDS,
//       payload: info.data,
//     });
//   }
// }

export const getAllBreeds = () => {
  return async function (dispatch) {
    const info = await axios("http://localhost:3001/dogs");
    return dispatch({
      type: GET_ALL_BREEDS,
      payload: info.data,
    });
  };
};

export const orderByWeight = (payload) => {
  return {
    type: ORDER_BY_WEIGHT,
    payload,
  };
};

export const filterByTemper = (payload) => {
  return {
    type: FILTER_BY_TEMPER,
    payload,
  };
};

export function getNameDog(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`http://localhost:3001/dogs?name=${name}`);
      return dispatch({
        type: GET_NAME_DOG,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const getDogDetail = (id) => {
  return async function (dispatch) {
    try {
      let dogWithId = await axios(`http://localhost:3001/dogs/${id}`);

      return dispatch({
        type: GET_DOG_DETAIL,
        payload: dogWithId.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const filterByOrigin = (payload) => {
  return {
    type: FILTER_BY_ORIGIN,
    payload,
  };
};

export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
};

export const getAllTemperaments = () => {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/temperaments");
    let listOfTemperaments = json.data.map((el) => el.name);
    return dispatch({
      type: GET_ALL_TEMPS,
      payload: listOfTemperaments,
    });
  };
};
