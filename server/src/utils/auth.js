/* eslint-disable no-console */
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
dotenv.config();

export const authenticateToken = ({ req }) => {
  // Allows token to be sent via req.body, req.query, or headers
  let token = req.body.token || req.query.token || req.headers.authorization;
  
  // If the token is sent in the authorization header, extract the token from the header
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
    console.log('🔐 Received token:', token);
  }

  // If no token is provided, throw an error
  if (!token) {
    throw new AuthenticationError('You need to be logged in!');
  }

  // Try to verify the token
  try {
    const { data } = jwt.verify(token, process.env.JWT_SECRET_KEY || '', { maxAge: '2hr' });
    // If the token is valid, attach the user data to the request object
    req.user = data;
    console.log('✅ Token verified for user:', data.username);
  } catch (err) {
    console.error('❌ Token verification failed:', err.message);
    throw new AuthenticationError('Invalid token. Please log in again.');
  }

  // Return the request object
  return req;
};
export const signToken = (username, email, _id) => {
  // Create a payload with the user information
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY; // Get the secret key from environment variables
  // Sign the token with the payload and secret key, and set it to expire in 2 hours
  return jwt.sign({ data: payload }, secretKey, { expiresIn: '2h' });
};
export class AuthenticationError extends GraphQLError {
  constructor(message) {
    super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
}
