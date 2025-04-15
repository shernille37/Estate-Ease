const item = "userInfo";
export const getToken = () => {
  return localStorage.getItem(item)
    ? JSON.parse(localStorage.getItem(item)).token
    : null;
};
