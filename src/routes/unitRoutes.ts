import { FastifyPluginAsync } from "fastify";
import { createUnit, deleteUnit, getUnits, updateUnit } from "../controllers/unitController";
import { roleMiddleware } from "../middlewares/roleMiddlewares";
import { updateCategory } from "../controllers/categoryController";

export const unitRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get('/' , getUnits),
    fastify.post('/' , {preHandler: roleMiddleware(['ADMIN'])} , createUnit)
    fastify.put('/update/:id' , {preHandler: roleMiddleware(['ADMIN'])} , updateUnit)
    fastify.delete('/delete/:id' , {preHandler: roleMiddleware(['ADMIN'])} , deleteUnit)
}