import { createServer } from 'http';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { buildSchema } from './schema.js';
import { db } from './db.js';

const app = express();
app.use(express.json());

async function start() {
  const schema = buildSchema();
  
  const server = new ApolloServer({
    schema,
  });

  await server.start();

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async () => ({ db }),
    })
  );

  const httpServer = createServer(app);
  const port = process.env.PORT || 4000;
  
  httpServer.listen(port, () => {
    console.log(`🚀 GraphQL server ready at http://localhost:${port}/graphql`);
  });
}

start().catch(console.error);