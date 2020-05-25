import { notification, message } from 'antd';

import * as actions from "./actions";
import * as apiService from "../services/project.services";
import { ACCESS_TOKEN } from '../constants';

export function getCurrentUser() {
  return async function (dispatch) {
    try {
      if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
      }
      dispatch({ type: actions.LOAD_PAGE });
      
      const response = await apiService.getCurrentUser();
      
      dispatch({ type: actions.GET_CURRENT_USER_SUCCESS, payload: response.data.result });
    } catch ({ error }) {
      if (error) {
        dispatch({ type: actions.GET_CURRENT_USER_FAILED });
      }
    }
  };
}

export function logout(notificationType = "success", description = "You're successfully logged out.") {
  return async function (dispatch) {
    localStorage.removeItem(ACCESS_TOKEN);

    dispatch({ type: actions.LOGOUT });

    notification[notificationType]({
      message: 'Candicode',
      description: description,
    });
  };
}

export function updateStepOne(payload) {
  return async function (dispatch) {
    dispatch({ type: actions.UPDATE_STEP_ONE, payload });
  };
}

export function updateStepTwo(payload) {
  return async function (dispatch) {
    dispatch({ type: actions.UPDATE_STEP_TWO, payload });
  };
}

export function updateStepThree(payload) {
  return async function (dispatch) {
    dispatch({ type: actions.UPDATE_STEP_THREE, payload });
  };
}

export function deleteChallenge(id) {
  return async function (dispatch) {
    dispatch({ type: actions.DELETE_CHALLENGE, payload: id });
  };
}

export function handleModal(status) {
  return async function (dispatch) {
    dispatch({ type: actions.HANDLE_MODAL, payload: status });
  };
}

export function handleSourceModal(status) {
  return async function (dispatch) {
    dispatch({ type: actions.HANDLE_SOURCE_MODAL, payload: status });
  };
}

export function handleTestcaseModal(status) {
  return async function (dispatch) {
    dispatch({ type: actions.HANDLE_TESTCASE_MODAL, payload: status });
  };
}

export function handleChallenge(record) {
  return async function (dispatch) {
    dispatch({ type: actions.HANDLE_CHALLENGE, payload: record });
  };
}

export function updateChallenge(data) {
  return async function (dispatch) {
    if (data.request.id) {
      const response = await apiService.editChallenge({formData: data.formData, id: data.request.id});
      console.log(response)
      if (response.status === 200) {
        dispatch({ type: actions.UPDATE_CHALLENGE, payload: data.request });
        message.success('Edit challenge successfully!');
      } else {
        message.fail('Sorry! Something went wrong. Please try again!');
      }
    } else {
      const response = await apiService.uploadChallenge(data.formData);
      var newChallenge = {...data.request, id: response.data.id};
      if (response.status === 201) {
        dispatch({ type: actions.UPDATE_CHALLENGE, payload: newChallenge });
        message.success('Create new challenge successfully!');
      } else {
        message.fail('Sorry! Something went wrong. Please try again!');
    }
    }
  };
}

export function updateLanguage(payload) {
  return async function (dispatch) {
    dispatch({ type: actions.UPDATE_LANGUAGE, payload: payload });
  };
}

export function uploadSource(payload) {
  return async function (dispatch) {
    const response = await apiService.uploadSource(payload);
    if (response.status === 200) {
      dispatch({ type: actions.CREATE_PROJECT_STRUCTURE, payload: response.data.result.children })      
    }
  };
}

export function updateStep(payload) {
  return async function (dispatch) {
    dispatch({ type: actions.UPDATE_STEP, payload: payload });
  };
}

export function getAllChallenges() {
  return async function (dispatch) {
    const response = await apiService.getAllChallenge();
    if (response.status === 200) {
      dispatch({ type: actions.GET_ALL_CHALLENGES, payload: response.data.result.items })      
    }
  };
}

