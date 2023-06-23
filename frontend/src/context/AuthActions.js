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

export const Follow = (userId) => ({
  type: "FOLLOW",
  payload: userId,
});

export const Unfollow = (userId) => ({
  type: "UNFOLLOW",
  payload: userId,
});
