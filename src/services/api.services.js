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
  return request({
    url: API_BASE_URL + "/challenges/" + data.id,
    method: 'POST',
    data: data.formData
  });
}

export function getAllChallenges() {
  return request({
    url: API_BASE_URL + "/challenges",
    method: 'GET',
    data: {}
  });
}

export function getUserChallenges() {
  return request({
    url: API_BASE_URL + "/challenges/me",
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
    url: API_BASE_URL + "/challenges/" + payload.id + "/languages",
    method: 'POST',
    data: payload.data
  });
}

export function deleteLanguage(payload) {
  return request({
    url: API_BASE_URL + "/challenges/" + payload.id + "/languages",
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

export function editTestcase(payload) {
  return request({
    url: API_BASE_URL + "/challenges/" + payload.id + "/testcases",
    method: 'PUT',
    data: payload.data
  });
}

export function deleteTestcase(payload) {
  return request({
    url: API_BASE_URL + "/challenges/" + payload.id + "/testcases",
    method: 'DELETE',
    data: payload.data
  });
}

export function createSubmission(payload) {
  return request({
    url: API_BASE_URL + "/challenges/" + payload.id + "/submissions",
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

export function getChallengeComments(id) {
  return request({
    url: API_BASE_URL + "/challenges/" + id + "/comments",
    method: 'GET',
    data: {}
  });
}

export function addChallengeComments(data) {
  return request({
    url: API_BASE_URL + "/challenges/" + data.id + "/comments",
    method: 'POST',
    data: data.payload
  });
}


// ████████╗██╗   ██╗████████╗ ██████╗ ██████╗ ██╗ █████╗ ██╗
// ╚══██╔══╝██║   ██║╚══██╔══╝██╔═══██╗██╔══██╗██║██╔══██╗██║
//    ██║   ██║   ██║   ██║   ██║   ██║██████╔╝██║███████║██║
//    ██║   ██║   ██║   ██║   ██║   ██║██╔══██╗██║██╔══██║██║
//    ██║   ╚██████╔╝   ██║   ╚██████╔╝██║  ██║██║██║  ██║███████╗
//    ╚═╝    ╚═════╝    ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝


export function getAllTutorials() {
  return request({
    url: API_BASE_URL + "/tutorials",
    method: 'GET',
    data: {}
  });
}

export function getUserTutorials() {
  return request({
    url: API_BASE_URL + "/tutorials/me",
    method: 'GET',
    data: {}
  });
}

export function uploadTutorial(tutorialRequest) {
  return request({
    url: API_BASE_URL + "/tutorials",
    method: 'POST',
    data: tutorialRequest,
  });
}

export function editTutorial(data) {
  return request({
    url: API_BASE_URL + "/tutorials/" + data.id,
    method: 'POST',
    data: data.formData
  });
}

export function getTutorialDetails(id) {
  return request({
    url: API_BASE_URL + "/tutorials/" + id,
    method: 'GET',
    data: {}
  });
}

export function deleteTutorial(id) {
  return request({
    url: API_BASE_URL + "/tutorials/" + id,
    method: 'DELETE'
  });
}

export function getTutorialComments(id) {
  return request({
    url: API_BASE_URL + "/tutorials/" + id + "/comments",
    method: 'GET',
    data: {}
  });
}

export function addTutorialComments(data) {
  return request({
    url: API_BASE_URL + "/tutorials/" + data.id + "/comments",
    method: 'POST',
    data: data.payload
  });
}


//  ██████╗ ██████╗ ███╗   ██╗████████╗███████╗███████╗████████╗
// ██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔════╝██╔════╝╚══██╔══╝
// ██║     ██║   ██║██╔██╗ ██║   ██║   █████╗  ███████╗   ██║
// ██║     ██║   ██║██║╚██╗██║   ██║   ██╔══╝  ╚════██║   ██║
// ╚██████╗╚██████╔╝██║ ╚████║   ██║   ███████╗███████║   ██║
//  ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚══════╝   ╚═╝


export function getAllContests() {
  return request({
    url: API_BASE_URL + "/contests",
    method: 'GET',
    data: {}
  });
}

export function getUserContests() {
  return request({
    url: API_BASE_URL + "/contests",
    method: 'GET',
    data: {}
  });
}

export function uploadContest(contestRequest) {
  return request({
    url: API_BASE_URL + "/contests",
    method: 'POST',
    data: contestRequest,
  });
}

export function editContest(data) {
  return request({
    url: API_BASE_URL + "/contests/" + data.id,
    method: 'POST',
    data: data.formData
  });
}

export function getContestDetails(id) {
  return request({
    url: API_BASE_URL + "/contests/" + id,
    method: 'GET',
    data: {}
  });
}

export function deleteContest(id) {
  return request({
    url: API_BASE_URL + "/contests/" + id,
    method: 'DELETE'
  });
}

export function submitRound(payload) {
  return request({
    url: API_BASE_URL + "/contests/" + payload.id + "/rounds",
    method: 'POST',
    data: payload.data
  });
}

export function editRound(payload) {
  return request({
    url: API_BASE_URL + "/contests/" + payload.id + "/rounds",
    method: 'PUT',
    data: payload.data
  });
}

export function deleteRound(payload) {
  return request({
    url: API_BASE_URL + "/contests/" + payload.id + "/rounds",
    method: 'DELETE',
    data: payload.data
  });
}

export function getContestChallenge() {
  return request({
    url: API_BASE_URL + "/challenges/me?contestChallenge=true",
    method: 'GET',
    data: {}
  });
}