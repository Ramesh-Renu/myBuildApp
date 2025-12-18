import axios from "axios";
import Config from "../config";

const GET = "GET";
const POST = "POST";
const PUT = "PUT";
const DELETE = "DELETE";

const requestTracker = {};
const USER_TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

/**
 * Headers
 */
export function getHttpHeader() {
  return {
    "Content-Type": "application/json",
    Timezone: USER_TIMEZONE,
  };
}
let AppStore; // placeholder
export const injectStore = (store) => {
  AppStore = store;
};
/**
 * Axios instance
 */
export const axiosBase = axios.create({
  baseURL: Config.apiBaseUrl,
  headers: getHttpHeader(),
});

/**
 * Request interceptor (NO AUTH)
 */
axiosBase.interceptors.request.use(
  (config) => {
    const requestKey = `${config.method}-${config.url}-${JSON.stringify(
      config.params
    )}`;

    if (requestTracker[requestKey]) {
      return Promise.resolve(requestTracker[requestKey]);
    }

    const requestPromise = axiosBase(config).then(
      (response) => response,
      (error) => Promise.reject(error)
    );

    requestTracker[requestKey] = requestPromise;
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor (NO 401 LOGOUT)
 */
axiosBase.interceptors.response.use(
  (response) => {
    const requestKey = `${response.config.method}-${
      response.config.url
    }-${JSON.stringify(response.config.params)}`;
    delete requestTracker[requestKey];
    return response;
  },
  (error) => {
    if (error.config) {
      const requestKey = `${error.config.method}-${
        error.config.url
      }-${JSON.stringify(error.config.params)}`;
      delete requestTracker[requestKey];
    }
    return Promise.reject(error);
  }
);

/**
 * Core request handler
 */
export const request = async (method, path, httpParams, body) => {
  switch (method) {
    case GET:
      return axiosBase
        .get(path, { params: httpParams })
        .then((res) => res.data);

    case POST:
      return axiosBase
        .post(path, body, { params: httpParams })
        .then((res) => res.data);

    case PUT:
      return axiosBase
        .put(path, body, { params: httpParams })
        .then((res) => res.data);

    case DELETE:
      return axiosBase
        .delete(path, { data: body, params: httpParams })
        .then((res) => res.data);

    default:
      throw new Error("Invalid HTTP method");
  }
};

export default {
  GET: (path, params) => request("GET", path, params),
  POST: (path, body, params) => request("POST", path, params, body),
  PUT: (path, body, params) => request("PUT", path, params, body),
  DELETE: (path, body, params) => request("DELETE", path, params, body),
};
