import api from "./api";
import { API } from "../constant/service";

/**
 *
 * @param {Record<string, any>} params
 * @returns {Promise<{
 *  data: {Record<string, any>}
 * }>}
 */
/*login */
export const getLogin = (params) => api.POST(API.GET_LOGIN, params);
export const createUser = (params) => api.POST(API.CREATE_USER, params);
export const logout = (params) => api.POST(API.LOGOUT, params);

/** USER PROFILE */
// export const getUserProfile = (...props) => graphAPI.GET(API.GET_USER_PROFILE, ...props);
export const getUserInfo = (params) => api.GET(API.GET_USER_INFO, params);
