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

export function translateLanguage(payload) {
  return async function (dispatch) {
    dispatch({ type: actions.TRANSLATE_LANGUAGE, payload });
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


//  ██████╗██╗  ██╗ █████╗ ██╗     ██╗     ███████╗███╗   ██╗ ██████╗ ███████╗
// ██╔════╝██║  ██║██╔══██╗██║     ██║     ██╔════╝████╗  ██║██╔════╝ ██╔════╝
// ██║     ███████║███████║██║     ██║     █████╗  ██╔██╗ ██║██║  ███╗█████╗  
// ██║     ██╔══██║██╔══██║██║     ██║     ██╔══╝  ██║╚██╗██║██║   ██║██╔══╝  
// ╚██████╗██║  ██║██║  ██║███████╗███████╗███████╗██║ ╚████║╚██████╔╝███████╗
//  ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝



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
    const response = await apiService.deleteChallenge(id);
    console.log(response)
    if (response.status === 200) {
      dispatch({ type: actions.DELETE_CHALLENGE, payload: id });
    } else {
      message.fail('Sorry! Something went wrong. Please try again!');
    }
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

export function handleDeleteLanguageModal(status) {
  return async function (dispatch) {
    dispatch({ type: actions.HANDLE_DELETE_LANGUAGE_MODAL, payload: status });
  };
}

export function handleTestcaseModal(status) {
  return async function (dispatch) {
    dispatch({ type: actions.HANDLE_TESTCASE_MODAL, payload: status });
  };
}

export function handleUpdateTestcaseModal(status) {
  return async function (dispatch) {
    dispatch({ type: actions.HANDLE_UPDATE_TESTCASE_MODAL, payload: status });
  };
}

export function handleDeleteTestcaseModal(status) {
  return async function (dispatch) {
    dispatch({ type: actions.HANDLE_DELETE_TESTCASE_MODAL, payload: status });
  };
}

export function handleChallenge(record) {
  return async function (dispatch) {
    if (record.id) {
      const response = await apiService.getChallengeDetails(record.id);
      if (response.status === 200) {
        dispatch({ type: actions.HANDLE_CHALLENGE, payload: response.data.result });
      } else {
        message.fail('Sorry! Something went wrong. Please try again!');
      }
    } else {
      dispatch({ type: actions.HANDLE_CHALLENGE, payload: {...record, challengeId: '', languages: []} });
    }
  };
}

export function updateChallenge(data) {
  return async function (dispatch) {
    if (data.request.id) {
      const response = await apiService.editChallenge({ formData: data.formData, id: data.request.id });
      if (response.status === 200) {
        dispatch({ type: actions.UPDATE_CHALLENGE, payload: data.request });
        message.success('Edit challenge successfully!');
      } else {
        message.fail('Sorry! Something went wrong. Please try again!');
      }
    } else {
      const response = await apiService.uploadChallenge(data.formData);
      var newChallenge = { ...data.request, id: response.data.result.challengeId };
      if (response.status === 201) {
        dispatch({ type: actions.UPDATE_CHALLENGE, payload: newChallenge });
        message.success('Create new challenge successfully!');
      } else {
        message.fail('Sorry! Something went wrong. Please try again!');
      }
    }
  };
}

export function uploadSource(payload) {
  return async function (dispatch) {
    const response = await apiService.uploadSource(payload);
    console.log(response)
    if (response.status === 200) {
      dispatch({ type: actions.CREATE_PROJECT_STRUCTURE, payload: response.data.result })
    }
  };
}

export function updateStep(payload) {
  return async function (dispatch) {
    dispatch({ type: actions.UPDATE_STEP, payload: payload });
  };
}

export function getUserChallenges() {
  return async function (dispatch) {
    const response = await apiService.getAllChallenge();
    if (response.status === 200) {
      dispatch({ type: actions.GET_ALL_CHALLENGES, payload: response.data.result.items })
    }
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

export function addLanguage(payload) {
  return async function (dispatch) {
    // const response = await apiService.addLanguage(payload);
    const response = { status: 200 };
    if (response.status === 200) {
      dispatch({ type: actions.ADD_LANGUAGE, payload: payload.data });
    } else {
      message.fail('Sorry! Something went wrong. Please try again!');
    }
  };
}

export function deleteLanguage(payload) {
  return async function (dispatch) {
    // const response = await apiService.deleteLanguage(payload);
    const response = { status: 200 };
    if (response.status === 200) {
      dispatch({ type: actions.DELETE_LANGUAGE, payload: payload });
    } else {
      message.fail('Sorry! Something went wrong. Please try again!');
    }
  };
}

export function verifyTestcase(payload) {
  return async function (dispatch) {
    const response = await apiService.verifyTestcase(payload);
    if (response.status === 200) {
      return response.data.result;
    } else {
      message.fail('Sorry! Something went wrong. Please try again!');
    }
  };
}

export function submitTestcase(payload) {
  return async function (dispatch) {
    const response = await apiService.submitTestcase(payload);
    if (response.status === 200) {
      return response.data.result;
    } else {
      message.fail('Sorry! Something went wrong. Please try again!');
    }
  };
}


// ████████╗██╗   ██╗████████╗ ██████╗ ██████╗ ██╗ █████╗ ██╗     
// ╚══██╔══╝██║   ██║╚══██╔══╝██╔═══██╗██╔══██╗██║██╔══██╗██║     
//    ██║   ██║   ██║   ██║   ██║   ██║██████╔╝██║███████║██║     
//    ██║   ██║   ██║   ██║   ██║   ██║██╔══██╗██║██╔══██║██║     
//    ██║   ╚██████╔╝   ██║   ╚██████╔╝██║  ██║██║██║  ██║███████╗
//    ╚═╝    ╚═════╝    ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝


export function handleTutorial(record) {
  return async function (dispatch) {
    dispatch({ type: actions.HANDLE_TUTORIAL, payload: record });
  };
}

export function handleTutorialModal(status) {
  return async function (dispatch) {
    dispatch({ type: actions.HANDLE_TUTORIAL_MODAL, payload: status });
  };
}

export function updateStepTutorial(payload) {
  return async function (dispatch) {
    dispatch({ type: actions.UPDATE_STEP_TUTORIAL, payload: payload });
  };
}

export function updateStepOneTutorial(payload) {
  return async function (dispatch) {
    dispatch({ type: actions.UPDATE_STEP_ONE_TUTORIAL, payload });
  };
}

export function updateStepTwoTutorial(payload) {
  return async function (dispatch) {
    dispatch({ type: actions.UPDATE_STEP_TWO_TUTORIAL, payload });
  };
}

export function updateTutorial(data) {
  return async function (dispatch) {
    if (data.request.id) {
      // const response = await apiService.editTutorial({formData: data.formData, id: data.request.id});
      const response = { status: 200 };
      if (response.status === 200) {
        dispatch({ type: actions.UPDATE_TUTORIAL, payload: data.request });
        message.success('Edit tutorial successfully!');
      } else {
        message.fail('Sorry! Something went wrong. Please try again!');
      }
    } else {
      // const response = await apiService.uploadTutorial(data.formData);
      const response = { status: 201, data: { id: 10 } }
      var newTutorial = { ...data.request, id: response.data.id };
      if (response.status === 201) {
        dispatch({ type: actions.UPDATE_TUTORIAL, payload: newTutorial });
        message.success('Create new tutorial successfully!');
      } else {
        message.fail('Sorry! Something went wrong. Please try again!');
      }
    }
  };
}

export function deleteTutorial(id) {
  return async function (dispatch) {
    // const response = await apiService.deleteTutorial(id);
    const response = { status: 200 };
    if (response.status === 200) {
      dispatch({ type: actions.DELETE_TUTORIAL, payload: id });
    } else {
      message.fail('Sorry! Something went wrong. Please try again!');
    }
  };
}


//  ██████╗ ██████╗ ██████╗ ███████╗    ███████╗██████╗ ██╗████████╗ ██████╗ ██████╗ 
// ██╔════╝██╔═══██╗██╔══██╗██╔════╝    ██╔════╝██╔══██╗██║╚══██╔══╝██╔═══██╗██╔══██╗
// ██║     ██║   ██║██║  ██║█████╗█████╗█████╗  ██║  ██║██║   ██║   ██║   ██║██████╔╝
// ██║     ██║   ██║██║  ██║██╔══╝╚════╝██╔══╝  ██║  ██║██║   ██║   ██║   ██║██╔══██╗
// ╚██████╗╚██████╔╝██████╔╝███████╗    ███████╗██████╔╝██║   ██║   ╚██████╔╝██║  ██║
//  ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝    ╚══════╝╚═════╝ ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝


export function getChallengeDetails(id) {
  return async function (dispatch) {
    const response = await apiService.getChallengeDetails(id);
    if (response.status === 200) {
      dispatch({ type: actions.GET_CHALLENGE_DETAILS, payload: { ...response.data.result, id } })
    }
  };
}