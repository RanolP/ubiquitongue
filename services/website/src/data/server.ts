import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { buildSchema } from './schema.js';
import { createDb } from './db.js';
import { graphql } from 'graphql';

export async function startReadServer(dataDir: string) {
  const db = createDb(dataDir);
  const schema = buildSchema();
  
  const app = new Hono();
  
  app.post('/graphql', async (c) => {
    const { query, variables } = await c.req.json();
    
    const result = await graphql({
      schema,
      source: query,
      variableValues: variables,
      contextValue: { db },
    });
    
    return c.json(result);
  });

  app.get('/graphql', (c) => {
    return c.html(`
      <html>
        <head><title>GraphQL Playground</title></head>
        <body>
          <h1>Read-only GraphQL Server</h1>
          <p>POST queries to /graphql</p>
        </body>
      </html>
    `);
  });

  const port = 4001;
  
  return new Promise<() => void>((resolve) => {
    const server = serve({
      fetch: app.fetch,
      port,
    }, () => {
      console.log(`📖 Read GraphQL server ready at http://localhost:${port}/graphql`);
    });

    resolve(() => {
      server.close();
      console.log('📖 Read GraphQL server stopped');
    });
  });
}