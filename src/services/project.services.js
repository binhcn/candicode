import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {
  var headers = {
    'Content-Type': 'application/json',
  };

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers = Object.assign(
      {}, { 'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) }, headers
    );
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return axios(options)
    .then(response => {
      console.log(response)
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export function signup(signupRequest) {
  return request({
      url: API_BASE_URL + "/auth/signup",
      method: 'POST',
      data: signupRequest
  });
}

export function checkUsernameAvailability(username) {
  return request({
      url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
      method: 'GET'
  });
}

export function checkEmailAvailability(email) {
  return request({
      url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
      method: 'GET'
  });
}

export function login(loginRequest) {
  return request({
    url: API_BASE_URL + "/auth/signin",
    method: 'post',
    data: loginRequest
  });
}

export function getCurrentUser() {
  return request({
    url: API_BASE_URL + "/user/me",
    method: 'GET'
  });
}






export const DEFAULT_PAGE = 0;
export const DEFAULT_PAGE_SIZE = 50;

export function getAllProject(page = DEFAULT_PAGE, size = DEFAULT_PAGE_SIZE) {
  return axios.get(`${API_BASE_URL}/`, {
    params: { page: page, size: size }
  });
}

export function getProjectsByIp(
  ipAddress,
  page = DEFAULT_PAGE,
  size = DEFAULT_PAGE_SIZE
) {
  return axios.get(`${API_BASE_URL}/ip/${ipAddress}`, {
    params: { page: page, size: size }
  });
}

export function getProjectsByName(
  projectName,
  page = DEFAULT_PAGE,
  size = DEFAULT_PAGE_SIZE
) {
  return axios.get(`${API_BASE_URL}/name/${projectName}`, {
    params: { page: page, size: size }
  });
}

export function createProject(payload) {
  const { projectName, ipAddress } = payload;
  return axios.post(`${API_BASE_URL}/`, { projectName, ipAddress });
}

export function editProjectById(id, payload) {
  const { projectName, ipAddress } = payload;
  return axios.put(`${API_BASE_URL}/${id}`, { projectName, ipAddress });
}

export function deleteProjectById(id) {
  return axios.delete(`${API_BASE_URL}/${id}`);
}

export function uploadTxtFiles(formData) {
  return axios({
    method: "POST",
    url: `${API_BASE_URL}/multiple/txts`,
    data: formData,
    config: { headers: { "Content-Type": "multipart/form-data" } }
  });
}
