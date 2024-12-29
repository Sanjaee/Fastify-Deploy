
import { FastifyPluginAsync } from 'fastify';
import { createCategory, deleteCategory, detailCategory, getCategories, updateCategory } from '../controllers/categoryController';
import { roleMiddleware } from '../middlewares/roleMiddlewares';

const categoryRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get('/' , getCategories)
    fastify.post('/', {preHandler: roleMiddleware(['ADMIN'])} ,  createCategory)
    fastify.get('/detail/:slug' , detailCategory)
    fastify.put('/update/:id' , {preHandler: roleMiddleware(['ADMIN'])} ,  updateCategory)
    fastify.delete('/delete/:id' , {preHandler: roleMiddleware(['ADMIN'])} , deleteCategory)
};

export default categoryRoutes;
