import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Layout from './components/layout/Layout';
import { AuthProvider } from './context/AuthContext';
import HealingCanvas from './components/HealingCanvas';
import MemorySharing from './pages/MemorySharing';
import MoodTrackerPage from './pages/MoodTrackerPage'; // Import the new Mood Tracker page
import LandingPage from './pages/LandingPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Contact from './pages/Contact';
import Features from './pages/Features';
import './styles.css';
import Header from './components/layout/Header';

const uploadLink = createHttpLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'https://remember-together-api.onrender.com/graphql'
      : 'http://localhost:3001/graphql',
  credentials: 'include',
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
                <Route path="/" element={<LandingPage />} />
                <Route path="/mood-tracker" element={<MoodTrackerPage />} /> {/* New route */}
                <Route path="/healing-canvas" element={<HealingCanvas />} />
                <Route path="/my-memories" element={<MemorySharing />} />
                {/* Add other routes here */}
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
