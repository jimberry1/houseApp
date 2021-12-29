export const initialState = {
  user: null,
  idToken: null,
};

export const actionTypes = {
  SET_USER: 'SET_USER',
  SET_IDTOKEN: 'SET_IDTOKEN',
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return { ...state, user: action.user };
    case actionTypes.SET_IDTOKEN:
      return { ...state, idToken: action.idToken };
    default:
      return state;
  }
};

export default reducer;
