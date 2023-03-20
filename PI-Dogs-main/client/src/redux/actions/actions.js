import axios from "axios";
import {
  FILTER_BY_ORIGIN,
  GET_ALL_BREEDS,
  ORDER_BY_NAME,
  // ORDER_BY_WEIGHT,
} from "../action-types/action-types";

export const getAllBreeds = () => {
  return async function (dispatch) {
    const info = await axios("http://localhost:3001/dogs");
    return dispatch({
      type: GET_ALL_BREEDS,
      payload: info.data,
    });
  };
};

export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
};

export function getNameDog(name){
  return async function (dispatch){
    try {
      let json = await axios.get(`http://localhost:3001/dogs?name=${name}`)
      return dispatch({
        type: "GET_NAME_DOG",
        payload: json.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

// export const orderByWeight = (payload) => {
//   return {
//     type: ORDER_BY_WEIGHT,
//     payload,
//   };
// };

export const filterByOrigin = (payload) => {
  return {
    type: FILTER_BY_ORIGIN,
    payload,
  };
};
