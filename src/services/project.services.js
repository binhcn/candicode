import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {
  var headers = {
    'Content-Type': 'application/json'
  };

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers = Object.assign(
      {}, { 'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) }, headers
    );
  }

  const defaults = { headers: headers };

  options = Object.assign({}, defaults, options);
  console.log(options)
  return axios(options)
    .then(response => {
      console.log(response)
      return response;
    })
    .catch(err => {
      console.log(err.response)
      if (err.response !== undefined)
        return err.response.data;
    });
};

export function signup(signupRequest) {
  console.log(signupRequest)
  return request({
      url: API_BASE_URL + "/students",
      method: 'post',
      data: signupRequest
  });
}

export function login(loginRequest) {
  return request({
    url: API_BASE_URL + "/auth/login",
    method: 'POST',
    data: loginRequest
  });
}

export function getCurrentUser() {
  return request({
    url: API_BASE_URL + "/auth/current",
    method: 'GET',
    data: {}
  });
}


//  ██████╗██╗  ██╗ █████╗ ██╗     ██╗     ███████╗███╗   ██╗ ██████╗ ███████╗
// ██╔════╝██║  ██║██╔══██╗██║     ██║     ██╔════╝████╗  ██║██╔════╝ ██╔════╝
// ██║     ███████║███████║██║     ██║     █████╗  ██╔██╗ ██║██║  ███╗█████╗  
// ██║     ██╔══██║██╔══██║██║     ██║     ██╔══╝  ██║╚██╗██║██║   ██║██╔══╝  
// ╚██████╗██║  ██║██║  ██║███████╗███████╗███████╗██║ ╚████║╚██████╔╝███████╗
//  ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝


export function uploadSource(source) {
  return request({
    url: API_BASE_URL + "/challenges/source",
    method: 'POST',
    data: source
  });
}

export function uploadChallenge(challengeRequest) {
  return request({
    url: API_BASE_URL + "/challenges",
    method: 'POST',
    data: challengeRequest
  });
}

export function editChallenge(data) {
  console.log(data)
  return request({
    url: API_BASE_URL + "/challenges/" + data.id,
    method: 'POST',
    data: data.formData
  });
}

export function getAllChallenge() {
  return request({
    url: API_BASE_URL + "/challenges",
    method: 'GET',
    data: {}
  });
}

export function deleteChallenge(id) {
  return request({
    url: API_BASE_URL + "/challenges/" + id,
    method: 'DELETE'
  });
}

export function addLanguage(payload) {
  return request({
    url: API_BASE_URL + "/challenges/" + payload.id + "/configs",
    method: 'POST',
    data: payload.data
  });
}

export function deleteLanguage(payload) {
  return request({
    url: API_BASE_URL + "/challenges/" + payload.id + "/configs",
    method: 'DELETE',
    data: payload.data
  });
}

export function verifyTestcase(payload) {
  return request({
    url: API_BASE_URL + "/challenges/" + payload.id + "/testcases/verification",
    method: 'POST',
    data: payload.data
  });
}

export function submitTestcase(payload) {
  return request({
    url: API_BASE_URL + "/challenges/" + payload.id + "/testcases",
    method: 'POST',
    data: payload.data
  });
}


//  ██████╗ ██████╗ ██████╗ ███████╗    ███████╗██████╗ ██╗████████╗ ██████╗ ██████╗ 
// ██╔════╝██╔═══██╗██╔══██╗██╔════╝    ██╔════╝██╔══██╗██║╚══██╔══╝██╔═══██╗██╔══██╗
// ██║     ██║   ██║██║  ██║█████╗█████╗█████╗  ██║  ██║██║   ██║   ██║   ██║██████╔╝
// ██║     ██║   ██║██║  ██║██╔══╝╚════╝██╔══╝  ██║  ██║██║   ██║   ██║   ██║██╔══██╗
// ╚██████╗╚██████╔╝██████╔╝███████╗    ███████╗██████╔╝██║   ██║   ╚██████╔╝██║  ██║
//  ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝    ╚══════╝╚═════╝ ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝


export function getChallengeDetails(id) {
  return request({
    url: API_BASE_URL + "/challenges/" + id,
    method: 'GET',
    data: {}
  });
}
