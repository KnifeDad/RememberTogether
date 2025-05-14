import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';

import Layout from './components/layout/Layout';
import { AuthProvider } from './context/AuthContext';
import HealingCanvas from './components/HealingCanvas';
import MemorySharing from './pages/MemorySharing';
import MoodTracker from './components/Mood';
import LandingPage from './pages/LandingPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Contact from './pages/Contact';
import Features from './pages/Features';
import CommunityPage from './pages/CreateGroup';

import './styles.css';

// Upload link that handles both regular and file upload GraphQL operations
const uploadLink = createUploadLink({
  uri: 'http://localhost:3001/graphql',
  headers: {
    'Apollo-Require-Preflight': 'true',
  },
  credentials: 'include',
});

// Auth middleware
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  console.log('Token from localStorage:', token); // Debug log
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Apollo Client with auth and upload link
const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <AuthProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/my-mood" element={<MoodTracker />} />
                <Route path="/healing-canvas" element={<HealingCanvas />} />
                <Route path="/my-memories" element={<MemorySharing />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/features" element={<Features />} />
              </Routes>
            </Layout>
          </Router>
        </AuthProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
