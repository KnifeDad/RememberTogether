import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'url';
import db from './src/config/connection.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './src/schemas/index.js';
import { authenticateToken } from './src/utils/auth.js';
import cors from 'cors';
import { graphqlUploadExpress } from 'graphql-upload';

// Polyfill __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  uploads: false,
});

const startApolloServer = async () => {
  await server.start();

  const app = express();

  // ✅ Updated CORS setup to include apollo-require-preflight
  app.use(
    cors({
      origin: ['https://remember-together.onrender.com', 'http://localhost:3000'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'apollo-require-preflight'],
    })
  );

  // Upload middleware must come before expressMiddleware
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 }));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => {
        const operation = req.body.operationName;
        if (operation === 'login' || operation === 'CreateUser') {
          return { req };
        }
        return await authenticateToken({ req });
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
    console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);
  });

  process.on('SIGINT', () => {
    db.close();
    console.log('Database connection closed');
    process.exit(0);
  });
};

startApolloServer();
