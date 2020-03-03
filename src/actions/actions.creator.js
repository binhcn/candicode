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
      
      dispatch({ type: projectAction.GET_CURRENT_USER_SUCCESS, payload: data });
    } catch ({ response }) {
      console.log(response)
      if (response.data.error) {
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
      message: 'Polling App',
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

export function updateStepFour(payload) {
  return async function (dispatch) {
    dispatch({ type: projectAction.UPDATE_STEP_FOUR, payload });
  };
}










export function getAllProject(
  page = projectService.DEFAULT_PAGE,
  size = projectService.DEFAULT_PAGE_SIZE
) {
  return async function (dispatch) {
    try {
      dispatch({ type: projectAction.GET_ALL_PROJECT });
      const { data } = await projectService.getAllProject(page, size);
      dispatch({ type: projectAction.GET_ALL_PROJECT_SUCCESS, data });
      return data;
    } catch (e) {
      console.log(e);
      dispatch({ type: projectAction.GET_ALL_PROJECT_FAILED });
    }
  };
}

export function getByProjectName(
  projectName,
  page = projectService.DEFAULT_PAGE,
  size = projectService.DEFAULT_PAGE_SIZE
) {
  return async function (dispatch) {
    try {
      dispatch({ type: projectAction.GET_BY_PROJECT_NAME });
      const { data } = await projectService.getProjectsByName(
        projectName,
        page,
        size
      );
      dispatch({
        type: projectAction.GET_BY_PROJECT_NAME_SUCCESS,
        data
      });
    } catch ({ response }) {
      if (response.data.error) {
        dispatch({ type: projectAction.GET_BY_PROJECT_NAME_FAILED });
      }
    }
  };
}

export function getByIp(
  ipAddr,
  page = projectService.DEFAULT_PAGE,
  size = projectService.DEFAULT_PAGE_SIZE
) {
  return async function (dispatch) {
    try {
      dispatch({ type: projectAction.GET_BY_IP_ADDRESS });
      const { data } = await projectService.getProjectsByIp(ipAddr, page, size);
      dispatch({
        type: projectAction.GET_BY_IP_ADDRESS_SUCCESS,
        data
      });
    } catch ({ response }) {
      if (response.data.error) {
        dispatch({ type: projectAction.GET_BY_IP_ADDRESS_FAILED });
      }
    }
  };
}

export function createProject(payload) {
  return async function (dispatch) {
    try {
      dispatch({ type: projectAction.CREATE_SINGLE_PROJECT });
      const { data } = await projectService.createProject(payload);
      dispatch({
        type: projectAction.CREATE_SINGLE_PROJECT_SUCCESS,
        payload: data
      });
      return data;
    } catch ({ response }) {
      if (response.data.error) {
        dispatch({ type: projectAction.CREATE_SINGLE_PROJECT_SUCCESS });
      }
    }
  };
}

export function editProjectById(id, payload) {
  return async function (dispatch) {
    try {
      dispatch({ type: projectAction.EDIT_PROJECT });
      const { data } = await projectService.editProjectById(id, payload);
      dispatch({ type: projectAction.EDIT_PROJECT_SUCCESS, payload: data });
    } catch ({ response }) {
      if (response.data.error) {
        dispatch({ type: projectAction.EDIT_PROJECT_FAILED });
      }
    }
  };
}

export function deleteProjectById(id) {
  return async function (dispatch) {
    try {
      dispatch({ type: projectAction.DELETE_PROJECT });
      const { data } = await projectService.deleteProjectById(id);
      dispatch({ type: projectAction.DELETE_PROJECT_SUCCESS, payload: data });
      return data;
    } catch ({ response }) {
      if (response.data.error) {
        dispatch({ type: projectAction.DELETE_PROJECT_FAILED });
      }
    }
  };
}

export function uploadMultipleTxtFiles(formData) {
  return async function (dispatch) {
    try {
      dispatch({ type: projectAction.UPLOAD_TXT_FILES });
      const { data } = await projectService.uploadTxtFiles(formData);
      dispatch({ type: projectAction.UPLOAD_TXT_FILES_SUCCESS, payload: data });
      return data;
    } catch ({ response }) {
      if (response.data.error) {
        dispatch({ type: projectAction.CREATE_SINGLE_PROJECT_FAILED });
      }
    }
  };
}
