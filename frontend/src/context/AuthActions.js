export const LoginStart = (userLogin) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (userLogin) => ({
  type: "LOGIN_SUCCESS",
  payload: userLogin,
});

export const LoginFail = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});
