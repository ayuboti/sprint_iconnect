
export default {
  logout: async () => {
    window.localStorage.removeItem('access_token');
    return null;
  }
}