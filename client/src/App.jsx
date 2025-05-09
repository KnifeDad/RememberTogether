import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';
import Layout from './components/layout/Layout';
import { AuthProvider } from './context/AuthContext';
import HealingCanvas from './components/HealingCanvas';
import './styles.css';

// Replace createHttpLink with createUploadLink
const uploadLink = createUploadLink({
  uri: 'http://localhost:3001/graphql',
  headers: {
    'Apollo-Require-Preflight': 'true',
  },
  credentials: 'include', // optional, depends on CORS/auth
});

// Auth middleware to attach token
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Apollo Client setup
const client = new ApolloClient({
  link: authLink.concat(uploadLink), // Combine auth and upload links
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <AuthProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<div>Welcome to RememberTogether</div>} />
                <Route path="/healing-canvas" element={<HealingCanvas />} />
                {/* Add more routes here */}
              </Routes>
            </Layout>
          </Router>
        </AuthProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
