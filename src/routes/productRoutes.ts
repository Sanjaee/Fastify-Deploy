// src/routes/productRoutes.ts

import { FastifyPluginAsync } from 'fastify';
import { createProduct, getProducts, updateProduct, deleteProduct, detailProduct } from '../controllers/productController';
import { roleMiddleware } from '../middlewares/roleMiddlewares';

const productRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', getProducts);
  fastify.post('/', {preHandler: roleMiddleware(['ADMIN'])} , createProduct);
  fastify.get('/detail/:name' , detailProduct)
  fastify.put('/:id',  {preHandler: roleMiddleware(['ADMIN'])}, updateProduct);
  fastify.delete('/:id', {preHandler: roleMiddleware(['ADMIN'])} ,  deleteProduct);
};

export default productRoutes;
