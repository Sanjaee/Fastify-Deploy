import { FastifyPluginAsync } from "fastify";
import { filterSaleByDate, getSales, storeSale } from "../controllers/salesController";
import { roleMiddleware } from "../middlewares/roleMiddlewares";

const saleRoutes : FastifyPluginAsync = async (fastify) => {
    fastify.get('/' , getSales),
    fastify.post('/' , {preHandler: roleMiddleware(['ADMIN'])} , storeSale),
    fastify.get('/filter/date/:date' , filterSaleByDate)
}


export default saleRoutes