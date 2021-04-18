import { get, post } from './request.js';

// post => Signup {double check pathing}
export const postSignup = (email, password) => 
  post('/api/v1/auth/signup', { email, password });

// post => Login {double check pathing}
export const postLogin = (email, password) => 
  post('/api/v1/auth/login', { email, password });

// get => Verify {double check pathing}
export const getVerify = () => 
  get('/api/v1/auth/verify');
