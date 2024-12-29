
import fastify from 'fastify';
import userRoutes from './routes/userRoutes';
import categoryRoutes from './routes/categoryRoutes';


import productRoutes from './routes/productRoutes';
import { unitRoutes } from './routes/unitRoutes';
import saleRoutes from './routes/saleRoutes';
import { transactionRoutes } from './routes/transactionRoute';
// import saleRoutes from './routes/saleRoutes';

 const app = fastify({ logger: true });

app.register(userRoutes, { prefix: '/users' });
app.register(categoryRoutes, { prefix: '/categories' });
app.register(productRoutes, { prefix: '/products' });
app.register(saleRoutes, { prefix: '/sales' });
app.register(unitRoutes , {prefix: '/units'})
app.register(transactionRoutes , {prefix: '/transactions'})
app.get('/', async (request, reply) => {
  return { hello: 'world' }
}
);





  export default app