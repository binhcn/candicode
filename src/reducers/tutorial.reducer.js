import * as actions from "../actions/actions";

const data = [];
for (let i = 0; i < 3; i++) {
  data.push({
    key: i + 1,
    id: i + 1,
    title: `Tutorial ${i + 1}`,
    tagList: ['Java', 'Algorithm'],
    banner: null,
    imageUrl: "",
    description: "I love you",
  });
}


const initState = {
  id: '',
  title: "",
  tagList: [],
  banner: null,
  imageUrl: "",

  description: "",

  data: data,
  visible: false,
  currentStep: 0,
};

const tutorialReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.HANDLE_TUTORIAL:
      return { ...state,
        id: action.payload.id,
        title: action.payload.title,
        tagList: action.payload.tagList,
        banner: action.payload.banner,        
        description: action.payload.description,
        currentStep: 0,
      };

    case actions.HANDLE_TUTORIAL_MODAL:
      return {...state, visible: action.payload };

    case actions.UPDATE_STEP_ONE_TUTORIAL:
      return { ...state,
        title: action.payload.title,
        tagList: action.payload.tagList,
        banner: action.payload.banner,
        imageUrl: action.payload.imageUrl,
      };

    case actions.UPDATE_STEP_TWO_TUTORIAL:
      return { ...state,
        description: action.payload.description,
      };

    case actions.UPDATE_TUTORIAL:
      var newData = [...state.data];
      var index = newData.findIndex(item => action.payload.id === item.id)
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...action.payload,
        });
      } else {
        newData.push({...action.payload, id:state.data.length + 1, 
                  key:state.data.length + 1 });
      }
      return {...state, data: newData };

    case actions.UPDATE_STEP_TUTORIAL:
      return {...state,
        currentStep: state.currentStep + action.payload,
      }

    case actions.DELETE_TUTORIAL:
      return {...state, data: state.data.filter(item => item.id !== action.payload) };

    default:
      return state;
  }
};

export default tutorialReducer;
