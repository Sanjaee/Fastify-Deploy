import { FastifyPluginAsync } from "fastify";
import { roleMiddleware } from "../middlewares/roleMiddlewares";
import { createTransaction } from "../controllers/transactionController";

export const transactionRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.post('/' , {preHandler: roleMiddleware(['CASHIER'])} , createTransaction)
}