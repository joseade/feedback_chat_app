import axios from "axios";

export const Types = {
  API_REQUEST: "API_REQUEST",
  API_SUCCES: "API_SUCCES",
  API_ERROR: "API_ERROR",
};

export const request = (payload, meta) => {
  switch (meta.method) {
    case "POST":
      return axios.post(meta.url, payload);
    case "GET":
      return axios.get(meta.url);
    default:
      return;
  }
};

export const succes = (type, data) => {
  return {
    type: type,
    payload: data,
  };
};

export const error = (type, error) => {
  return {
    type: type,
    payload: error,
  };
};
