import { SET_LOADING, VALIDATE_LOGIN, VALIDATE_LOGIN_COMPLETE } from "./actions";
const initState = {
    userDetails: [],
    employeeDetails: [],
    isLoginSuccess: false,
    isLoading: false
}

const reducers = (state = initState, action) => {
  switch (action.type) {
    case VALIDATE_LOGIN:
      return action.user;
    case VALIDATE_LOGIN_COMPLETE:
        return {
            ...state,
            isLoginSuccess: action.isLoginSuccess,
            isLoading: false,
        }
    case SET_LOADING:
        return{
            ...state,
            isLoading: true
        }
    default:
      return state;
  }
};

export default reducers