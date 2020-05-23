import { notification } from 'antd';

import * as projectAction from "./actions";
import * as projectService from "../services/project.services";
import { ACCESS_TOKEN } from '../constants';

export function getCurrentUser() {
  return async function (dispatch) {
    try {
      if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
      }
      dispatch({ type: projectAction.LOAD_PAGE });
      
      const data = await projectService.getCurrentUser();
      
      dispatch({ type: projectAction.GET_CURRENT_USER_SUCCESS, payload: data.results.content });
    } catch ({ error }) {
      if (error) {
        dispatch({ type: projectAction.GET_CURRENT_USER_FAILED });
      }
    }
  };
}

export function logout(notificationType = "success", description = "You're successfully logged out.") {
  return async function (dispatch) {
    localStorage.removeItem(ACCESS_TOKEN);

    dispatch({ type: projectAction.LOGOUT });

    notification[notificationType]({
      message: 'Candicode',
      description: description,
    });
  };
}

export function updateStepOne(payload) {
  return async function (dispatch) {
    dispatch({ type: projectAction.UPDATE_STEP_ONE, payload });
  };
}

export function updateStepTwo(payload) {
  return async function (dispatch) {
    dispatch({ type: projectAction.UPDATE_STEP_TWO, payload });
  };
}

export function updateStepThree(payload) {
  return async function (dispatch) {
    dispatch({ type: projectAction.UPDATE_STEP_THREE, payload });
  };
}

export function deleteChallenge(id) {
  return async function (dispatch) {
    dispatch({ type: projectAction.DELETE_CHALLENGE, payload: id });
  };
}

export function handleModal(status) {
  return async function (dispatch) {
    dispatch({ type: projectAction.HANDLE_MODAL, payload: status });
  };
}

export function handleSourceModal(status) {
  return async function (dispatch) {
    dispatch({ type: projectAction.HANDLE_SOURCE_MODAL, payload: status });
  };
}

export function handleTestcaseModal(status) {
  return async function (dispatch) {
    dispatch({ type: projectAction.HANDLE_TESTCASE_MODAL, payload: status });
  };
}

export function handleChallenge(record) {
  return async function (dispatch) {
    dispatch({ type: projectAction.HANDLE_CHALLENGE, payload: record });
  };
}

export function updateChallenge(request) {
  return async function (dispatch) {
    dispatch({ type: projectAction.UPDATE_CHALLENGE, payload: request });
  };
}

export function updateLanguage(payload) {
  return async function (dispatch) {
    dispatch({ type: projectAction.UPDATE_LANGUAGE, payload: payload });
  };
}

