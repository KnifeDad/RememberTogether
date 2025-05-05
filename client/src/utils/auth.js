import jwtDecode from 'jwt-decode';
class AuthService {
  // Get user data
  static getProfile() {
    const token = this.getToken();
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded.data;
    } catch (err) {
      return null;
    }
  }

  // Check if user's logged in
  static loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check if token is expired
  static isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        localStorage.removeItem('id_token');
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return true;
    }
  }

  static getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  static login(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  static logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default AuthService;
