/* eslint-disable no-console */
import express from 'express';
import path from 'node:path';
import db from './src/config/connection.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './src/schemas/index.js';
import { authenticateToken } from './src/utils/auth.js';
import cors from 'cors';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authenticateToken,
});

const startApolloServer = async () => {
  await server.start();
  await db.openUri(process.env.MONGODB_URI || 'mongodb://localhost:27017/remember-together');
  const PORT = process.env.PORT;
  const app = express();
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => {
        const context = await authenticateToken({ req });
        return context;
      },
    })
  );
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
  // Close the database connection when the server stops
  process.on('SIGINT', () => {
    db.close();
    console.log('Database connection closed');
    process.exit(0);
  });
};
// Call the async function to start the server
startApolloServer();
